import { NextResponse } from 'next/server'

// This would typically come from your database
let storedHashes: string[] = []

export async function GET() {
  try {
    // Return the stored IPFS hashes
    return NextResponse.json({
      hashes: storedHashes
    })
  } catch (error) {
    console.error('Error fetching profile hashes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile hashes' },
      { status: 500 }
    )
  }
}

// Helper function to add a hash (called when storing new profiles)
export function addHash(hash: string) {
  if (!storedHashes.includes(hash)) {
    storedHashes.push(hash)
  }
}