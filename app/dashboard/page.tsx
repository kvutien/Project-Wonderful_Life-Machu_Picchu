'use client'

import { useState } from 'react'
import { usePrivyAuth } from '@/hooks/usePrivyAuth'
import MachuPichuIcon from '../../public/logo.png'
import ProfileCard from '@/components/helper/ProfileCard'
import AIAssistant from '@/components/helper/AIAssistant'
import CreateHelperProgram from '@/components/helper/CreateHelperProgram'
import HelperProgramsList from '@/components/helper/HelperProgramsList'


function DashboardOverview() {
  const [showCreateProgram, setShowCreateProgram] = useState(false)
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-[#e1efd8] rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-[#980000] mb-4">Welcome to Machu Picchu</h2>
        <p className="text-[#0B5394] text-lg mb-6">
          An innovative humanitarian platform connecting those in need with helper organizations through blockchain technology.
        </p>
        <button
          onClick={() => setShowCreateProgram(true)}
          className="px-6 py-3 bg-[#980000] text-white rounded-lg hover:bg-[#7a0000] transition-colors"
        >
          Start a Helper Program
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    <div className="bg-[#f8fff3] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#980000] mb-2">{title}</h3>
      <p className="text-3xl font-bold text-[#0B5394] mb-2">{value}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
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
    <div className="bg-[#f8fff3] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#980000] mb-2">{title}</h3>
      <p className="text-[#0B5394] mb-4">{description}</p>
      <button
        onClick={onClick}
        className="text-[#980000] font-medium hover:underline"
      >
        {linkText} →
      </button>
    </div>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { ready, authenticated, user, login, logout } = usePrivyAuth()

  const disableAuth = !ready

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fff3]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#980000]">Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fff3]">
      {/* Navbar */}
      <nav className="bg-[#e1efd8] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Machu Picchu Logo" 
                className="h-10 w-10 object-contain"
              />

              <h1 className="text-xl font-bold text-[#980000]">Machu Picchu</h1>
            </div>

            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="hidden md:flex space-x-6">
                {['Overview', 'Programs', 'Analytics', 'Support'].map((item) => (
                  <button
                    key={item}
                    className="text-[#0B5394] hover:text-[#980000] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
              
              {/* Auth Buttons */}
              {authenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-[#0B5394]">
                    {user?.id}
                  </span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-[#980000] text-white rounded-lg hover:bg-[#7a0000] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  disabled={disableAuth}
                  onClick={() => login()}
                  className="px-4 py-2 bg-[#980000] text-white rounded-lg hover:bg-[#7a0000] transition-colors disabled:opacity-50"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {authenticated ? (
          <>
            <div className="mb-8">
              <div className="flex space-x-6 border-b border-[#0B5394]/20">
                {['overview', 'helper-programs', 'ai-assistant'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-[#980000] text-[#980000]'
                        : 'border-transparent text-[#0B5394] hover:text-[#980000] hover:border-[#0B5394]'
                    } pb-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                  >
                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'overview' && <DashboardOverview />}
            {activeTab === 'helper-programs' && <HelperProgramsList />}
            {activeTab === 'ai-assistant' && <AIAssistant />}
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-[#980000]">
              Please login to access the platform
            </h2>
          </div>
        )}
      </main>
    </div>
  )
}