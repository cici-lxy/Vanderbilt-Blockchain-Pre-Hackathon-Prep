# Smart Contract Message App

A Next.js application that interacts with a deployed StringStore smart contract on Ethereum Sepolia testnet using Viem.

## Features

- 🔗 Connect MetaMask wallet
- 📖 Read message from smart contract
- ✏️ Update message in smart contract
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Built with Viem for efficient blockchain interactions

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
NEXT_PUBLIC_CONTRACT_ADDRESS="0xYourContractAddress"
```

### 2. Deploy Smart Contract

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Copy the StringStore contract code from the parent directory
3. Compile and deploy to Sepolia testnet
4. Save the contract address and ABI

### 3. Get Testnet ETH

- Add Sepolia network to MetaMask
- Use [Sepolia faucet](https://sepoliafaucet.com/) to get test ETH

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── hooks/
│   └── useWallet.ts        # Wallet connection hook
├── utils/
│   ├── client.ts           # Viem client configuration
│   └── contract.ts         # Contract interaction functions
└── abi.json                # Contract ABI
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Viem** - Ethereum library
- **Wagmi** - React hooks for Ethereum

## Deployment

The app is ready to be deployed to Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Smart Contract

The StringStore contract has two main functions:
- `getMessage()` - Returns the stored string
- `setMessage(string)` - Updates the stored string

## Troubleshooting

- Make sure MetaMask is installed and connected to Sepolia
- Verify your RPC URL is correct
- Ensure you have Sepolia ETH for transactions
- Check that the contract address is valid