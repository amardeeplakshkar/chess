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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const { user, updateUser } = useUser();
  const isCheckpointClaimed = user?.claimedCheckpoints.includes(checkpointId || '');

  useEffect(() => {
    if (isResetting) return; // Don't check if we're in the middle of a reset

    const checkClaimStatus = async () => {
      const claimableStatus = isClaimableToday();

      if (claimableStatus === "reset") {
        setIsResetting(true);
        try {
          await resetCheckIn();
          // After reset, if this is Day 01, show the modal
          if (day === "Day 01") {
            setIsModalOpen(true);
          }
        } catch (error) {
          console.error("Reset error:", error);
          toast.error("Failed to reset check-in status");
        } finally {
          setIsResetting(false);
        }
      } else if (claimableStatus && !isCheckpointClaimed && !isModalOpen) {
        setIsModalOpen(true);
      }
    };

    // Only check on initial load and when user data changes
    if (user && !isModalOpen) {
      checkClaimStatus();
    }
  }, [user, isCheckpointClaimed, day]);

  const isClaimableToday = () => {
    try {
      if (isCheckpointClaimed) {
        return false;
      }

      if (!user?.lastCheckIn || !user?.lastClaimedDay || user?.streak === 0) {
        return day === "Day 01";
      }

      const lastCheckIn = new Date(user?.lastCheckIn);
      lastCheckIn.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const daysDifference = Math.floor((today.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24));
if (daysDifference === 0) return false;
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

      if (!response.ok) {
        throw new Error('Reset failed');
      }

      const data = await response.json();

      if (data.success) {
        updateUser({
          claimedCheckpoints: null,
          lastCheckIn: null,
          lastClaimedDay: ""
        });

        toast.success("Check-In Reset!");
        return true;
      } else {
        throw new Error(data.error || 'Reset failed');
      }
    } catch (error) {
      console.error("Error resetting check-in:", error);
      toast.error("Failed to reset check-in");
      return false;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CheckInModel
        checkpointId={checkpointId}
        userId={userId}
        points={points}
        day={day}
        isClaimable={isClaimableToday()}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default CheckInBox;
