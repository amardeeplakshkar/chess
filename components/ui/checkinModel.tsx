
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { ConfettiButton } from "../magicui/confetti"
import { NumberTicker } from "../magicui/number-ticker"
import Image from "next/image"

interface ProModalProps {
    isOpen: boolean;
    onClose: () => void;
    apiLimitReached?: boolean;
}

export function CheckInModel({
    isOpen,
    onClose,
}: ProModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="">
                <div className="relative -z-50" id="stars2"></div>
                <div className="relative -z-50" id="stars3"></div>
                <div className="relative -z-50" id="stars"></div>
                <div className='h-[95dvh] pb-8 flex-col w-full flex justify-center items-center'>
                    <div className='text-xl font-semibold text-center uppercase'>
                        <div className='text-3xl'>Day</div>
                        <NumberTicker
                            value={1}
                            className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-white"
                        />
                        <div>Streak</div>
                    </div>
                    <div className='flex-1 flex justify-center items-center flex-col'>
                        <Image alt='' src="https://stickers.fullyst.com/b844adbb-1c43-50a5-8a2d-7b9574ba0dbd/full/AgADSgIAAladvQo.webp" height={150} width={150} unoptimized />
                        <p className='font-bold my-6 text-3xl'>
                            500<span className='text-sm'>&nbsp;CPs</span>
                        </p>
                    </div>
                    <div
                     onClick={() => {
                        setTimeout(() => {
                          onClose();
                        }, 500);
                      }}
                     className="w-full">
                    <ConfettiButton  className='w-full h-10'>
                        Check-In
                    </ConfettiButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
