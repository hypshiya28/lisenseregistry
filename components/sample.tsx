"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useLicenseRegistry } from "@/hooks/useContract"
import { isAddress } from "viem"

const SampleIntegration = () => {
  const { isConnected } = useAccount()
  const [userAddress, setUserAddress] = useState("")

  const { data, actions, state } = useLicenseRegistry()

  const handleIssue = async () => {
    if (!isAddress(userAddress)) return
    await actions.issueLicense(userAddress)
    setUserAddress("")
  }

  const handleRevoke = async () => {
    if (!isAddress(userAddress)) return
    await actions.revokeLicense(userAddress)
    setUserAddress("")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p>Please connect your wallet.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">License Registry</h1>

      <div className="mb-6 p-4 border rounded-lg">
        <p>Your license status:</p>
        <p className="font-semibold">
          {data.hasLicense ? "✅ Licensed" : "❌ Not Licensed"}
        </p>
      </div>

      {data.isOwner && (
        <div className="p-4 border rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3">Admin: Issue / Revoke License</h2>

          <input
            type="text"
            className="w-full p-2 border rounded mb-3"
            placeholder="User address"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={handleIssue}
              disabled={!isAddress(userAddress) || state.isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Issue License
            </button>

            <button
              onClick={handleRevoke}
              disabled={!isAddress(userAddress) || state.isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Revoke License
            </button>
          </div>
        </div>
      )}

      {state.isLoading && <p className="text-sm mt-2">Transaction pending...</p>}
    </div>
  )
}

export default SampleIntegration
