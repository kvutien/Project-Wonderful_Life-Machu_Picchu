import { NextResponse } from 'next/server'
import { retrieveFromIPFS } from '@/utils/ipfsUtils'
import { findMatches } from '@/utils/matchingUtils'

export async function POST(request: Request) {
  try {
    const { programId, profileHashes } = await request.json()

    // Retrieve the program and its embedding from IPFS
    const programData = await retrieveFromIPFS(programId)
    const programEmbedding = programData.embedding

    // Find matches using the stored embedding
    const matches = await findMatches(programEmbedding, profileHashes)

    return NextResponse.json({
      matches: matches.slice(0, 5) // Return top 5 matches
    })
  } catch (error) {
    console.error('Error in matching process:', error)
    return NextResponse.json(
      { error: 'Failed to process matching request' },
      { status: 500 }
    )
  }
}