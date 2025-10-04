import { createPublicClient, createWalletClient, http } from 'viem'
import { sepolia } from 'viem/chains'

// Public client for reading from the blockchain
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
})

// For wallet operations (you'll need to configure this based on your setup)
export const getWalletClient = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return createWalletClient({
      chain: sepolia,
      transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
    })
  }
  return null
}
