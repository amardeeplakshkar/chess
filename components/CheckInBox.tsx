import React from 'react';
import CheckpointIcon from './CheckpointIcon';

interface CheckInBoxProps {
    day: string;
    points: number;
    isSpecial?: boolean
}

const CheckInBox: React.FC<CheckInBoxProps> = ({ isSpecial, day, points }) => {
    return (
        <>
            {
                !isSpecial ?
                <div className='bg-[#141414] gap-1 px-6 p-2 rounded-xl flex flex-col justify-center items-center'>
                    <p className='text-white/45 text-xs'>{day}</p>
                    <CheckpointIcon height={30} width={30} />
                    <h3 className='text-white text-xl font-semibold'>{points}</h3>
                    <p className='text-white/45 text-xs'>Soon</p>
                </div>
                :
                <div className='bg-red-500 gap-1 px-6 p-2 rounded-xl flex flex-col justify-center items-center'>
                    <p className='text-white/45 text-xs'>{day}</p>
                    <CheckpointIcon height={30} width={30} />
                    <h3 className='text-white text-xl font-semibold'>{points}</h3>
                    <p className='text-white/45 text-xs'>Soon</p>
                </div>
            }
        </>
    );
};

export { CheckInBox };
