'use client'

import Web3, {HttpProvider} from 'web3';
import {useEffect, useRef, useState} from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import abi from '@/abi/erc20.json';

const CONTRACT_ADDRESS = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'

export default function Home() {
  const [balanceInfo, setBalanceInfo] = useState({address: '', balance: '', isSubmit: false});
  const contractRef: {current: any} = useRef(null);
  const web3Ref: {current: any} = useRef(null);

  const onChangeAddress = (event: any) => {
    setBalanceInfo(prev => ({ ...prev, address: event.target.value }));
  }

  const initSmartContract = () => {
    const provider = new HttpProvider(process.env.NEXT_PUBLIC_RPC_URL)
    const web3 = new Web3(provider);
    contractRef.current = new web3.eth.Contract(abi, CONTRACT_ADDRESS)
    web3Ref.current = web3;
  }

  const onClickBalance = async () => {
    setBalanceInfo(prev => ({ ...prev, isSubmit: true }));
    const balance = await web3Ref.current.eth.getBalance(CONTRACT_ADDRESS)
    // @ts-ignore
    setBalanceInfo(prev => ({ ...prev, balance: Number(balance) / 10**18, isSubmit: false }));
  }

  const onClickReset = () => {
    setBalanceInfo({address: '', balance: '', isSubmit: false})
  }

  useEffect(() => {
    initSmartContract()
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-5">
      <div className='text-2xl text-center py-4'>Welcome To Code-C</div>
      <div className='text-center'>
        Visit <a href="https://www.facebook.com/Web3Together" target='_blank' className='text-blue-400'>Web3 Together Community</a> Facebook Page or <a href="https://t.me/TheWeb3Together" target='_blank' className='text-blue-400'>Telegram</a> For upcoming event
      </div>
      <div className='py-5'>
        <div className='text-xl text-center py-4'>Fetch Address Balance</div>
        <div className='flex w-6/12 mx-auto'>
          <div className='w-6/12'>
            <Label value="Input Wallet Address" className='text-white'/>
            <TextInput placeholder="0x0000000000000000000000000000000000000000" className='py-2' value={balanceInfo.address} onChange={onChangeAddress} />
          </div>
          <div className='w-3/12 pl-4'>
            <Label value="Balance" className='text-white'/>
            <TextInput placeholder="0.000" className='py-2' readOnly value={balanceInfo.balance}/>
          </div>
          <div className='flex items-end ml-4 w-4/12 py-2'>
            <Button onClick={onClickBalance} className='w-34' isProcessing={balanceInfo.isSubmit}>Show Balance</Button>
            <Button onClick={onClickReset} className='ml-2'>Reset</Button>
          </div>
        </div>
      </div>

      <div className='py-5'>
        <div className='text-xl text-center py-4'>Fetch Contract Balance Info</div>
        <div className='flex w-6/12 mx-auto'>
          <div className='w-6/12'>
            <Label value="Input Wallet Address" className='text-white'/>
            <TextInput placeholder="0x0000000000000000000000000000000000000000" className='py-2' value={balanceInfo.address} onChange={onChangeAddress} />
          </div>
          <div className='w-3/12 pl-4'>
            <Label value="Balance" className='text-white'/>
            <TextInput placeholder="0.000" className='py-2' readOnly value={balanceInfo.balance}/>
          </div>
          <div className='flex items-end ml-4 w-4/12 py-2'>
            <Button onClick={onClickBalance} className='w-34' isProcessing={balanceInfo.isSubmit}>Show Balance</Button>
            <Button onClick={onClickReset} className='ml-2'>Reset</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
