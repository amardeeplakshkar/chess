import React, { useState } from "react";
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

const CheckInBox: React.FC<CheckInBoxProps> = ({ isClaimed, bgImage, isSpecial, checkpointId, day, points, userId }) => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useUser();

  // Determine if this checkpoint is claimable today
  const isClaimableToday = () => {
    if (!user?.lastClaimedDay) {
      return day === "Day 01";
    }

    const currentDayNumber = parseInt(user?.lastClaimedDay.split(" ")[1]);
    const thisDayNumber = parseInt(day.split(" ")[1]);
    
    return thisDayNumber === currentDayNumber + 1;
  };

  const handleCheckIn = async (userId: number, checkpointId: string, points: number, day: string, isSpecial: boolean | undefined, bgImage: string | undefined) => {
    if (isClaimed || loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, checkpointId, points, day }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSpecial) {
          updateUser({
            points,
            claimedCheckpoints: [checkpointId],
            gifts: bgImage ? [bgImage] : []
          });  
        }
        updateUser({
          points,
          claimedCheckpoints: [checkpointId]
        });
        toast.success(`Check-in successful! New Points: ${data.points}, Streak: ${data.streak}`);
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      toast.error(`Check-in failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={() => isClaimableToday() && handleCheckIn(userId, checkpointId, points, day, isSpecial, bgImage)} className="cursor-pointer">
      {isClaimed ? (
        <div className="bg-gradient-to-tr border-[#016f15] border shadow-sm shadow-[#016f15] from-[#141414] via-[#016f15] to-[#141414] gap-1 px-6 p-2 rounded-xl flex flex-col justify-center items-center">
          <p className="text-white/45 text-xs">{day}</p>
          <Check height={30} width={30} />
          <h3 className="text-white text-xl font-semibold">{points}</h3>
          <p className="text-white text-xs">Done</p>
        </div>
      ) : (
        <div
          className={`gap-1 px-6 p-2 rounded-xl flex flex-col justify-center items-center ${loading ? "opacity-50" : ""} ${isClaimableToday() ? "bg-white border-2 border-dashed border-black text-black" : ""}`}
          style={
            isClaimableToday() 
              ? {} 
              : isSpecial && bgImage 
                ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" } 
                : { backgroundColor: "#141414" }
          }
        >
          <p className="text-xs">{day}</p>
          <CheckpointIcon theme={isClaimableToday() ? true : false} className={`${isSpecial && "opacity-0"}`} height={30} width={30} />
          <h3 className={`${isSpecial && "opacity-0"} text-xl font-semibold`}>{points}</h3>
          <p className="text-inherit/45 text-xs">{loading ? <Loader className="animate-spin" height={15} width={15} /> : isClaimableToday() ? "Claim" : "Soon"}</p>
        </div>
      )}
    </div>
  );
};

export { CheckInBox };