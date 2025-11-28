# License Registry – Frontend Integration

This project integrates with the deployed LicenseRegistry smart contract:

**Contract Address:**  
`0x100AeabD8f9Bc389201870c1C15FC5eB8899E0AF`

## Features
- Check if the connected wallet has an active license  
- Contract owner can:
  - Issue license
  - Revoke license

## File Structure
- `lib/contract.ts` → Contract address + ABI  
- `hooks/useContract.ts` → React hook wrapper around wagmi + viem  
- `components/sample.tsx` → Example UI for issuing/revoking licenses  

## Requirements
- wagmi v1  
- viem  
- Next.js / React  
- Wallet connection (MetaMask, WalletConnect, etc.)

## Usage
Import the sample component:

```tsx
import SampleIntegration from "@/components/sample"

export default function Page() {
  return <SampleIntegration />
}


