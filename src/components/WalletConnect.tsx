'use client'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = 'bb78d27adb60ec1c6f22e0f3e52b3e1b'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)


const WalletConnect = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {children}
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default WalletConnect;
