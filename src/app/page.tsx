'use client'

import Web3, {HttpProvider} from 'web3';
import {useEffect, useRef, useState} from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import abi from '@/abi/erc20.json';

export default function Home() {
  const [balanceInfo, setBalanceInfo] = useState({address: '', balance: '', isSubmit: false});
  const [tokenInfo, setTokenInfo] = useState({address: '', nativeBalance: '', balance: '', isSubmit: false, name: '', decimal: 18});
  const web3Ref: {current: any} = useRef(null);

  const onChangeAddress = (event: any) => {
    setBalanceInfo(prev => ({ ...prev, address: event.target.value }));
  }

  const onChangeTokenAddress = (event: any) => {
    setTokenInfo(prev => ({ ...prev, address: event.target.value }));
  }

  const initSmartContract = () => {
    const provider = new HttpProvider(process.env.NEXT_PUBLIC_RPC_URL || '')
    web3Ref.current = new Web3(provider);
  }

  const onClickBalance = async () => {
    if(!web3Ref.current.utils.isAddress(balanceInfo.address)) {
      alert('Invalid Token Address')
      return;
    }

    setBalanceInfo(prev => ({ ...prev, isSubmit: true }));
    const balance = await web3Ref.current.eth.getBalance(balanceInfo.address)
    // @ts-ignore
    setBalanceInfo(prev => ({ ...prev, balance: Number(balance) / 10**18, isSubmit: false }));
  }

  const onClickTokenBalance = async () => {
    if(!web3Ref.current.utils.isAddress(tokenInfo.address)) {
      alert('Invalid Token Address')
      return;
    }
    setTokenInfo(prev => ({ ...prev, isSubmit: true }));
    const contract = new web3Ref.current.eth.Contract(abi, tokenInfo.address)
    const decimal = await contract.methods.decimals().call({});
    const name = await contract.methods.name().call({});
    const nativeBalance = await web3Ref.current.eth.getBalance(tokenInfo.address)
    const balance = await contract.methods.balanceOf(tokenInfo.address).call({});
    console.log(decimal)
    // @ts-ignore
    setTokenInfo(prev => ({ ...prev, nativeBalance: Number(nativeBalance) / 10**18, isSubmit: false, name, decimal: Number(decimal), balance: Number(balance) / 10 ** (Number(decimal)) }));
  }

  const onClickReset = () => {
    setBalanceInfo({address: '', balance: '', isSubmit: false})
  }

  const onClickTokenReset = () => {
    setTokenInfo({address: '', nativeBalance: '', balance: '', isSubmit: false, name: '', decimal: 18})
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
        <div className='text-xl text-center py-4'>Fetch Any Contract Token Balance Info</div>
        <div className='flex w-full mx-auto'>
          <div className='w-6/12'>
            <Label value="Input Wallet Address" className='text-white'/>
            <TextInput placeholder="0x0000000000000000000000000000000000000000" className='py-2' value={tokenInfo.address} onChange={onChangeTokenAddress} />
          </div>
          <div className='w-3/12 pl-4'>
            <Label value="Native Balance" className='text-white'/>
            <TextInput placeholder="0.000" className='py-2' readOnly value={tokenInfo.nativeBalance}/>
          </div>
          <div className='w-3/12 pl-4'>
            <Label value="Token Name" className='text-white'/>
            <TextInput placeholder="Token Name" className='py-2' readOnly value={tokenInfo.name}/>
          </div>
          <div className='w-3/12 pl-4'>
            <Label value="Token Decimal" className='text-white'/>
            <TextInput placeholder="0.000" className='py-2' readOnly value={tokenInfo.decimal}/>
          </div>
          <div className='w-3/12 pl-4'>
            <Label value="Token Balance" className='text-white'/>
            <TextInput placeholder="0.000" className='py-2' readOnly value={tokenInfo.balance}/>
          </div>
          <div className='flex items-end ml-4 w-4/12 py-2'>
            <Button onClick={onClickTokenBalance} className='w-34' isProcessing={tokenInfo.isSubmit}>Show Balance</Button>
            <Button onClick={onClickTokenReset} className='ml-2'>Reset</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
