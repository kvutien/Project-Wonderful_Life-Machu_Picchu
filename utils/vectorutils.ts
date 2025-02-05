import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function createProgramEmbedding(text: string): Promise<number[]> {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Generate embedding using Gemini
    const result = await model.generateContent(text);
    const response = await result.response;
    
    // Convert the text to a simple numerical embedding
    // This is a simplified approach - you might want to use a more sophisticated embedding method
    const textToEmbed = response.text().toLowerCase();
    const words = textToEmbed.split(/\s+/);
    
    // Create a fixed-size embedding (512 dimensions to match previous implementation)
    const embedding = new Array(512).fill(0);
    
    words.forEach((word, index) => {
      // Use a simple hashing function to map words to positions
      const position = Math.abs(hashString(word)) % 512;
      embedding[position] += 1;
    });
    
    // Normalize the embedding
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / magnitude);
  } catch (error) {
    console.error('Error creating embedding:', error);
    throw new Error('Failed to create embedding');
  }
}

// Helper function to hash strings
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
}

export function calculateSimilarity(embedding1: number[], embedding2: number[]): number {
  const dotProduct = embedding1.reduce((acc, val, i) => acc + val * embedding2[i], 0);
  const magnitude1 = Math.sqrt(embedding1.reduce((acc, val) => acc + val * val, 0));
  const magnitude2 = Math.sqrt(embedding2.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magnitude1 * magnitude2);
}