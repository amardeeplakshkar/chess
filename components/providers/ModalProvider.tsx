"use client"
import { checkpoints} from '@/constants'
import { useUser } from '@/components/providers/UserProvider'
import CheckInBox from '@/components/CheckInBox'
const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()

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

export {ModalProvider}
