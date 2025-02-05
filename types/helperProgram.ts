export interface HelperProgram {
    id: string;
    title: string;
    description: string;
    requirements: string;
    location: string;
    duration: string;
    status: 'active' | 'completed' | 'pending';
    createdAt: string;
    updatedAt: string;
    ipfsHash?: string;
  }
  
  export interface CreateHelperProgramInput {
    title: string;
    description: string;
    requirements?: string;
    location?: string;
    duration?: string;
  }
  
  export interface UpdateHelperProgramInput {
    id: string;
    title?: string;
    description?: string;
    requirements?: string;
    location?: string;
    duration?: string;
    status?: 'active' | 'completed' | 'pending';
  }