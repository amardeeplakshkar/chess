/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import CheckpointIcon from '@/components/CheckpointIcon';
import CurrentChapter from '@/components/CurrentChapter';
import { useTelegram } from '@/components/providers/TelegramData';
import { useUser } from '@/components/providers/UserProvider';
import TaskCard from '@/components/TaskCard'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CircleFadingPlus, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BsCoin, BsGift, BsTelegram, BsPersonCheck } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";

type Task = {
    id: string;
    title: string;
    taskIcon: React.ReactNode;
    url: string;
    points: number;
    onClick: () => void;
};


const Tasks = () => {
    const { userData, WebApp } = useTelegram()
    const [loadingTask, setLoadingTask] = useState<string | null>(null);
    const router = useRouter()
    const { user, updateUser } = useUser()
    const limitedTasks = [
        {
            id: "IN2a1b3c4d6e7f8a9b0c1d01",
            title: "Invite 5 Friends",
            taskIcon: <BsPeopleFill />,
            iconBg: "bg-sky-500",
            points: 50,
            referCount: 5,
            onClick: () => handleInviteTask("IN2a1b3c4d6e7f8a9b0c1d01", 5, 50)
        },

        {
            id: "IN2a1b3c4d6e7f8a9b0c1d02",
            title: "Invite 10 Friends",
            taskIcon: <BsPeopleFill />,
            points: 100,
            referCount: 10,
            iconBg: "bg-pink-500",
            onClick: () => handleInviteTask("IN2a1b3c4d6e7f8a9b0c1d02", 10, 100)
        },

        {
            id: "IN2a1b3c4d6e7f8a9b0c1d03",
            title: "Invite 20 Friends",
            taskIcon: <BsPeopleFill />,
            points: 200,
            referCount: 20,
            iconBg: "bg-green-500",
            onClick: () => handleInviteTask("IN2a1b3c4d6e7f8a9b0c1d03", 20, 200)
        },

        {
            id: "IN2a1b3c4d6e7f8a9b0c1d04",
            title: "Invite 50 Friends",
            taskIcon: <BsPeopleFill />,
            points: 500,
            referCount: 50,
            iconBg: "bg-yellow-500",
            onClick: () => handleInviteTask("IN2a1b3c4d6e7f8a9b0c1d04", 50, 500)
        },
    ];


    const socialMediaTasks = [
        {
            id: "SM2a1b3c4d6e7f8a9b0c1d06",
            title: "Add 🗺️ to your Name",
            taskIcon: <CheckpointIcon height={24} width={24} />,
            points: 50,
            iconBg: "bg-teal-700",
            onClick: () => handleEmojiTask("SM2a1b3c4d6e7f8a9b0c1d06", 50)
        },
        {
            id: "SM2a1b3c4d6e7f8a9b0c1d01",
            title: "Join Community",
            taskIcon: <MessageCircle />,
            points: 30,
            iconBg: "bg-blue-500",
            url: "https://google.com/share",
            onClick: () => handleFollowChannel("SM2a1b3c4d6e7f8a9b0c1d01", "https://t.me/checkpointfam", 30)
        },
        {
            id: "SM2a1b3c4d6e7f8a9b0c1d02",
            title: "Like a Post",
            taskIcon: <BsHeartFill />,
            points: 10,
            url: "https://google.com/like",
            iconBg: "bg-red-500",
            onClick: () => handleFollowChannel("SM2a1b3c4d6e7f8a9b0c1d02", "https://google.com/like", 10)
        },
        {
            id: "SM2a1b3c4d6e7f8a9b0c1d05",
            title: "Share Story",
            taskIcon: <CircleFadingPlus />,
            points: 50,
            iconBg: "bg-violet-500",
            onClick: () => handleShareStory("SM2a1b3c4d6e7f8a9b0c1d05", 50, "https://res.cloudinary.com/duscymcfc/image/upload/f_auto,q_auto/v1/Checkpoint/checkpoint",
                "Check out this awesome story!",
                { url: `https://t.me/checkpointcryptobot/app?start=${user?.telegramId}`, name: "Visit Now" })
        },
    ];

    const partnerAirdropTasks = [
        {
            name: "Partner Airdrop",
            logo: "https://res.cloudinary.com/duscymcfc/image/upload/f_auto,q_auto/v1/Checkpoint/DropNFT",
            partnerBg: "https://blog.obiex.finance/content/images/size/w720/2024/02/blog-cover45.jpg",
            tasks: [
                {
                    id: "PA2a1b3c4d6e7f8a9b0c1d01",
                    title: "Join Partner Telegram",
                    taskIcon: <BsTelegram />,
                    points: 50,
                    url: "https://t.me/pawsupfam",
                    onClick: () => handleFollowChannel("PA2a1b3c4d6e7f8a9b0c1d01", "https://t.me/pawsupfam", 50)
                },
                {
                    id: "PA2a1b3c4d6e7f8a9b0c1d02",
                    title: "Follow Partner on Twitter",
                    taskIcon: <BsPersonCheck />,
                    points: 30,
                    url: "https://twitter.com/partner",
                    onClick: () => handleFollowChannel("PA2a1b3c4d6e7f8a9b0c1d02", "https://twitter.com/partner", 30)
                }
            ]
        },
        {
            name: "Partner B Airdrop",
            logo: "https://images.squarespace-cdn.com/content/v1/5313d422e4b0aeaef76ef185/6da8296e-c16e-478c-8b4f-598f8e05db98/IAGE+Logo.jpg",
            partnerBg: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*BpBk3olJUw5TiqCF.png",
            tasks: [
                {
                    id: "PB2a1b3c4d6e7f8a9b0c1d03",
                    title: "Claim Partner B Airdrop",
                    taskIcon: <BsGift />,
                    points: 100,
                    iconBg: "bg-[#FFD700]",
                    url: "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet",
                    onClick: () => handleFollowChannel("PB2a1b3c4d6e7f8a9b0c1d03", "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet", 100)
                },
                {
                    id: "PB2a1b3c4d6e7f8a9b0c1d04",
                    title: "Stake Partner B Tokens",
                    taskIcon: <BsCoin />,
                    points: 200,
                    url: "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet",
                    onClick: () => handleFollowChannel("PB2a1b3c4d6e7f8a9b0c1d04", "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet", 200)
                }
            ]
        }
    ];

    const handleFollowChannel = (taskId: string, url: string, points: number) => {
        setLoadingTask(taskId);
        window.open(url, "_blank");
        setTimeout(() => {
            completeTask(taskId, points);
        }, 10000)
    };

    const handleInviteTask = (taskId: string, referCount: number, points: number) => {
        setLoadingTask(taskId);
        if (referCount === 1) {
            router.push("/frens");
            setTimeout(() => {
                completeTask(taskId, points);
            }, 10000)
        } else {
            toast.error(`Invited Atleast ${referCount} users to complete this task.`);
            setLoadingTask(null);
        }
    };

    const handleShareStory = (taskId: string, points: number, mediaUrl: string, text = "", widgetLink?: { url: string; name?: string }) => {
        if (WebApp) {
            const params: Record<string, any> = {};

            if (text) {
                params.text = text;
            }

            if (widgetLink && widgetLink.url) {
                params.widget_link = {
                    url: widgetLink.url,
                    ...(widgetLink.name && { name: widgetLink.name }),
                };
            }

            WebApp.shareToStory(mediaUrl, params);
            setTimeout(() => {
                completeTask(taskId, points);
            }, 10000)
        } else {
            console.error("Telegram WebApp SDK not available.");
        }
    }

    const handleEmojiTask = async (taskId: string, points: number) => {
        setLoadingTask(taskId);
        if (user.firstName.includes("🗺️")) {
            completeTask(taskId, points);
        } else {
            toast.error(`Your name should contain 🗺️ to complete this task.`);
            await navigator.clipboard.writeText("🗺️");
            toast.success("🗺️ Copied to clipboard!");
        }
    }

    const completeTask = async (taskId: string, points: number) => {
        if (!userData) {
            toast.error("Please login to complete the task.");
            setLoadingTask(null);
            return;
        };

        try {
            const response = await fetch("/api/complete-task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userData?.userId, taskId, points }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Task failed.");

            updateUser({
                points,
                completedTaskIds: [taskId],
            });

            toast.success("Task completed successfully!");
            setLoadingTask(null);
        } catch (error) {
            setLoadingTask(null);
            console.error("Task completion error:", error);
            toast.error("Error completing task.");
        }
    };



    return (
        <div className='h-full w-full flex flex-col p-4 gap-2'>
            <CurrentChapter />
            <div className='pb-2'>
                <h3 className='text-white text-2xl font-bold'>
                    Boost CPs
                </h3>
                <p className='text-muted-foreground text-sm'>
                    Complete tasks to earn more CPs
                </p>
            </div>
            <Tabs defaultValue='limited'>
                <TabsList className='bg-[#141414] grid rounded-full w-full grid-cols-2'>
                    <TabsTrigger className='rounded-full' value='limited'>
                        Limited
                    </TabsTrigger>
                    <TabsTrigger className='rounded-full' value='social'>
                        Community
                    </TabsTrigger>
                    <TabsTrigger className='hidden rounded-full' value='partner'>
                        Partners
                    </TabsTrigger>
                </TabsList>
                <TabsContent className='' value='limited'>
                    <ScrollArea className='h-[50dvh] *:my-1'>
                        {limitedTasks.map((task) => (
                            <TaskCard onClick={task.onClick} isLoading={loadingTask === task.id} key={task.id} disabled={loadingTask !== null} iconBg={task.iconBg || "bg-white/10"} title={task.title} isCompleted={user?.completedTaskIds.includes(task.id)} taskIcon={task.taskIcon} points={task.points} />
                        ))}
                    </ScrollArea>
                </TabsContent>
                <TabsContent className='' value='social'>
                    <ScrollArea className='h-[55dvh] *:my-1 '>
                        {socialMediaTasks.map((task) => (
                            <TaskCard isLoading={loadingTask === task.id} key={task.id} disabled={loadingTask !== null} iconBg={task.iconBg || "bg-white/10"} title={task.title} taskIcon={task.taskIcon} isCompleted={user?.completedTaskIds.includes(task.id)} onClick={task.onClick} points={task.points} />
                        ))}
                    </ScrollArea>
                </TabsContent>
                <TabsContent value='partner'>
                    <ScrollArea className='h-[50dvh]'>
                        {partnerAirdropTasks !== null ?
                            partnerAirdropTasks.map((partner, index) => (
                                <div key={index} style={{
                                    backgroundImage: `url(${partner.partnerBg})`,
                                }} className="my-2 *:m-1 p-2 rounded-lg bg-cover bg-center">
                                    <div className='flex pb-2 items-center gap-2'>
                                        <div className='w-10 border border-white h-10 rounded-full bg-cover bg-center' style={{
                                            backgroundImage: `url(${partner.logo})`,
                                        }}>
                                        </div>
                                        <p style={{
                                            textShadow: '0 0 10px black',
                                        }} className='text-white font-semibold'>
                                            {partner.name}
                                        </p>
                                    </div>
                                    {partner.tasks.map((task: Task) => (
                                        <TaskCard isLoading={loadingTask === task.id} key={task.id} disabled={loadingTask !== null} bgColor='bg-black/85' title={task.title} taskIcon={task.taskIcon} onClick={task.onClick} isCompleted={user?.completedTaskIds.includes(task.id)} points={task.points} />
                                    ))}
                                </div>
                            ))
                            : <div className='flex flex-col items-center justify-center h-[50dvh]'>
                                <Image src="https://stickers.fullyst.com/b844adbb-1c43-50a5-8a2d-7b9574ba0dbd/full/AgAD9wADVp29Cg.webp" unoptimized width={150} height={150} alt="" />
                                Daily Goals? Crushed. 💪
                            </div>
                        }
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Tasks