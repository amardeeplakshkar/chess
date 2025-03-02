/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import CheckpointIcon from '@/components/CheckpointIcon'
import { Check, Loader } from 'lucide-react'
import Button from './Button'

interface TaskCardProps {
    iconBg?: string
    bgColor?: string
    title?: string
    points?: number
    onClick?: () => void
    taskIcon?: React.ReactNode
    isLoading?: boolean
    isCompleted?: boolean
    disabled?: boolean
}

const TaskCard: React.FC<TaskCardProps> = ({ bgColor, taskIcon, disabled, isLoading, iconBg, isCompleted, title, points, onClick }) => {
    return (
        <div className={`${!bgColor ? "bg-[#141414]" : bgColor} rounded-xl w-full gap-2 my-1 p-2 px-4 flex items-center`}>
            <div className={`p-2 ${iconBg} rounded-full text-2xl`}>
                {taskIcon}
            </div>
            <div className='w-full flex items-center gap-2 justify-between'>
                <div className='font-semibold flex flex-col justify-start items-start'>
                    <h1 className='text-sm'>{title}</h1>
                    <p className='flex justify-center items-center gap-1 text-xs'>
                        <CheckpointIcon height={16} width={16} /> +{points} CPs
                    </p>
                </div>
                {
                    !isCompleted ? (
                        isLoading ? (
                            <div className='p-2 px-3'>
                                <Loader className="animate-spin" />
                            </div>
                        ) : (
                            <Button disabled={disabled} onClick={onClick} className={`bg-white text-xs p-1 text-black ${disabled ? "cursor-not-allowed opacity-50" : "opacity-100"}`}>
                                Open
                            </Button>
                        )
                    ) : (
                        <div className='p-2 px-3'>
                            <Check />
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default TaskCard