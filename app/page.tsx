'use client'
import Button from '@/components/Button'
import CheckpointIcon from '@/components/CheckpointIcon'
import { useRouter } from 'next/navigation'
import React from 'react'

const HomePage = () => {
  const router = useRouter()
  return (
    <div className='h-full w-full flex flex-col items-center p-4'>
      <div className='flex-1 flex flex-col w-full'>
        <div className="font-bold uppercase w-full leading-none text-center text-white" style={{ fontSize: '11.95dvw' }}>Early Access</div>
        <div className='flex w-full justify-between p-2 items-center'>
          <Button>
            <CheckpointIcon height={20} width={20}/>
            805
          </Button>
          <div>
            <div className='text-white text-2xl uppercase font-bold'>Chapter 1</div>
          </div>
        </div>
          <div className='flex flex-1 flex-col justify-center items-center'>
            <CheckpointIcon height={200} width={200}/>
            <div className="font-bold flex justify-center items-end w-full leading-none text-center text-white" style={{ fontSize: '8dvw' }}>
              2500&nbsp;
              <span className='text-base'>CPs</span>
            </div>
          </div>
      </div>
      <div className='w-full flex mb-8 justify-center items-center flex-col gap-2 p-2'>
        <Button onClick={()=>router.push("/frens")} className='w-full font-semibold bg-white text-black'>
          Invite Friends ( +15<CheckpointIcon theme height={20} width={20}/> )
        </Button>
        <Button onClick={()=>alert("hello")} className='w-full font-semibold bg-transparent border'>
          Share Story ( +50<CheckpointIcon height={20} width={20}/> )
        </Button>
        <Button onClick={()=>router.replace("https://t.me/checkpoint_airdrop")} className='w-full font-semibold'>
          Join Community
        </Button>
      </div>
    </div>
  )
}

export default HomePage