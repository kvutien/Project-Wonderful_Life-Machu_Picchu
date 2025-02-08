'use client'

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import { countries } from 'countries-list'
import { retrieveFromIPFS } from '@/utils/ipfsUtils'
import { calculateSimilarity } from '@/utils/vectorutils'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getStoredCids } from '@/utils/indexedDB';

// Make all fields optional except id
interface HelperProgram {
  id: string
  title?: string
  description?: string
  location?: string
  duration?: string
  requirements?: string
  status?: string
  createdAt?: string
  additionalInfo?: string
  ipfsHash: string
  [key: string]: any
}

interface MatchResult {
  similarity: number
  profile: {
    name: string
    location: string
    skills: string[]
    experience: string
    languages: string[]
    bio: string
  }
  enhancement?: {
    summary: string
    keyStrengths: string[]
    relevantExperience: string
  }
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Helper function to get country code from country name
const getCountryCode = (countryName: string): string => {
  const entry = Object.entries(countries).find(([_, country]) => 
    country.name.toLowerCase() === countryName.toLowerCase()
  )
  return entry ? entry[0].toLowerCase() : ''
}

export default function HelperProgramsList() {
  const [programs, setPrograms] = useState<HelperProgram[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [matchingResults, setMatchingResults] = useState<{[key: string]: MatchResult[]}>({})
  const [loadingMatches, setLoadingMatches] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/helper-programs')
      const data = await response.json()
      setPrograms(data.programs)
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const findMatches = async (program: HelperProgram) => {
    console.log('1. Starting findMatches for program:', program);
    setLoadingMatches(prev => ({ ...prev, [program.id]: true }));
    
    try {
      // Step 1: Get helper program data from IPFS and parse it
      const rawHelperProgramData = await retrieveFromIPFS(program.ipfsHash);
      console.log('Raw Helper Program Data:', rawHelperProgramData);
      
      const helperProgramData = JSON.parse(rawHelperProgramData.program);
      const helperProgramEmbedding = rawHelperProgramData.embedding;
      
      console.log('2. Helper Program Data:', {
        title: helperProgramData.title,
        hasEmbedding: !!helperProgramEmbedding,
        embeddingLength: helperProgramEmbedding?.length,
        embeddingSample: helperProgramEmbedding?.slice(0, 5)
      });

      // Step 2: Get all profile CIDs
      const profileCids = await getStoredCids();
      console.log('3. Found profile CIDs:', profileCids?.length);

      if (!profileCids?.length) {
        throw new Error('No profiles found');
      }

      // Step 3: Process each profile using embeddings
      const matches = await Promise.all(
        profileCids.map(async (cid) => {
          try {
            const profileData = await retrieveFromIPFS(cid);
            console.log('Raw Profile Data:', profileData);
            
            const profile = profileData.profile;
            const profileEmbedding = profileData.embedding;

            console.log('4. Processing profile:', {
              name: profile.name,
              hasEmbedding: !!profileEmbedding,
              embeddingLength: profileEmbedding?.length,
              embeddingSample: profileEmbedding?.slice(0, 5)
            });

            if (!profileEmbedding || !helperProgramEmbedding) {
              console.log('Missing embeddings for comparison:', {
                hasProfileEmbedding: !!profileEmbedding,
                hasHelperEmbedding: !!helperProgramEmbedding
              });
              return null;
            }

            // Calculate similarity using embeddings
            const similarity = calculateSimilarity(
              helperProgramEmbedding,
              profileEmbedding
            );

            console.log('5. Calculated similarity:', {
              name: profile.name,
              similarity: similarity,
              rawScore: similarity
            });

            return {
              similarity,
              profile,
              matchingPoints: [`Semantic match score: ${(similarity * 100).toFixed(1)}%`]
            };
          } catch (error) {
            console.error('Error processing profile:', error);
            return null;
          }
        })
      );

      // Log all matches before filtering
      console.log('All matches before filtering:', matches);

      // Step 4: Filter and sort matches with very low threshold for testing
      const validMatches = matches
        .filter((match): match is NonNullable<typeof match> => {
          const isValid = match !== null && match.similarity >= 0.1; // Very low threshold for testing
          console.log('6. Match validity check:', {
            name: match?.profile.name,
            score: match?.similarity,
            isValid
          });
          return isValid;
        })
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5);

      console.log('7. Valid matches:', validMatches);

      if (validMatches.length === 0) {
        console.log('No valid matches found');
        setMatchingResults(prev => ({
          ...prev,
          [program.id]: []
        }));
        return;
      }

      // Step 5: Enhance matches with AI
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const enhancedMatches = await Promise.all(
        validMatches.map(async (match) => {
          try {
            const prompt = 
              'Based on the following information, generate a JSON response explaining the match:\n\n' +
              'Helper Program Requirements:\n' +
              `${helperProgramData.requirements}\n\n` +
              'Profile Information:\n' +
              `Name: ${match.profile.name}\n` +
              `Location: ${match.profile.location}\n` +
              `Experience: ${match.profile.experience}\n` +
              `Skills: ${match.profile.skills.join(', ')}\n` +
              `Bio: ${match.profile.bio}\n` +
              'Matching Score:\n' +
              `${(match.similarity * 100).toFixed(1)}%\n\n` +
              'Response format:\n' +
              '{\n' +
              '  "summary": "2-3 sentences on why this is a good match",\n' +
              '  "keyStrengths": ["3 key strengths"],\n' +
              '  "relevantExperience": "1-2 sentences about relevant experience"\n' +
              '}';

            const result = await model.generateContent(prompt);
            const enhancement = JSON.parse(result.response.text());

            return {
              ...match,
              enhancement
            };
          } catch (error) {
            console.error('Error enhancing match:', error);
            return match;
          }
        })
      );

      setMatchingResults(prev => ({
        ...prev,
        [program.id]: enhancedMatches
      }));

    } catch (error) {
      console.error('ERROR in findMatches:', error);
      setMatchingResults(prev => ({
        ...prev,
        [program.id]: []
      }));
    } finally {
      setLoadingMatches(prev => ({ ...prev, [program.id]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-green-800 mt-4">Loading programs...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-green-800">Helper Programs</h2>
        <p className="text-green-700 mt-2">Current humanitarian aid programs</p>
      </div>

      <div className="space-y-6">
        {programs.length === 0 ? (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-lg border border-green-100">
            <p className="text-green-700">No programs available yet.</p>
          </div>
        ) : (
          programs.map((program) => (
            <div key={program.id} className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-green-100 hover:shadow-xl transition-all">
              {/* Program Details */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-green-800">
                    {program.title || 'Untitled Program'}
                  </h3>
                  <div className="flex flex-wrap items-center mt-2 gap-4">
                    {program.location && (
                      <span className="text-sm text-green-700 flex items-center">
                        <img
                          src={`https://flagcdn.com/24x18/${getCountryCode(program.location)}.png`}
                          alt={program.location}
                          className="mr-2 h-4"
                        />
                        {program.location}
                      </span>
                    )}
                    {program.duration && (
                      <span className="text-sm text-green-700 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {program.duration}
                      </span>
                    )}
                  </div>
                </div>
                {program.status && (
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${program.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-800' : ''}
                    ${program.status.toLowerCase() === 'completed' ? 'bg-gray-100 text-gray-800' : ''}
                    ${program.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                    {program.status}
                  </span>
                )}
              </div>

              {/* Program Description and Requirements */}
              {program.description && (
                <div className="mt-4">
                  <p className="text-stone-600">{program.description}</p>
                </div>
              )}

              {program.requirements && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-green-700">Requirements</h4>
                  <p className="mt-1 text-stone-600">{program.requirements}</p>
                </div>
              )}

              {/* Find Matches Button */}
              <div className="mt-6">
                <button
                  onClick={() => findMatches(program)}
                  disabled={loadingMatches[program.id]}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 flex items-center group transform hover:scale-105"
                >
                  {loadingMatches[program.id] ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Finding Matches...
                    </>
                  ) : (
                    'Find Matching Profiles'
                  )}
                </button>
              </div>

              {/* Matching Results */}
              {matchingResults[program.id] && matchingResults[program.id].length > 0 && (
                <div className="mt-6 border-t border-green-100 pt-6">
                  <h4 className="text-lg font-medium text-green-800 mb-4">Matching Profiles Found</h4>
                  <div className="grid gap-6">
                    {matchingResults[program.id].map((match, index) => (
                      <div key={index} className="bg-white/90 rounded-lg p-6 shadow-md border border-green-50 hover:shadow-lg transition-all">
                        {/* Header with name and match percentage */}
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-green-800">
                              {match.profile.name}
                            </h3>
                            <p className="text-sm text-green-700">{match.profile.location}</p>
                          </div>
                          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {Math.round(match.similarity * 100)}% Match
                          </span>
                        </div>

                        {/* Professional Summary */}
                        {match.enhancement?.summary && (
                          <div className="mb-4">
                            <p className="text-stone-600">{match.enhancement.summary}</p>
                          </div>
                        )}

                        {/* Key Strengths */}
                        {match.enhancement?.keyStrengths && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-green-700 mb-2">Key Strengths</h4>
                            <div className="flex flex-wrap gap-2">
                              {match.enhancement.keyStrengths.map((strength, i) => (
                                <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                                  {strength}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skills */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-green-700 mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {match.profile.skills.map((skill, i) => (
                              <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-sm rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Relevant Experience */}
                        {match.enhancement?.relevantExperience && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-green-700 mb-2">Relevant Experience</h4>
                            <p className="text-stone-600">{match.enhancement.relevantExperience}</p>
                          </div>
                        )}

                        {/* Languages */}
                        <div>
                          <h4 className="text-sm font-medium text-green-700 mb-2">Languages</h4>
                          <p className="text-stone-600">{match.profile.languages.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}