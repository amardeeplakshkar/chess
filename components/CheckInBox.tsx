import React from 'react';
import CheckpointIcon from './CheckpointIcon';
import { Check } from 'lucide-react';

interface CheckInBoxProps {
    day: string;
    points: number;
    isSpecial?: boolean
    isClaimed?: boolean
    bgImage?: string
}

const CheckInBox: React.FC<CheckInBoxProps> = ({ isClaimed,bgImage,isSpecial, day, points }) => {
    return (
        <>
            {
                !isClaimed?
                !isSpecial ?
                <div className='bg-[#141414] gap-1 px-6 p-2 rounded-xl flex flex-col justify-center items-center'>
                    <p className='text-white text-xs'>{day}</p>
                    <CheckpointIcon height={30} width={30} />
                    <h3 className='text-white text-xl font-semibold'>{points}</h3>
                    <p className='text-white/45 text-xs'>Soon</p>
                </div>
                :
                <div style={{
                    backgroundImage: `url(${bgImage})`,
                }} className='bg-cover bg-[#141414] bg-center gap-1 px-6 p-2 rounded-xl flex flex-col justify-center items-center'>
                    <p className='text-white font-bold text-xs'>{day}</p>
                    <CheckpointIcon className='opacity-0' height={30} width={30} />
                    <h3 className='text-white opacity-0 text-xl font-semibold'>{points}</h3>
                    <p className='text-white font-black text-xs drop-shadow-md shadow-black'>Soon</p>
                </div>
                :
                <div className='bg-gradient-to-tr border-[#016f15] border shadow-sm shadow-[#016f15] from-[#141414] via-[#016f15] to-[#141414] gap-1 px-6 p-2 rounded-xl flex flex-col justify-center items-center'>
                     <p className='text-white/45 text-xs'>{day}</p>
                    <Check height={30} width={30} />
                    <h3 className='text-white text-xl font-semibold'>{points}</h3>
                    <p className='text-white text-xs'>Done</p>
                </div>
            }
        </>
    );
};

export { CheckInBox };
