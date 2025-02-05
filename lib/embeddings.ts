import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function createEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    })

    return response.data[0].embedding
  } catch (error) {
    console.error('Error creating embedding:', error)
    throw error
  }
}

export function calculateSimilarity(embedding1: number[], embedding2: number[]): number {
  const dotProduct = embedding1.reduce((acc, val, i) => acc + val * embedding2[i], 0)
  const magnitude1 = Math.sqrt(embedding1.reduce((acc, val) => acc + val * val, 0))
  const magnitude2 = Math.sqrt(embedding2.reduce((acc, val) => acc + val * val, 0))
  
  return dotProduct / (magnitude1 * magnitude2)
}