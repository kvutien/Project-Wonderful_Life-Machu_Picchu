'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProfileCard from '@/components/helper/ProfileCard'
import AIAssistant from '@/components/helper/AIAssistant'
import CreateHelperProgram from '@/components/helper/CreateHelperProgram'
import HelperProgramsList from '@/components/helper/HelperProgramsList'

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateProgram, setShowCreateProgram] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    document.cookie = 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.refresh()
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowCreateProgram(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create Helper Program
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Create Helper Program Modal */}
        {showCreateProgram && (
          <CreateHelperProgram 
            onClose={() => setShowCreateProgram(false)}
            onSuccess={() => {
              setShowCreateProgram(false)
              setActiveTab('helper-programs')
            }}
          />
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('helper-programs')}
              className={`${
                activeTab === 'helper-programs'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Helper Programs
            </button>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`${
                activeTab === 'ai-assistant'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              AI Assistant
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'overview' && <DashboardOverview />}
          {activeTab === 'helper-programs' && <HelperProgramsList />}
          {activeTab === 'ai-assistant' && <AIAssistant />}
        </div>
      </div>
    </div>
  )
}

function DashboardOverview() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Profiles" value="50" />
        <StatCard title="Active Helper Programs" value="12" />
        <StatCard title="Successful Matches" value="25" />
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
        <ActivityList />
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  )
}

function ActivityList() {
  const activities = [
    { id: 1, text: 'New profile match found for Helper Program #123', time: '5 minutes ago' },
    { id: 2, text: 'Profile updated for John Doe', time: '1 hour ago' },
    { id: 3, text: 'New helper program created', time: '2 hours ago' },
  ]

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index !== activities.length - 1 && (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
              )}
              <div className="relative flex space-x-3">
                <div className="flex items-center">
                  <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                    <span className="text-white text-sm">A</span>
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <p className="text-sm text-gray-500">{activity.text}</p>
                  <div className="text-sm text-gray-500">
                    <time>{activity.time}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}