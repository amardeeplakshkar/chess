'use client'

import React from 'react'
import CheckpointIcon from './CheckpointIcon'
import Button from './Button'
import {Button as UiButton} from './ui/button'
import Countdown from './CountDown'
import { useUser } from './providers/UserProvider'
import {HiOutlineChartBar} from "react-icons/hi"
import Link from 'next/link'

const CurrentChapter = () => {
  const { user } = useUser()
  return (
    <div className='flex w-full justify-between py-2 items-center'>
      <Button className='bg-white/10'>
        <CheckpointIcon height={20} width={20} />
        {(user?.points || 0).toLocaleString()}
      </Button>
      <div className='flex justify-center items-center gap-2'>
        <div className='flex relative flex-col text-white text-2xl uppercase font-bold'>
          Chapter 0
          <div className='flex translate-y-8 absolute self-end flex-nowrap justify-center items-center text-xs gap-2'>
            <Link href={"/leaders"}>
            <UiButton variant={"outline"} className='h-[2rem] w-[2rem] p-2'>
              <HiOutlineChartBar/>
            </UiButton>
            </Link>
            <Countdown targetDate="30-04-2025" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentChapter