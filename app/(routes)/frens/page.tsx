import Button from '@/components/Button'
import CheckpointIcon from '@/components/CheckpointIcon'
import React from 'react'
import { BsPeopleFill } from 'react-icons/bs'

const Frens = () => {
  return (
    <div className='h-full w-full flex flex-col p-4'>
      <div className='flex w-full justify-between py-2 items-center'>
        <Button>
          <CheckpointIcon height={20} width={20} />
          805
        </Button>
        <div>
          <div className='text-white text-2xl uppercase font-bold'>Chapter 1</div>
        </div>
      </div>
      <div className='pb-2'>
        <h3 className='text-white text-2xl font-bold'>
          How it works?
        </h3>
        <div className='text-muted-foreground text-sm'>
          <ul>
            <li>Invite more frens to earn more CPs</li>
            <li>5 CPs per invite</li>
            <li>15 CPs per invite for frens with telegram premium</li>
          </ul>
        </div>
      </div>
      <div className='flex-1 flex flex-col my-6 gap-2'>
        <div className='bg-[#141414]/80 rounded-md p-4 backdrop-blur-sm flex font-semibold items-center justify-between gap-2'>
          <BsPeopleFill />
          <span>
            15
          </span>
        </div>
        <div className='bg-[#141414]/80 rounded-md p-4 backdrop-blur-sm flex font-semibold items-center justify-between gap-2'>
          <CheckpointIcon width={20} height={20} />
          <span>
            1550
          </span>
        </div>
      </div>
      <div className='text-[.8rem] font-semibold w-full flex mb-8 flex-col gap-2 p-2'>
        <Button className='bg-white text-black'>
          Invite Frens
        </Button>
        <Button>
          Copy Invite Link
        </Button>
      </div>
    </div>
  )
}

export default Frens