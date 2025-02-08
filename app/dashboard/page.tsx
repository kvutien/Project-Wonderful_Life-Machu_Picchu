'use client'

import { useState, useEffect } from 'react'
import { usePrivyAuth } from '@/hooks/usePrivyAuth'
import CreateHelperProgram from '@/components/helper/CreateHelperProgram'
import HelperProgramsList from '@/components/helper/HelperProgramsList'
import { processAndStoreProfiles } from '@/utils/profileProcessor'
import { initializeDB, storeIPFSCids, getStoredCids } from '@/utils/indexedDB'
import LandingPage from './landingpage'
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
    <div className="space-y-12 ">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-xl p-10 shadow-lg text-white overflow-hidden min-h-[400px] flex items-center"
      >
        {/* Background Image with Gradient */}
        <div className="absolute inset-0 ">
          <Image
            src="/mp1.jpg"
            alt="Machu Picchu Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/20 to-green-900/0" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-5xl font-bold text-yellow-400 mb-2">Machu Picchu</h2>
          <h3 className="text-3xl font-semibold text-white/90 mb-6">Wonderful Life</h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            An innovative humanitarian platform connecting those in need with helper organizations through AI and blockchain technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowCreateProgram(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105"
            >
              Start a Helper Program
            </button>
            
            <button
              onClick={handleProfileUpload}
              disabled={isUploading}
              className="px-6 py-3 bg-yellow-400 text-green-900 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center gap-2 transform hover:scale-105"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading Profile...
                </>
              ) : (
                'Upload Test Profile'
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 " >
        <StatCard 
          icon="👥"
          title="Active Programs" 
          value="24" 
          description="Currently running humanitarian programs"
        />
        <StatCard 
          icon="🌍"
          title="People Reached" 
          value="1,234" 
          description="Lives impacted through our platform"
        />
        <StatCard 
          icon="🤝"
          title="Success Rate" 
          value="97%" 
          description="Program completion rate"
        />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureCard
          title="Profile Matching"
          description="AI-powered matching of needs with available programs"
          icon="🎯"
          linkText="Learn More"
          onClick={() => {}}
        />
        <FeatureCard
          title="Blockchain Security"
          description="Transparent and secure data storage on IPFS"
          icon="🔒"
          linkText="View Details"
          onClick={() => {}}
        />
        <FeatureCard
          title="Impact Tracking"
          description="Real-time monitoring of program effectiveness"
          icon="📊"
          linkText="See Statistics"
          onClick={() => {}}
        />
        <FeatureCard
          title="Community Support"
          description="Connect with other humanitarian organizations"
          icon="💪"
          linkText="Join Network"
          onClick={() => {}}
        />
      </div>

      {showCreateProgram && (
        <CreateHelperProgram
          onClose={() => setShowCreateProgram(false)}
          onSuccess={() => {
            setShowCreateProgram(false)
          }}
        />
      )}
    </div>
  )
}

function StatCard({ icon, title, value, description }: { 
  icon: string;
  title: string; 
  value: string; 
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-green-100 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-300 via-green-200 to-yellow-200 shadow-lg"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-green-600 mb-2">{value}</p>
      <p className="text-sm text-stone-600">{description}</p>
    </motion.div>
  )
}

function FeatureCard({ title, description, icon, linkText, onClick }: {
  title: string;
  description: string;
  icon: string;
  linkText: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-gradient-to-b from-white/90 to-green-200/50 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-lg transition-all group border border-green-100"
    >
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
      <p className="text-stone-600 mb-4">{description}</p>
      <button
        onClick={onClick}
        className="text-green-600 font-medium hover:text-green-700 flex items-center gap-2 group"
      >
        {linkText}
        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </motion.div>
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

  const disableAuth = !ready

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-stone-50 to-green-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-900 to-green-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              {/* Logo and Title - Clickable */}
              <button 
                onClick={() => setShowLandingPage(true)}
                className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src="/machu.webp"
                    alt="Machu Picchu Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h1 className="text-xl font-bold text-yellow-400">Machu Picchu</h1>
              </button>
            </div>

            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="hidden md:flex space-x-6">
                {authenticated && (
                  <button
                    onClick={() => setShowLandingPage(false)}
                    className={`text-white/80 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      !showLandingPage ? 'border-b-2 border-yellow-400' : 'border-b-2 border-transparent'
                    }`}
                  >
                    Dashboard
                  </button>
                )}
              </div>
              
              {/* Auth Buttons */}
              {authenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-green-800/50 rounded-lg px-4 py-2 border border-green-700/30">
                    <svg 
                      className="w-4 h-4 text-green-400 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-white/90 font-medium">
                      {getDisplayAddress() || 'No wallet connected'}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                  >
                    <span>Logout</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  disabled={!ready}
                  onClick={() => login()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center space-x-2"
                >
                  <span>Login</span>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {authenticated ? (
        <main className={``}>
          {showLandingPage ? (
                <LandingPage />
          ) : (
            <>
<div className='mx-auto px-4 sm:px-6 lg:px-48 py-12 justify-center items-center bg-gradient-to-r from-green-50 via-yellow-100 to-green-50'>
              <div className="mb-12 bg-white/50 p-6 rounded-xl backdrop-blur-sm">
                <div className="flex space-x-6 border-b border-green-900/10 ">
                  {['overview', 'helper-programs'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${
                        activeTab === tab
                          ? 'border-green-600 text-green-600'
                          : 'border-transparent text-stone-600 hover:text-green-600 hover:border-green-600'
                      } pb-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                      {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'overview' && <DashboardOverview />}
              {activeTab === 'helper-programs' && <HelperProgramsList />}
              </div>
            </>
          )}
        </main>
      ) : (
        <main className="w-screen overflow-hidden">
          <LandingPage />
        </main>
      )}
    </div>
  )
}