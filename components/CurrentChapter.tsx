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

const CurrentChapter = () => {
  return (
    <div className='flex w-full justify-between py-2 items-center'>
      <Button>
        <CheckpointIcon height={20} width={20} />
        805
      </Button>
      <div className='flex justify-center items-center gap-2'>
        <Drawer>
          <DrawerTrigger>
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
                    <CheckInBox day={checkpoint.day} isSpecial={checkpoint.isSpecial} points={checkpoint.number} />
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
            <Countdown targetDate="03-03-2025" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentChapter