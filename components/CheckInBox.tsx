'use client'

import React, { useEffect, useState } from 'react'
import { CheckInModel } from './ui/checkinModel';
import { useUser } from './providers/UserProvider';
import toast from 'react-hot-toast';


interface ProModalProps {
  day?: string,
  checkpointId?: string,
  points?: number
  userId?: number
}

export function CheckInBox({
  day,
  points,
  userId,
  checkpointId
}: ProModalProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { user, updateUser } = useUser()
  const isCheckpointClaimed = user?.claimedCheckpoints.includes(checkpointId || '')

  const normalizeDate = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
  }

  useEffect(() => {
    if (isClaimableToday() === "reset") {
        resetCheckIn();
        toast.success("Check-In Reset!!!")
        return;
    }
}, [userId]);

const isClaimableToday = () => {
    try {
        if (isCheckpointClaimed) {
            return false;
        }

        if (!user?.lastCheckIn || !user?.lastClaimedDay) {
            return day === "Day 01";
        }

        const lastCheckIn = new Date(user?.lastCheckIn);
        lastCheckIn.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const daysDifference = Math.floor((today.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDifference > 1) return "reset";

        if (daysDifference === 1) {
            const currentDayNumber = parseInt(user?.lastClaimedDay.split(" ")[1] || "0");
            const thisDayNumber = parseInt(day?.split(" ")[1] || "0");
            return thisDayNumber === currentDayNumber + 1;
        }

        return false;
    } catch (error) {
        console.error("Error in isClaimableToday:", error);
        return false;
    }
};

const resetCheckIn = async () => {
    try {
        const response = await fetch("/api/check-in/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (response.ok) {
            updateUser({
                claimedCheckpoints: null,
                lastCheckIn: null,
                lastClaimedDay: ""
            });
            window.location.reload();
        }
    } catch (error) {
        console.error("Error resetting check-in:", error);
    }
};

  useEffect(() => {
    if (!user || isModalOpen) return

    const lastCheckIn = user?.lastCheckIn ? normalizeDate(new Date(user?.lastCheckIn)) : null
    const today = normalizeDate(new Date())

    if (!lastCheckIn || lastCheckIn.getTime() !== today.getTime()) {
      setIsModalOpen(true)
    }
  }, [user, isModalOpen])

  return (
    <>
      <CheckInModel
        checkpointId={checkpointId}
        userId={userId}
        points={points}
        day={day}
        isClaimable={isClaimableToday()}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default CheckInBox