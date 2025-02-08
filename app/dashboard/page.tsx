/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { usePrivyAuth } from '@/hooks/usePrivyAuth'
import CreateHelperProgram from '@/components/helper/CreateHelperProgram'
import HelperProgramsList from '@/components/helper/HelperProgramsList'
import { processAndStoreProfiles } from '@/utils/profileProcessor'
import { initializeDB, storeIPFSCids } from '@/utils/indexedDB'
import LandingPage from '../../components/layout/landingpage'
import Image from 'next/image'
import { motion } from 'framer-motion'

function DashboardOverview() {
  const [showCreateProgram, setShowCreateProgram] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  // Initialize IndexedDB when component mounts
  useEffect(() => {
    initializeDB().catch(console.error);
  }, []);

  const handleProfileUpload = async () => {
    setIsUploading(true)
    try {
      // Get the raw profiles data from your text block
      const rawProfilesData = `

 Profile 1: Ravi Kumar
- Name: Ravi Kumar
- Age: 40
- Gender: Male  
- Marital Status: Married
- Number of Dependents: 3 (2 children, 1 elderly parent)
- Location: Tamil Nadu
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has high blood pressure
- Access to Healthcare: Moderate; local clinic available but often lacks medications
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (rice and vegetables)
- Income Level: Approximately ₹1,00,000 per year
- Housing Conditions: Simple mud house with a thatched roof
- Food Security: Generally secure, but faces challenges during droughts
- Water and Sanitation Access: Access to a borewell, but water quality is sometimes poor
- Social Support Networks: Active in a local farmers' cooperative
- Coping Mechanisms: Engages in crop rotation and shares resources with neighbors
- Cultural Background: Tamil
- Specific Needs: Access to agricultural training and improved irrigation techniques
- 
- Profile 2: Lakshmi Devi
- Name: Lakshmi Devi
- Age: 35
- Gender: Female
- Marital Status: Widowed
- Number of Dependents: 2 (both children)
- Location: Karnataka
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has experienced stress-related issues
- Access to Healthcare: Limited; relies on local health services that are often overcrowded
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (millets and pulses)
- Income Level: Approximately ₹80,000 per year
- Housing Conditions: Small concrete house with basic amenities
- Food Security: Faces food insecurity, especially during the lean season
- Water and Sanitation Access: Access to a community well, but sanitation facilities are inadequate
- Social Support Networks: Active in a women's self-help group
- Coping Mechanisms: Participates in local savings groups
- Cultural Background: Kannada
- Specific Needs: Access to microfinance and training in sustainable farming practices
- 
- Profile 3: Arjun Nair
- Name: Arjun Nair
- Age: 50
- Gender: Male
- Marital Status: Married
- Number of Dependents: 4 (3 children, 1 elderly mother)
- Location: Kerala
- Displacement Status: Not displaced
- Health Status: Chronic back pain
- Access to Healthcare: Moderate; must travel to the nearest town for treatment
- Education Level: Incomplete primary education
- Employment Status: Small-scale farmer (coconut and rubber)
- Income Level: Approximately ₹1,20,000 per year
- Housing Conditions: Traditional house made of wood with a tiled roof
- Food Security: Generally secure, but faces challenges during crop failures
- Water and Sanitation Access: Access to a nearby river, but sanitation is poor
- Social Support Networks: Strong ties with local farming community
- Coping Mechanisms: Engages in communal farming efforts
- Cultural Background: Malayali
- Specific Needs: Access to healthcare for chronic pain management and agricultural training
- 
- Profile 4: Meera Reddy
- Name: Meera Reddy
- Age: 28
- Gender: Female
- Marital Status: Married
- Number of Dependents: 1 (a young child)
- Location: Andhra Pradesh
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has limited access to maternal health services
- Access to Healthcare: Moderate; local clinic available but often lacks staff
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (vegetables and fruits)
- Income Level: Approximately ₹70,000 per year
- Housing Conditions: Simple house with a small garden
- Food Security: Generally secure, but faces challenges during the lean season
- Water and Sanitation Access: Access to a borewell with clean water
- Social Support Networks: Active in local women's cooperative
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Telugu
- Specific Needs: Access to maternal health services and training in sustainable agricultural practices
- 
- Profile 5: Suresh Babu
- Name: Suresh Babu
- Age: 45
- Gender: Male
- Marital Status: Married
- Number of Dependents: 3 (2 children, 1 elderly father)
- Location: Tamil Nadu
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has occasional digestive issues
- Access to Healthcare: Moderate; local health center available but often lacks resources
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (sugarcane and vegetables)
- Income Level: Approximately ₹1,50,000 per year
- Housing Conditions: Simple brick house with a small farm
- Food Security: Generally secure, but faces challenges during the monsoon season
- Water and Sanitation Access: Access to a borewell with clean water
- Social Support Networks: Active in a local farmers' association
- Coping Mechanisms: Engages in crop diversification and shares resources with neighbors
- Cultural Background: Tamil
- Specific Needs: Access to agricultural training and improved market access for his products
- 
- Profile 6: Anjali Menon
- Name: Anjali Menon
- Age: 32
- Gender: Female
- Marital Status: Single
- Number of Dependents: 1 (a young child)
- Location: Kerala
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has limited access to childcare services
- Access to Healthcare: Good; local health services available
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (spices and fruits)
- Income Level: Approximately ₹90,000 per year
- Housing Conditions: Simple house with a small garden
- Food Security: Generally secure, but faces challenges during the harvest season
- Water and Sanitation Access: Access to a well with clean water
- Social Support Networks: Active in a local women's cooperative
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Malayali
- Specific Needs: Access to microfinance and training in sustainable agricultural practices
- 
- Profile 7: Karthik Reddy
- Name: Karthik Reddy
- Age: 38
- Gender: Male
- Marital Status: Married
- Number of Dependents: 4 (3 children, 1 elderly mother)
- Location: Andhra Pradesh
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has chronic knee pain
- Access to Healthcare: Limited; must travel to the nearest town for treatment
- Education Level: Incomplete primary education
- Employment Status: Small-scale farmer (paddy and groundnuts)
- Income Level: Approximately ₹1,00,000 per year
- Housing Conditions: Traditional house made of mud with a thatched roof
- Food Security: Generally secure, but faces challenges during crop failures
- Water and Sanitation Access: Access to a nearby river, but sanitation is poor
- Social Support Networks: Strong ties with local farming community
- Coping Mechanisms: Engages in communal farming efforts
- Cultural Background: Telugu
- Specific Needs: Access to healthcare for knee pain management and agricultural training
- 
- Profile 8: Priya Nair
- Name: Priya Nair
- Age: 30
- Gender: Female
- Marital Status: Married
- Number of Dependents: 2 (both children)
- Location: Tamil Nadu
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has limited access to reproductive health services
- Access to Healthcare: Moderate; local clinic available but often lacks staff
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (vegetables and fruits)
- Income Level: Approximately ₹70,000 per year
- Housing Conditions: Simple house with a small garden
- Food Security: Generally secure, but faces challenges during the lean season
- Water and Sanitation Access: Access to a borewell with clean water
- Social Support Networks: Active in local women's groups focused on agriculture
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Malayali
- Specific Needs: Access to maternal health services and training in sustainable agricultural practices
- 
- Profile 9: Sanjay Pillai
- Name: Sanjay Pillai
- Age: 46
- Gender: Male
- Marital Status: Married
- Number of Dependents: 5 (4 children, 1 elderly mother)
- Location: Karnataka
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has occasional headaches
- Access to Healthcare: Moderate; local health center available but often lacks resources
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (sugarcane and vegetables)
- Income Level: Approximately ₹1,30,000 per year
- Housing Conditions: Simple brick house with a small farm
- Food Security: Generally secure, but faces challenges during the monsoon season
- Water and Sanitation Access: Access to a borewell with clean water
- Social Support Networks: Active in a local farmers' association
- Coping Mechanisms: Engages in crop diversification and shares resources with neighbors
- Cultural Background: Kannada
- Specific Needs: Access to agricultural training and improved market access for his products
- 
- Profile 10: Kavita Sharma
- Name: Kavita Sharma
- Age: 34
- Gender: Female
- Marital Status: Divorced
- Number of Dependents: 2 (both children)
- Location: Tamil Nadu
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has experienced stress-related issues
- Access to Healthcare: Limited; relies on local health services that are often overcrowded
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (pulses and vegetables)
- Income Level: Approximately ₹60,000 per year
- Housing Conditions: Small concrete house with basic amenities
- Food Security: Faces food insecurity, especially during the lean season
- Water and Sanitation Access: Access to a community well, but sanitation facilities are inadequate
- Social Support Networks: Active in a women's self-help group
- Coping Mechanisms: Participates in local savings groups
- Cultural Background: Tamil
- Specific Needs: Access to microfinance and training in sustainable farming practices

      `

      // Process each profile to ensure complete data structure
      const processedProfiles = rawProfilesData.split('Profile').filter(Boolean).map(profileText => {
        const lines = profileText.split('\n').filter(line => line.trim());
        const profile: any = {};
        
        // Extract all fields
        lines.forEach(line => {
          if (line.includes(':')) {
            const [key, value] = line.split(':').map(s => s.trim());
            const cleanKey = key.replace('- ', '').toLowerCase().replace(/\s+/g, '_');
            profile[cleanKey] = value || ''; // Ensure value is never undefined
          }
        });

        // Helper function to safely access nested properties
        const safeString = (value: any): string => {
          if (!value) return '';
          return String(value).toLowerCase();
        };

        // Create a structured profile object with null checks
        const structuredProfile = {
          name: profile.name || 'Unknown',
          age: parseInt(profile.age) || 0,
          gender: profile.gender || 'Not specified',
          marital_status: profile.marital_status || 'Not specified',
          dependents: profile.number_of_dependents || 'None',
          location: profile.location || 'Not specified',
          displacement_status: profile.displacement_status || 'Not specified',
          health_status: profile.health_status || 'Not specified',
          healthcare_access: profile.access_to_healthcare || 'Not specified',
          education_level: profile.education_level || 'Not specified',
          employment: {
            status: profile.employment_status || 'Not specified',
            type: profile.employment_status || 'Not specified',
            income: profile.income_level || 'Not specified'
          },
          housing: profile.housing_conditions || 'Not specified',
          food_security: profile.food_security || 'Not specified',
          water_sanitation: profile.water_and_sanitation_access || 'Not specified',
          social_networks: profile.social_support_networks || 'Not specified',
          coping_mechanisms: profile.coping_mechanisms || 'Not specified',
          cultural_background: profile.cultural_background || 'Not specified',
          specific_needs: profile.specific_needs || 'Not specified',
          skills: [
            'farming',
            'agriculture',
            safeString(profile.employment_status).includes('farmer') ? 'crop management' : '',
            'resource management',
            'community engagement'
          ].filter(Boolean),
          languages: [
            profile.cultural_background === 'Tamil' ? 'Tamil' : '',
            profile.cultural_background === 'Kannada' ? 'Kannada' : '',
            profile.cultural_background === 'Telugu' ? 'Telugu' : '',
            profile.cultural_background === 'Malayali' ? 'Malayalam' : '',
            'English'
          ].filter(Boolean)
        };

        // Generate description safely
        const description = `${structuredProfile.name} is a ${structuredProfile.age}-year-old ${
          safeString(structuredProfile.gender)
        } from ${structuredProfile.location}. They have ${structuredProfile.dependents} and are ${
          safeString(structuredProfile.marital_status)
        }. Their main occupation involves ${
          safeString(structuredProfile.employment.status).includes('(') 
            ? structuredProfile.employment.status.split('(')[1]?.replace(')', '') || 'farming'
            : 'farming'
        }. ${
          structuredProfile.specific_needs !== 'Not specified' 
            ? `They face challenges including ${safeString(structuredProfile.specific_needs)}`
            : ''
        } ${
          structuredProfile.social_networks !== 'Not specified'
            ? `and are actively involved in ${safeString(structuredProfile.social_networks)}`
            : ''
        }.`.trim();

        return {
          ...structuredProfile,
          description
        };
      });

      console.log('Processed profiles:', processedProfiles);
      // Generate embeddings and store profiles
      const profiles = await processAndStoreProfiles(JSON.stringify(processedProfiles));
      console.log('Stored profiles:', profiles);
      
      // Extract IPFS hashes
      const ipfsHashes = profiles.map(profile => profile.ipfsHash);
      
      // Store hashes in both IndexedDB and API
      await Promise.all([
        storeIPFSCids(ipfsHashes),
        ...ipfsHashes.map(hash => 
          fetch('/api/profiles/hashes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash }),
          })
        )
      ]);

      alert(`Successfully processed and stored ${profiles.length} profiles`);
    } catch (error) {
      console.error('Error processing profiles:', error);
      alert('Failed to upload profiles: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[600px] w-full flex items-center"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/mp1.jpg"
            alt="Machu Picchu Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-6xl font-bold text-white mb-4">Machu Picchu Initiative</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl">
            Inspired by the Incan citadel's spirit of community and innovation, we connect those in need 
            with helper organizations through AI and blockchain technology. Like the perfectly fitted stones 
            of Machu Picchu, we build stronger communities through collaboration.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateProgram(true)}
              className="px-8 py-3 bg-white text-green-900 rounded-md hover:bg-green-50"
            >
              Start a Helper Program
            </button>
            <button
              onClick={handleProfileUpload}
              disabled={isUploading}
              className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload Test Profile'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-4 gap-6">
          <StatCard 
            title="Active Programs" 
            value="24" 
            description="Running programs"
          />
          <StatCard 
            title="People Reached" 
            value="1,234" 
            description="Lives impacted"
          />
          <StatCard 
            title="Success Rate" 
            value="97%" 
            description="Completion rate"
          />
          <StatCard 
            title="Communities" 
            value="15" 
            description="Connected regions"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Approach</h2>
          <div className="grid grid-cols-2 gap-8">
            <FeatureCard
              title="Profile Matching"
              description="AI-powered matching of needs with available programs, ensuring efficient and effective aid distribution."
            />
            <FeatureCard
              title="Blockchain Security"
              description="Transparent and secure data storage on IPFS, protecting sensitive information while maintaining accessibility."
            />
            <FeatureCard
              title="Community Building"
              description="Like the ancient Incan civilization, we believe in the power of community and mutual support."
            />
            <FeatureCard
              title="Sustainable Impact"
              description="Creating lasting change through technology-enabled humanitarian assistance and community empowerment."
            />
          </div>
        </div>
      </div>

      {showCreateProgram && (
        <CreateHelperProgram
          onClose={() => setShowCreateProgram(false)}
          onSuccess={() => setShowCreateProgram(false)}
        />
      )}
    </div>
  )
}

function StatCard({ title, value, description }: { 
  title: string; 
  value: string; 
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-green-600 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}

function FeatureCard({ title, description }: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 border border-green-300 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showLandingPage, setShowLandingPage] = useState(false)
  const { ready, authenticated, user, login, logout } = usePrivyAuth()

  // Reset to dashboard view when user logs in
  useEffect(() => {
    if (authenticated) {
      setShowLandingPage(false)
    }
  }, [authenticated])

  const getDisplayAddress = () => {
    if (!user?.linkedAccounts) return null;
    const walletAccount = user.linkedAccounts.find(account => 
      account.type === 'wallet'
    );
    if (!walletAccount?.address) return null;
    
    const address = walletAccount.address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-stone-50">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-semibold text-green-700"
          >
            Loading...
          </motion.h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Updated Navbar */}
      <nav className="bg-green-800 border-b border-green-700 text-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Image
                src="/machu.webp"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="ml-3 text-xl font-semibold">Machu Picchu Initiative</span>
            </div>
            
            <div className="flex items-center gap-4">
              {authenticated ? (
                <>
                  <span className="text-sm text-green-100">{getDisplayAddress()}</span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => login()}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {authenticated ? (
        <main>
          {showLandingPage ? (
            <LandingPage />
          ) : (
            <DashboardOverview />
          )}
        </main>
      ) : (
        <LandingPage />
      )}
    </div>
  )
}