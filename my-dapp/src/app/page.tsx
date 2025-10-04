'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { getMessage, setMessage } from '@/utils/contract'

export default function Home() {
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet()
  const [message, setMessageState] = useState<string>('')
  const [newMessage, setNewMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string>('')

  // Load message from contract on component mount
  useEffect(() => {
    loadMessage()
  }, [])

  const loadMessage = async () => {
    setIsLoading(true)
    setError('')
    try {
      const contractMessage = await getMessage()
      setMessageState(contractMessage)
    } catch (err) {
      setError('Failed to load message from contract. Make sure you have the correct contract address and RPC URL.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateMessage = async () => {
    if (!isConnected || !account) {
      alert('Please connect your wallet first')
      return
    }

    if (!newMessage.trim()) {
      alert('Please enter a message')
      return
    }

    setIsUpdating(true)
    setError('')
    try {
      await setMessage(newMessage, account)
      
      // For now, we'll just simulate the transaction
      // In a real app, you'd send this request to the wallet
      alert(`Transaction prepared! In a real implementation, this would be sent to your wallet for signing.`)
      
      // Update the local state
      setMessageState(newMessage)
      setNewMessage('')
    } catch (err) {
      setError('Failed to update message')
      console.error(err)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Smart Contract Message App
          </h1>
          <p className="text-xl text-gray-600">
            Interact with your deployed StringStore contract
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Wallet Connection</h2>
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Read Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current Message</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-lg text-gray-800 break-words">
                  {message || 'No message loaded'}
                </p>
              </div>
            )}

            <button
              onClick={loadMessage}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Loading...' : 'Refresh Message'}
            </button>
          </div>

          {/* Update Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update Message</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="newMessage" className="block text-sm font-medium text-gray-700 mb-2">
                  New Message
                </label>
                <input
                  id="newMessage"
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Enter your message about merch (Quarterzip, Hoodie, Polo)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleUpdateMessage}
                disabled={!isConnected || isUpdating || !newMessage.trim()}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdating ? 'Updating...' : 'Update Message'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">📝 Setup Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700">
            <li>Deploy the StringStore contract to Sepolia testnet using Remix IDE</li>
            <li>Get an Alchemy RPC URL for Sepolia</li>
            <li>Update the environment variables in <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code></li>
            <li>Make sure you have Sepolia ETH in your MetaMask wallet</li>
          </ol>
        </div>
      </div>
    </div>
  )
}