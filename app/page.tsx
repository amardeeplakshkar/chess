/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Button from '@/components/Button'
import CheckpointIcon from '@/components/CheckpointIcon'
import CurrentChapter from '@/components/CurrentChapter'
import { useTelegram } from '@/components/providers/TelegramData'
import { useUser } from '@/components/providers/UserProvider'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
  const { user, updateUser, startParam } = useUser()
  const router = useRouter()
  const { WebApp, userData } = useTelegram()

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
          });

          const data = await response.json();

          if (response.ok) {
            updateUser({ points: data.pointsAdded });
            toast.success(`Successfully referred! ${data.pointsAdded} CPs added`);
          } else {
            console.error('Referral error:', data.error);
          }
        } catch (error) {
          console.error('Failed to process referral:', error);
        }
      }
    };

    processReferral();
  }, [startParam, userData?.userId, updateUser]);

  const handleShareStory = (mediaUrl: string, text = "", widgetLink?: { url: string; name?: string }) => {
    if (WebApp) {
      const params: Record<string, any> = {};

      if (text) {
        params.text = text;
      }

      if (widgetLink && widgetLink.url) {
        params.widget_link = {
          url: widgetLink.url,
          ...(widgetLink.name && { name: widgetLink.name }),
        };
      }

      WebApp.shareToStory(mediaUrl, params);
    } else {
      console.error("Telegram WebApp SDK not available.");
    }
  }
  return (
    <div className='h-full w-full flex flex-col items-center p-4'>
      <div className='flex-1 flex flex-col w-full'>
        <div className="font-bold uppercase w-full leading-none text-center text-white" style={{ fontSize: '11dvw' }}>Early Access</div>
        <CurrentChapter />
        <div className='flex flex-1 flex-col justify-center items-center'>
          <CheckpointIcon height={200} width={200} />
          <div className="font-bold flex justify-center items-end w-full leading-none text-center text-white" style={{ fontSize: '8dvw' }}>
            {(user?.points || 0).toLocaleString()}&nbsp;
            <span className='text-base'>CPs</span>
          </div>
        </div>
      </div>
      <div className='text-[.8rem] w-full flex mb-8 justify-center items-center flex-col gap-2 p-2'>
        <Button onClick={() => router.replace("https://t.me/checkpoint_airdrop")} className='w-full bg-white text-black font-semibold'>
          Join Community {startParam}
        </Button>
        <div className='grid grid-cols-2 gap-2 w-full'>
          <Button onClick={() => router.push("/frens")} className='w-full font-semibold'>
            Invite Friends
          </Button>
          <Button onClick={() => handleShareStory("https://res.cloudinary.com/duscymcfc/image/upload/f_auto,q_auto/v1/Checkpoint/checkpoint",
            "Check out this awesome story!",
            { url: `https://t.me/checkpointcryptobot/app?start=${user?.telegramId}`, name: "Visit Now" })} className='w-full font-semibold bg-transparent border'>
            Share Story
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage