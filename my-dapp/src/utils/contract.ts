import { publicClient } from './client'
import contractAbi from '../abi.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export async function getMessage() {
  try {
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'getMessage',
    })
    return data as string
  } catch (error) {
    console.error('Error reading message:', error)
    throw error
  }
}

export async function setMessage(newMessage: string, account: `0x${string}`) {
  try {
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'setMessage',
      args: [newMessage],
      account,
    })

    return request
  } catch (error) {
    console.error('Error setting message:', error)
    throw error
  }
}
