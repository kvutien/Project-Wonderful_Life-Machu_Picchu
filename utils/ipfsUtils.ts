import { Profile } from '@/types/profile'

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY

// Store profile data and its vector embedding
export async function storeProfileWithEmbedding(profile: Profile, embedding: number[]) {
  try {
    const data = {
      profile,
      embedding,
      timestamp: new Date().toISOString()
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY!,
        pinata_secret_api_key: PINATA_SECRET_KEY!,
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    return result.IpfsHash
  } catch (error) {
    console.error('Error storing in IPFS:', error)
    throw error
  }
}

// Store helper program data and its vector embedding
export async function storeHelperProgramWithEmbedding(program: string, embedding: number[]) {
  try {
    const data = {
      program,
      embedding,
      timestamp: new Date().toISOString()
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY!,
        pinata_secret_api_key: PINATA_SECRET_KEY!,
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    return result.IpfsHash
  } catch (error) {
    console.error('Error storing in IPFS:', error)
    throw error
  }
}

// Retrieve data from IPFS
export async function retrieveFromIPFS(hash: string) {
  try {
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`)
    return await response.json()
  } catch (error) {
    console.error('Error retrieving from IPFS:', error)
    throw error
  }
}