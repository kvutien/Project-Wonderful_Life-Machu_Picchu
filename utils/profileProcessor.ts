import { GoogleGenerativeAI } from "@google/generative-ai";
import { Profile } from '@/types/profile';
import { createProgramEmbedding } from './vectorutils';
import { storeProfileWithEmbedding } from './ipfsUtils';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function processAndStoreProfiles(rawProfilesData: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create prompt for Gemini to parse profiles
    const prompt = `Extract and structure the following profiles into a JSON array. For each profile include these fields: name, location, skills (as array), experience, languages (as array), bio. Return only the JSON array with no markdown formatting or additional text.

    Example format:
    [
      {
        "name": "John Doe",
        "location": "New York",
        "skills": ["farming", "irrigation"],
        "experience": "5 years in agriculture",
        "languages": ["English", "Spanish"],
        "bio": "Experienced farmer..."
      }
    ]

    Profiles to process:
    ${rawProfilesData}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Clean the response text to ensure valid JSON
    const cleanResponse = response.text().replace(/```json\n|\n```/g, '').trim();
    const profiles = JSON.parse(cleanResponse);

    // Process each profile
    const storedProfiles = await Promise.all(
      profiles.map(async (profileData: any) => {
        // Create profile object
        const profile: Profile = {
          id: crypto.randomUUID(),
          name: profileData.name || '',
          location: profileData.location || '',
          skills: profileData.skills || [],
          experience: profileData.experience || '',
          languages: profileData.languages || [],
          bio: profileData.bio || '',
          education: profileData.education || '',
          availability: 'full-time',
          contactInfo: {
            email: '',
            phone: undefined
          },
          rawData: JSON.stringify(profileData),
          ipfsHash: '',
          createdAt: new Date().toISOString()
        };

        // Create embedding
        const embedding = await createProgramEmbedding(JSON.stringify(profileData));

        // Store in IPFS
        const ipfsHash = await storeProfileWithEmbedding(profile, embedding);
        profile.ipfsHash = ipfsHash;

        return profile;
      })
    );

    return storedProfiles;
  } catch (error) {
    console.error('Error processing profiles:', error);
    throw error;
  }
} 