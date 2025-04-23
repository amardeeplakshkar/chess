"use client"
import { checkpoints } from '@/constants'
import { useUser } from '@/components/providers/UserProvider'
import CheckInBox from '@/components/CheckInBox'
import { useTelegram } from './TelegramData'
import { useEffect } from 'react'

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()
  const { WebApp } = useTelegram()
  useEffect(() => {
    if (typeof WebApp !== 'undefined') {
      WebApp.ready();
  
      if (user?.telegramId) {
        WebApp.requestFullscreen();
      }
    }
  }, [user?.telegramId, WebApp]);

    return (
      <>
        {checkpoints.map((data, i) => (
          <CheckInBox
            key={i}
            day={data.day}
            points={data.number}
            userId={user?.telegramId}
            checkpointId={data.id}
          />
        ))}
        {children}
      </>
    )
  }

export { ModalProvider }
