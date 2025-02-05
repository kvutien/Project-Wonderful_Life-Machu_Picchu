import { NextResponse } from 'next/server'
import { profiles } from '@/data/profiles'
import { createEmbedding, calculateSimilarity } from '@/lib/embeddings'

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    // Create embedding for the query
    const queryEmbedding = await createEmbedding(query)

    // Calculate similarity scores for all profiles
    const profilesWithScores = await Promise.all(
      profiles.map(async (profile) => {
        // Create a text representation of the profile
        const profileText = `${profile.name} ${profile.skills.join(' ')} ${profile.experience} ${profile.bio}`
        
        // Create embedding for the profile
        const profileEmbedding = await createEmbedding(profileText)
        
        // Calculate similarity
        const similarity = calculateSimilarity(queryEmbedding, profileEmbedding)

        return {
          ...profile,
          similarity,
        }
      })
    )

    // Sort by similarity and get top 5 matches
    const suggestions = profilesWithScores
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error in AI suggestion:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}