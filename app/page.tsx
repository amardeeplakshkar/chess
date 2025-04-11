'use client'

import Button from '@/components/Button'
import CurrentChapter from '@/components/CurrentChapter'
import { useTelegram } from '@/components/providers/TelegramData'
import { useUser } from '@/components/providers/UserProvider'
import { CheckInModel } from '@/components/ui/checkinModel'
import MedalIcon from '@/components/ui/MedalType'
import { APP_URL, checkpoints, COMMUNITY_URL } from '@/constants'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
  const { user, updateUser } = useUser()
  const router = useRouter()
  const { WebApp, userData, startParam } = useTelegram()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userId = user?.telegramId

  const normalizeDate = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
  }


  const isClaimableToday = () => {
    try {
      const lastCheckIn = new Date(user?.lastCheckIn)
      lastCheckIn.setHours(0, 0, 0, 0)

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const daysDifference = Math.floor((today.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDifference > 1) return "reset"
      return false
    } catch (error) {
      console.error("Error in isClaimableToday:", error)
      return false
    }
  }

  const resetCheckIn = async () => {
    try {
      const response = await fetch("/api/check-in/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        updateUser({
          claimedCheckpoints: [],
          lastCheckIn: null,
          lastClaimedDay: ""
        })
        window.location.reload()
      }
    } catch (error) {
      console.error("Error resetting check-in:", error)
    }
  }

  useEffect(() => {
    if (userId && isClaimableToday() === "reset") {
      resetCheckIn()
    }
  }, [userId])

  useEffect(() => {
    if (!user || isModalOpen) return

    const lastCheckIn = user?.lastCheckIn ? normalizeDate(new Date(user.lastCheckIn)) : null
    const today = normalizeDate(new Date())

    if (!lastCheckIn || lastCheckIn.getTime() !== today.getTime()) {
      setIsModalOpen(true)
    }
  }, [user, isModalOpen])

  useEffect(() => {
    const processReferral = async () => {
      if (startParam && userData?.userId) {
        try {
          const response = await fetch('/api/refer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: userData.userId,
              referrerId: startParam
            })
          })

          const data = await response.json()

          if (response.ok) {
            updateUser({ points: data.pointsAdded })
            toast.success(`Referral Bonus! ${data.pointsAdded} CPs added`)
          } else {
            console.error('Referral error:', data.error)
          }
        } catch (error) {
          console.error('Failed to process referral:', error)
        }
      }
    }

    processReferral()
  }, [startParam, userData?.userId, updateUser])

  const handleShareStory = (
    mediaUrl: string,
    text = "",
    widgetLink?: { url: string; name?: string }
  ) => {
    if (WebApp) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: Record<string, any> = {}
      if (text) params.text = text
      if (widgetLink && widgetLink.url) {
        params.widget_link = {
          url: widgetLink.url,
          ...(widgetLink.name && { name: widgetLink.name }),
        }
      }
      WebApp.shareToStory(mediaUrl, params)
    } else {
      console.error("Telegram WebApp SDK not available.")
    }
  }

  return (
    <div className='h-full w-full flex flex-col items-center p-4'>
      <div className='flex-1 flex flex-col w-full'>
        <div className="font-bold uppercase w-full leading-none text-center text-white" style={{ fontSize: '11dvw' }}>
          Early Access
        </div>

        <CurrentChapter />

        <div className='flex flex-1 flex-col justify-center items-center'>
          <MedalIcon height={200} width={200} />

          <div className="font-bold flex justify-center items-end w-full leading-none text-center text-white" style={{ fontSize: '8dvw' }}>
            {(user?.points || 0).toLocaleString()}&nbsp;
            <span className='text-base'>CPs</span>
          </div>
        </div>
      </div>

      {
        isClaimableToday() === "reset" ?
          checkpoints.map((data, i) => (
            <CheckInModel
              key={i}
              checkpointId={data.id}
              userId={user?.telegramId}
              points={data.number}
              day={data.day}
              isOpen={isModalOpen && i === 0}
              onClose={() => setIsModalOpen(false)}
            />
          )) : checkpoints.map((data, i) => (
            <CheckInModel
              key={i}
              checkpointId={data.id}
              userId={user?.telegramId}
              points={data.number}
              day={data.day}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          ))
      }

      <div className='text-[.8rem] w-full flex mb-8 justify-center items-center flex-col gap-2 p-2'>
        <Button onClick={() => router.replace(`${COMMUNITY_URL}`)} className='w-full bg-white text-black font-semibold'>
          Join Community
        </Button>

        <div className='grid grid-cols-2 gap-2 w-full'>
          <Button onClick={() => router.push("/frens")} className='w-full font-semibold'>
            Invite Friends
          </Button>

          <Button
            onClick={() =>
              handleShareStory(
                "httpupload/f_auto,q_auto/v1/Checkpoint/checkpoint",
                "Check out this awesome story!",
                { url: `${APP_URL}${user?.telegramId}`, name: "Visit Now" }
              )
            }
            className='w-full font-semibold bg-transparent border'
          >
            Share Story
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
