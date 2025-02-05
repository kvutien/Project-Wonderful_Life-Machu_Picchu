'use client'

import { useEffect, useState } from 'react'

interface HelperProgram {
  id: string
  title: string
  description: string
  requirements: string
  location: string
  duration: string
  createdAt: string
  status: 'active' | 'completed' | 'pending'
}

export default function HelperProgramsList() {
  const [programs, setPrograms] = useState<HelperProgram[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/helper-programs')
      const data = await response.json()
      setPrograms(data.programs)
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{program.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{program.location}</p>
              </div>
              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${program.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                ${program.status === 'completed' ? 'bg-gray-100 text-gray-800' : ''}
                ${program.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
              `}>
                {program.status}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-500">{program.description}</p>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Requirements</h4>
              <p className="mt-1 text-sm text-gray-500">{program.requirements}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Duration: {program.duration}</span>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}