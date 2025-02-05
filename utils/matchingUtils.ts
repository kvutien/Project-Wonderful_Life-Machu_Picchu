import { Profile } from '@/types/profile'
import { calculateSimilarity } from './vectorutils'
import { retrieveFromIPFS } from './ipfsUtils'

interface MatchResult {
  profile: Profile;
  similarity: number;
}

export async function findMatches(
  programEmbedding: number[],
  profileHashes: string[]
): Promise<MatchResult[]> {
  try {
    // Retrieve all profiles and their embeddings from IPFS
    const profilesData = await Promise.all(
      profileHashes.map(hash => retrieveFromIPFS(hash))
    )

    // Calculate similarity scores
    const matches = profilesData.map(data => ({
      profile: data.profile,
      similarity: calculateSimilarity(programEmbedding, data.embedding)
    }))

    // Sort by similarity score
    return matches.sort((a, b) => b.similarity - a.similarity)
  } catch (error) {
    console.error('Error finding matches:', error)
    throw error
  }
}