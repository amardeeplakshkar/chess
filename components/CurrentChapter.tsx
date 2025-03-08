'use client'

import React from 'react'
import CheckpointIcon from './CheckpointIcon'
import Button from './Button'
import { Button as Button2 } from './ui/button'
import Countdown from './CountDown'
import { CalendarCheck } from 'lucide-react'
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'
import { CheckInBox } from './CheckInBox'
import { ScrollArea } from './ui/scroll-area'
import { checkpoints } from '@/constants'
import { useUser } from './providers/UserProvider'

const CurrentChapter = () => {
  const { user } = useUser()
  return (
    <div data-aos="fade-down" data-aos-duration="1000" className='flex w-full justify-between py-2 items-center'>
      <Button className='bg-white/10'>
        <CheckpointIcon height={20} width={20} />
        {(user?.points || 0).toLocaleString()}
      </Button>
      <div className='flex justify-center items-center gap-2'>
        <Drawer>
          <DrawerTrigger asChild suppressHydrationWarning>
            <Button2 variant={"outline"} size={"icon"}>
              <CalendarCheck />
            </Button2>
          </DrawerTrigger>
          <DrawerContent className=''>
            <ScrollArea className='h-[45dvh]'>
              <div className='flex p-4 *:cursor-pointer flex-wrap gap-2 items-center justify-center'>
                {
                  checkpoints.map((checkpoint, index) =>
                    <div key={index}>
                      <CheckInBox day={checkpoint.day} bgImage={checkpoint.bgImage} isSpecial={checkpoint.isSpecial} points={checkpoint.number} />
                    </div>
                  )
                }
              </div>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
        <div className='flex relative flex-col text-white text-2xl uppercase font-bold'>
          Chapter 0
          <div className='flex translate-y-8 absolute self-end items-center text-xs gap-2'>
            <Countdown targetDate="30-03-2025" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentChapter