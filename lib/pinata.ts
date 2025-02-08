/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY

export async function uploadToIPFS(data: any) {
  try {
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    )
    return response.data.IpfsHash
  } catch (error) {
    console.error('Error uploading to IPFS:', error)
    throw error
  }
}

export async function getFromIPFS(hash: string) {
  try {
    const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${hash}`)
    return response.data
  } catch (error) {
    console.error('Error fetching from IPFS:', error)
    throw error
  }
}