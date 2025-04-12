'use client'

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { ConfettiButton } from "../magicui/confetti"
import { NumberTicker } from "../magicui/number-ticker"
import Image from "next/image"
import { useUser } from "../providers/UserProvider";
import toast from "react-hot-toast";

interface ProModalProps {
    isOpen: boolean;
    onClose: () => void;
    isClaimable?: boolean | "reset";
    day?: string,
    checkpointId?: string,
    points?: number
    userId?: number
}
export function CheckInModel({
    isOpen,
    onClose,
    day,
    points,
    userId,
    checkpointId,
    isClaimable
}: ProModalProps) {
    const { user, updateUser } = useUser()
    const isCheckpointClaimed = user?.claimedCheckpoints.includes(checkpointId || '');

    const handleCheckIn = async () => {
        if (!userId) {
            toast.error("Login failed");
            return;
        }

        if (isCheckpointClaimed) {
            toast.error("You've already claimed this checkpoint");
            return;
        }

        try {
            const response = await fetch("/api/check-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    checkpointId,
                    points,
                    day,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                updateUser({
                    points,
                    claimedCheckpoints: [checkpointId || ""]
                });
                toast.success(`Check-in successful! Points: ${data.points}, Streak: ${data.streak}`);
            } else {
                toast.error(data.error || "Check-in failed");
            }
        } catch (error) {
            console.error("Check-in error:", error);
            toast.error("Failed to check in. Please try again.");
        }
    };

    return (
        <>
            {isClaimable && !isCheckpointClaimed &&
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="">
                        <div className="relative -z-50" id="stars2"></div>
                        <div className="relative -z-50" id="stars3"></div>
                        <div className="relative -z-50" id="stars"></div>
                        <div className='h-[95dvh] pb-8 flex-col w-full flex justify-center items-center'>
                            <div className='text-xl font-semibold text-center uppercase'>
                                <div className='text-3xl'>Day</div>
                                <NumberTicker
                                    value={Number(day?.slice(5))}
                                    className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-white"
                                />
                                <div>Streak</div>
                            </div>
                            <div className='flex-1 flex justify-center items-center flex-col'>
                                <Image alt='' src="https://stickers.fullyst.com/b844adbb-1c43-50a5-8a2d-7b9574ba0dbd/full/AgADSgIAAladvQo.webp" height={150} width={150} unoptimized />
                                <p className='font-bold my-6 text-3xl'>
                                    {points}<span className='text-sm'>&nbsp;CPs</span>
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setTimeout(() => {
                                        handleCheckIn();
                                        onClose();
                                    }, 300);
                                }}
                                className="w-full">
                                <ConfettiButton className='w-full h-10'>
                                    Check-In
                                </ConfettiButton>
                            </div>

                        </div>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}