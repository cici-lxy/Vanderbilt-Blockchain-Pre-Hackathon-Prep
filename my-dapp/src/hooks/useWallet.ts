'use client'

import { useState, useEffect } from 'react'

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    }
  }
}

export function useWallet() {
  const [account, setAccount] = useState<`0x${string}` | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check if already connected
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: unknown) => {
          const accountList = accounts as string[]
          if (accountList.length > 0) {
            setAccount(accountList[0] as `0x${string}`)
            setIsConnected(true)
          }
        })
        .catch(console.error)
    }
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!')
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      }) as string[]
      
      if (accounts.length > 0) {
        setAccount(accounts[0] as `0x${string}`)
        setIsConnected(true)
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      alert('Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
  }

  return {
    account,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
  }
}
