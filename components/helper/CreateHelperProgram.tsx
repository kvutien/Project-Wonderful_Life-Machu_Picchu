'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import { createProgramEmbedding } from '@/utils/vectorutils'
import { storeHelperProgramWithEmbedding } from '@/utils/ipfsUtils'
import { motion } from 'framer-motion'

interface CreateHelperProgramProps {
  onClose: () => void
  onSuccess: () => void
}

// Add contract ABI and address
const CONTRACT_ADDRESS = "0xb0016Cfe413944368a2Cb0Ac8BE4b7121fa1EB1F";
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      }
    ],
    "name": "storeCID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function CreateHelperProgram({ onClose, onSuccess }: CreateHelperProgramProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    duration: '',
    additionalInfo: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Remove empty fields before sending
      const dataToSend = Object.fromEntries(
        Object.entries(formData).filter(([ value]) => value.trim() !== '')
      )

      // Create embedding for the program
      const embedding = await createProgramEmbedding(JSON.stringify(dataToSend))

      // Store program and embedding in IPFS
      const ipfsHash = await storeHelperProgramWithEmbedding(
        JSON.stringify({
          ...dataToSend,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }),
        embedding
      )

      console.log('Program stored in IPFS with hash:', ipfsHash)

      // Store CID in smart contract
      try {
        // Get provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        
        // Create contract instance
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        )

        console.log('Storing CID in contract:', ipfsHash)
        
        // Call storeCID function
        const tx = await contract.storeCID(ipfsHash)
        console.log('Transaction sent:', tx.hash)
        
        // Wait for transaction to be mined
        await tx.wait()
        console.log('CID stored successfully in contract')
      } catch (error) {
        console.error('Error storing CID in contract:', error)
        throw error // Propagate error to trigger overall failure
      }

      // Send data to API
      const response = await fetch('/api/helper-programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...dataToSend,
          ipfsHash,
          status: 'active'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create helper program')
      }

      onSuccess()
    } catch (error) {
      console.error('Error creating helper program:', error)
      alert('Failed to create helper program: ' + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-green-900">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gradient-to-b from-green-50 to-stone-50 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-green-900 to-green-800 px-6 py-4 rounded-t-xl border-b border-green-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-yellow-400">Create Helper Program</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-yellow-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">Program Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white/80 backdrop-blur-sm"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter program title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white/80 backdrop-blur-sm"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the program's purpose and goals"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Program location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">Duration</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 months"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">Requirements</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white/80 backdrop-blur-sm"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="List program requirements"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">Additional Information</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white/80 backdrop-blur-sm"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Any other relevant information"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-green-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center group transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Program...
                </>
              ) : (
                'Create Program'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}