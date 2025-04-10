import { ConfettiButton } from '@/components/magicui/confetti'
import { NumberTicker } from '@/components/magicui/number-ticker'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='h-dvh p-8 flex-col w-full flex justify-center items-center'>
      <div className='text-xl mt-8 font-semibold text-center uppercase'>
        <div className='text-3xl'>Day</div>
        <NumberTicker
          value={100}
          className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-white"
        />
        <div>Streak</div>
      </div>
      <div className='flex-1 flex justify-center items-center flex-col'>
        <Image alt='' src="https://stickers.fullyst.com/b844adbb-1c43-50a5-8a2d-7b9574ba0dbd/full/AgADSgIAAladvQo.webp" height={150} width={150} unoptimized />
        <p className='font-bold my-6 text-3xl'>
          500<span className='text-sm'>&nbsp;CPs</span>
        </p>
      </div>
      <ConfettiButton className='w-full h-10'>
        Check-In
      </ConfettiButton>
    </div>
  )
}

export default page