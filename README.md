# Basic Smart Contract Integration Project

## How dose it make from?

__using [create-next-app](https://nextjs.org/docs/getting-started/installation) CLI__

```bashrc
npx create-next-app@latest
or
npx create-next-app bscip
```
On installation, you'll see the following prompts:
Please choose your prefer options
```bashrc
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias? No / Yes
What import alias would you like configured? @/*
```

## Getting Start The Project

__clone the project__

```bashrc
git clone https://github.com/BunHouth/bscip.git
```

__install the dependency__

```bashrc
cd bscip && yarn install
```

__running the project__

```bashrc
yarn dev
```

## Let start implement smart contract integration

First we need to install additional dependency for web3. Web3 libary will allow us to execute blockchain function inside our application.

Install [Web3](https://www.npmjs.com/package/web3) or  [Alternative of web3](https://docs.ethers.org/v6/)
```js
yarn add web3
```

To start the integration, we need to choose the network. There are many network in blockchain, But for this case we will use Etherum Goerli Testnet. Please check [chainlist](https://chainlist.org/?testnets=true&search=Goerli) for RPC url.

Additional RPC
- [Alchemy](https://alchemy.com)
- [Infura](https://infura.io)
- [Quicknode](https://www.quicknode.com/)
- [Ankr](https://www.ankr.com)

__Modify the code inside `page.tsx`__

```js
import Web3, {HttpProvider} from 'web3';
import {useEffect, useRef} from 'react';

// inside component

const web3Ref: {current: any} = useRef(null);

  const initSmartContract = () => {
    const provider = new HttpProvider('https://arb-goerli.g.alchemy.com/v2/BnY38PEg9kR2DojcXUAXUlsy1uRr_AeA')
    web3Ref.current = new Web3(provider);
  }

  useEffect(() => {
    initSmartContract()
  }, []);
```

Run the code to make sure everything working fine. 

We have fully connect our web page into web3, next step start connect web3 into blockchain smart contract.
To call smart contract function we need the [ABI](https://www.quicknode.com/guides/ethereum-development/smart-contracts/what-is-an-abi). 
ABI can get from your smart contract build or using any abi from blockchain explorer for testing.

In this case we will using standard ERC20 ABI for testing.

Please add following code init `src/abi/erc20.json`

```js
[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]
```




## Bonus-implement wallet integration into website
First we need to install additional dependency for web3

Please check [WalletConnect](https://docs.walletconnect.com/2.0/web3modal/react/wagmi/installation) for more detail

```bashrc
yarn add @web3modal/ethereum @web3modal/react wagmi viem
```

### Implementation
 By default of next js, layout is the root of render all page. So we do quick modify the `layout.tsx`

Import additional component
```js
import WalletConnect from '@/components/WalletConnect'
```
There are small modification inside component as well. 
```js
<WalletConnect>
 {children}
</WalletConnect>
```

Then create the `WalletConnect` inside components folder. 
```js
'use client'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = 'YOUR_PROJECT_ID'

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

```
Please do replace `YOUR_PROJECT_ID` with your wallet connect cloud project id. 
[Get your project id by register in wallet connect cloud](https://cloud.walletconnect.com)

Run your project to make sure everything working.

```bashrc
yarn dev
```

Add Connect Wallet Button into `page.tsx`

```js
import { Web3Button } from '@web3modal/react'

// inside component please add following code
<Web3Button />
```
Return to browser and click Connect Wallet button.

For this step, please be sure you have wallet extenstion install.

Popular Browser Extenstion Wallet [Metamask](http://metamask.io/) [TrustWallet](https://trustwallet.com/)

After click Connect Wallet Button, popup will display the option for connectting to wallet. Choose your prefer wallet and done.

Finally we connect our page with browser wallet.