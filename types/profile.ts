export interface Profile {
    id: string;
    name: string;
    skills: string[];
    experience: string;
    location: string;
    bio: string;
    education: string;
    languages: string[];
    availability: string;
    contactInfo: {
      email: string;
      phone?: string;
    };
    rawData: string;
    ipfsHash: string;
    createdAt: string;
  }