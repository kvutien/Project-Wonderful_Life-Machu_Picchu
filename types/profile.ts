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

export interface LinkedAccount {
  type: string;
  address?: string;
  chainId?: number;
  connector?: string;
  balance?: string;
}

export interface PrivyUser {
  id: string;
  linkedAccounts: LinkedAccount[];
  email?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  googleId?: string;
  twitterId?: string;
  discordId?: string;
  customAuthId?: string;
}

export interface PrivyLoginResponse {
  user: PrivyUser;
  isNewUser: boolean;
  wasAlreadyAuthenticated: boolean;
}