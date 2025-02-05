'use client'

import { useState } from 'react'
import { Profile } from '@/types/profile'
import ProfileCard from './ProfileCard'

export default function AIAssistant() {
  const [program, setProgram] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [matches, setMatches] = useState<Array<{ profile: Profile; similarity: number }>>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get all profile hashes (this would come from your database or state management)
      const profileHashes = await fetch('/api/profiles/hashes').then(res => res.json())

      // Send matching request
      const response = await fetch('/api/matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          program,
          profileHashes: profileHashes.hashes
        }),
      })

      const data = await response.json()
      setMatches(data.matches)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Helper Program Assistant</h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="program" className="block text-sm font-medium text-gray-700">
              Describe the helper program
            </label>
            <textarea
              id="program"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe the type of help needed..."
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Finding matches...' : 'Find Matches'}
          </button>
        </form>

        {matches.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Matched Profiles</h3>
            {matches.map(({ profile, similarity }) => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                similarity={similarity} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}