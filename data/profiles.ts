import { Profile } from '@/types/profile'

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'John Doe',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    experience: '5 years of full-stack development',
    location: 'New York, USA',
    bio: 'Passionate developer with focus on web technologies',
    education: 'BS Computer Science',
    languages: ['English', 'Spanish'],
    availability: 'Full-time',
    contactInfo: {
      email: 'john.doe@example.com',
      phone: '+1234567890'
    }
  },
  // Add more profiles here...
]