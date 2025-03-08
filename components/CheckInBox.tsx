import React, { useState } from "react";
import CheckpointIcon from "./CheckpointIcon";
import { Check, Loader } from "lucide-react";

interface CheckInBoxProps {
  day: string;
  points: number;
  isSpecial?: boolean;
  isClaimed?: boolean;
  bgImage?: string;
  userId: number;
  checkpointId: string;
}

const CheckInBox: React.FC<CheckInBoxProps> = ({ isClaimed: initialIsClaimed, bgImage, isSpecial,checkpointId, day, points, userId }) => {
  const [isClaimed, setIsClaimed] = useState(initialIsClaimed);
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async (userId: number, checkpointId: string, points: number) => {
    if (isClaimed || loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, checkpointId, points }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsClaimed(true);
        console.log(`Check-in successful! New Points: ${data.points}, Streak: ${data.streak}`);
      } else {
        console.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Check-in failed:", error);
    } finally {
      setLoading(false);
    }
};
  return (
    <div onClick={() => handleCheckIn(userId, checkpointId, points)} className="cursor-pointer">
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
          style={isSpecial && bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" } : { backgroundColor: "#141414" }}
        >
          <p className="text-white text-xs">{day}</p>
          <CheckpointIcon className={`${isSpecial && "opacity-0"}`} height={30} width={30} />
          <h3 className={`${isSpecial && "opacity-0"} text-white text-xl font-semibold`}>{points}</h3>
          <p className="text-white/45 text-xs">{loading ? <Loader className="animate-spin" height={15} width={15} /> : "Soon"}</p>
        </div>
      )}
    </div>
  );
};

export { CheckInBox };
