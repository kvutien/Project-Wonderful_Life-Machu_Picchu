import { NextResponse } from 'next/server'
import { createProgramEmbedding } from '@/utils/vectorUtils'
import { storeHelperProgramWithEmbedding } from '@/utils/ipfsUtils'
import { findMatches } from '@/utils/matchingUtils'

export async function POST(request: Request) {
  try {
    const { program, profileHashes } = await request.json()

    // Create embedding for the helper program
    const programEmbedding = await createProgramEmbedding(program)

    // Store program and its embedding in IPFS
    const programHash = await storeHelperProgramWithEmbedding(program, programEmbedding)

    // Find matches
    const matches = await findMatches(programEmbedding, profileHashes)

    return NextResponse.json({
      programHash,
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