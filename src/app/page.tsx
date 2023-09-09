'use client'

import { Web3Button } from '@web3modal/react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-5">
      <div className='text-2xl text-center py-4'>Welcome To Code-C</div>
      <div className='text-center'>
        Visit <a href="https://www.facebook.com/Web3Together" target='_blank' className='text-blue-400'>Web3 Together Community</a> Facebook Page or <a href="https://t.me/TheWeb3Together" target='_blank' className='text-blue-400'>Telegram</a> For upcoming event
      </div>
      <div className='py-5 mx-auto'>
        <Web3Button />
      </div>
    </main>
  )
}
