'use client'
import Button from '@/components/Button'
import CheckpointIcon from '@/components/CheckpointIcon'
import CurrentChapter from '@/components/CurrentChapter'
import { useTelegram } from '@/components/providers/TelegramData'
import { useUser } from '@/components/providers/UserProvider'
import { APP_URL } from '@/constants'
import React from 'react'
import toast from 'react-hot-toast'
import { BsPeopleFill } from 'react-icons/bs'

const Frens = () => {
  const { userData } = useTelegram()
  const {user} = useUser()
  const copyInviteLink = () => {
    toast.success('Invite link copied to clipboard')
    navigator.clipboard.writeText(`${APP_URL}${userData?.userId}`)
  }
  const shareInviteLink = () => {
    toast.success('Invite link shared')
    window.open(`https://t.me/share/url?url=${APP_URL}${userData?.userId}`, '_blank')
  }
  return (
    <div className='h-full w-full flex flex-col p-4'>
      <CurrentChapter />
      <div className='pb-2'>
        <h3 className='text-white text-2xl font-bold'>
          How it works?
        </h3>
        <div className='text-muted-foreground text-sm'>
          <ul>
            <li>Invite more frens to earn more CPs</li>
            <li>50 CPs per invite</li>
            <li>150 CPs per invite for frens with telegram premium</li>
          </ul>
        </div>
      </div>
      <div className='flex-1 flex justify-center items-center w-full'>
        <div className='flex flex-col bg-[#141414]/80 overflow-hidden w-full rounded-lg justify-between items-center my-6 gap-2'>
          <div className='p-4 border-b w-full backdrop-blur-sm flex font-semibold items-center justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <BsPeopleFill />
              <p>
                Friends
              </p>
            </div>
            <span>
              {user?.referrals?.length || 0}
            </span>
          </div>
          <div className='p-4 w-full backdrop-blur-sm flex font-semibold items-center justify-between gap-2'>
            <div className='flex gap-2'>
              <CheckpointIcon width={20} height={20} />
              <p>
                Earned CPs
              </p>
            </div>
            <span>
              {user?.referrals?.length*50 || 0}
            </span>
          </div>
        </div>
      </div>

      <div className='text-[.8rem] font-semibold w-full flex mb-8 flex-col gap-2 p-2'>
        <Button onClick={shareInviteLink} className='w-full bg-white text-black'>
          Invite Frens
        </Button>
        <Button onClick={copyInviteLink}>
          Copy Invite Link
        </Button>
      </div>
    </div>
  )
}

export default Frens