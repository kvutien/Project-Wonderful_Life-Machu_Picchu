

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

export async function createProgramEmbedding(text: string): Promise<number[]> {
  try {
    // Convert the text to lowercase and split into words
    const words = text.toLowerCase().split(/\s+/);
    
    // Create a fixed-size embedding (512 dimensions)
    const embedding = new Array(512).fill(0);
    
    // Process each word
    words.forEach((word) => {
      // Use hashing function to map words to positions
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

export function calculateSimilarity(embedding1: number[], embedding2: number[]): number {
  const dotProduct = embedding1.reduce((acc, val, i) => acc + val * embedding2[i], 0);
  const magnitude1 = Math.sqrt(embedding1.reduce((acc, val) => acc + val * val, 0));
  const magnitude2 = Math.sqrt(embedding2.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magnitude1 * magnitude2);
}