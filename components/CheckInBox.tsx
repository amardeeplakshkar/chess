'use client'
import React, { useEffect, useState } from "react";
import CheckpointIcon from "./CheckpointIcon";
import { Check, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "./providers/UserProvider";

interface CheckInBoxProps {
  day: string;
  points: number;
  isSpecial?: boolean;
  isClaimed?: boolean;
  bgImage?: string;
  userId: number;
  checkpointId: string;
}

const CheckInBox: React.FC<CheckInBoxProps> = ({
  isClaimed,
  bgImage,
  isSpecial,
  checkpointId,
  day,
  points,
  userId
}) => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useUser();

  useEffect(() => {
    if (isClaimableToday() === "reset") {
      resetCheckIn();
    }
  }, [userId]);

  const resetCheckIn = async () => {
    try {
      const response = await fetch("/api/check-in/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        updateUser({
          claimedCheckpoints: [],
          points: 0
        });
        toast.success("Check-in streak reset. Start fresh with Day 01!");
      }
    } catch (error) {
      console.error("Error resetting check-in:", error);
    }
  };

  const isClaimableToday = () => {
    try {
      if (!user?.lastCheckIn || !user?.lastClaimedDay) {
        return day === "Day 01";
      }

      const lastCheckIn = new Date(user.lastCheckIn);
      lastCheckIn.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const daysDifference = Math.floor((today.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDifference > 1) return "reset";

      if (daysDifference === 1) {
        const currentDayNumber = parseInt(user.lastClaimedDay.split(" ")[1] || "0");
        const thisDayNumber = parseInt(day.split(" ")[1] || "0");
        return thisDayNumber === currentDayNumber + 1;
      }

      return false;
    } catch (error) {
      console.error("Error in isClaimableToday:", error);
      return false;
    }
  };

  const handleCheckIn = async () => {
    if (isClaimed || loading || !userId) return;

    setLoading(true);

    try {
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          checkpointId,
          points,
          day,
          bgImage
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSpecial) {
          updateUser({
            points,
            claimedCheckpoints: [checkpointId],
            gifts: bgImage ? [bgImage] : []
          });
        } else {
          updateUser({
            points,
            claimedCheckpoints: [checkpointId]
          });
        }
        toast.success(`Check-in successful! Points: ${data.points}, Streak: ${data.streak}`);
      } else {
        toast.error(data.error || "Check-in failed");
      }
    } catch (error) {
      console.error("Check-in error:", error);
      toast.error("Failed to check in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isClaimable = isClaimableToday();

  return (
    <div
      onClick={() => isClaimable && handleCheckIn()}
      className={`cursor-pointer ${loading ? 'pointer-events-none' : ''}`}
    >
      {isClaimed ? (
        <div className="bg-gradient-to-tr border-[#016f15] border shadow-sm shadow-[#016f15] from-[#141414] via-[#016f15] to-[#141414] gap-1 px-6 p-2 rounded-xl flex flex-col justify-center items-center">
          <p className="text-white/45 text-xs">{day}</p>
          <Check height={30} width={30} />
          <h3 className="text-white text-xl font-semibold">{points}</h3>
          <p className="text-white text-xs">Done</p>
        </div>
      ) : (
        <div
          className={`gap-1 px-6 p-2 rounded-xl flex flex-col justify-center items-center ${loading ? "opacity-50" : ""}`}
          style={{
            ...(isClaimable
              ? {
                backgroundColor: "white",
                borderWidth: "2px",
                borderStyle: "dashed",
                borderColor: "black",
                color: "black",
                backgroundImage: bgImage ? `url(${bgImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }
              : isSpecial && bgImage
                ? {
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }
                : { backgroundColor: "#141414" })
          }}
        >
          <p className="text-xs">{day}</p>
          <CheckpointIcon
            theme={false}
            className={`${isSpecial ? "opacity-0" : ""}`}
            height={30}
            width={30}
          />
          <h3 className={`${isSpecial ? "opacity-0" : ""} text-xl font-semibold`}>
            {points}
          </h3>
          <p className="text-inherit/45 text-xs">
            {loading ? (
              <Loader className="animate-spin" height={15} width={15} />
            ) : isClaimable === "reset" ? (
              "Start Over"
            ) : isClaimable ? (
              "Claim"
            ) : (
              "Soon"
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export { CheckInBox };