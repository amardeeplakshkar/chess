import React from 'react'
import Button from './Button'
import CheckpointIcon from '@/components/CheckpointIcon'

interface TaskCardProps {
    iconBg?: string
    bgColor?: string
    title?: string
    points?: number
    onClick?: () => void
    taskIcon?: React.ReactNode
}

const TaskCard: React.FC<TaskCardProps> = ({ bgColor,taskIcon,iconBg, title, points, onClick }) => {
    return (
        <div className={`${!bgColor ? "bg-[#141414]" : bgColor } rounded-xl w-full gap-2 p-2 px-4 flex items-center`}>
            <div className={`p-2 ${iconBg} rounded-full text-2xl`}>
            {taskIcon}
            </div>
            <div className='w-full flex items-center gap-2 justify-between'>
            <div className='font-semibold flex flex-col justify-start items-start'>
                <h1 className='text-lg'>{title}</h1>
                <p className='flex justify-center items-center gap-1 text-xs'>
                    <CheckpointIcon height={16} width={16} /> +{points} CPs
                </p>
            </div>
            <Button onClick={onClick} className='bg-white text-xs p-1 text-black'>
                Done
            </Button>
            </div>
        </div>
    )
}

export default TaskCard