'use client'

import CurrentChapter from '@/components/CurrentChapter';
import { useTelegram } from '@/components/providers/TelegramData';
import TaskCard from '@/components/TaskCard'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BsCoin, BsGift, BsTelegram, BsPersonCheck } from "react-icons/bs";
import { BsShare, BsHeartFill, BsChatDotsFill, BsGlobe } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";

type Task = {
    id: string;
    title: string;
    taskIcon: React.ReactNode;
    points: number;
    partnerBg: string;
    onClick?: () => void
};




const Tasks = () => {
    const { userData } = useTelegram()
    const [loadingTask, setLoadingTask] = useState<string | null>(null);
    const router = useRouter()
    const limitedTasks = [
        {
            id: "IN2a1b3c4d6e7f8a9b0c1d01",
            title: "Invite 5 Friends",
            taskIcon: <BsPeopleFill />,
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
            onClick: () => handleInviteTask("IN2a1b3c4d6e7f8a9b0c1d02", 10, 100)
        },

        {
            id: "IN2a1b3c4d6e7f8a9b0c1d03",
            title: "Invite 20 Friends",
            taskIcon: <BsPeopleFill />,
            points: 200,
            referCount: 20,
            onClick: () => handleInviteTask("IN2a1b3c4d6e7f8a9b0c1d03", 20, 200)
        },

        {
            id: "IN2a1b3c4d6e7f8a9b0c1d04",
            title: "Invite 50 Friends",
            taskIcon: <BsPeopleFill />,
            points: 500,
            referCount: 50,
            onClick: () => handleInviteTask("IN2a1b3c4d6e7f8a9b0c1d04", 50, 500)
        },
    ];


    const socialMediaTasks = [
        {
            id: "SM2a1b3c4d6e7f8a9b0c1d01",
            title: "Share on Social Media",
            taskIcon: <BsShare />,
            points: 30,
            url: "https://google.com/share",
            onClick: () => handleFollowChannel("SM2a1b3c4d6e7f8a9b0c1d01", "https://google.com/share", 30)
        },

        {
            id: "SM2a1b3c4d6e7f8a9b0c1d02",
            title: "Like a Post",
            taskIcon: <BsHeartFill />,
            points: 10,
            url: "https://google.com/like",
            onClick: () => handleFollowChannel("SM2a1b3c4d6e7f8a9b0c1d02", "https://google.com/like", 10)
        },

        {
            id: "SM2a1b3c4d6e7f8a9b0c1d03",
            title: "Comment on a Post",
            taskIcon: <BsChatDotsFill />,
            points: 20,
            url: "https://google.com/comment",
            onClick: () => handleFollowChannel("SM2a1b3c4d6e7f8a9b0c1d03", "https://google.com/comment", 20)
        },

        {
            id: "SM2a1b3c4d6e7f8a9b0c1d04",
            title: "Visit Website",
            taskIcon: <BsGlobe />,
            points: 40,
            url: "https://google.com/visit",
            onClick: () => handleFollowChannel("SM2a1b3c4d6e7f8a9b0c1d04", "https://google.com/visit", 40)
        },
    ];

    const partnerAirdropTasks = [
        {
            id: "PA2a1b3c4d6e7f8a9b0c1d01",
            title: "Join Partner Telegram",
            taskIcon: <BsTelegram />,
            points: 50,
            url: "https://t.me/pawsupfam",
            partnerBg: "https://blog.obiex.finance/content/images/size/w720/2024/02/blog-cover45.jpg",
            onClick: () => handleFollowChannel("PA2a1b3c4d6e7f8a9b0c1d01", "https://t.me/pawsupfam", 50)
        },

        {
            id: "PA2a1b3c4d6e7f8a9b0c1d02",
            title: "Follow Partner on Twitter",
            taskIcon: <BsPersonCheck />,
            points: 30,
            url: "https://twitter.com/partner",
            partnerBg: "https://blog.obiex.finance/content/images/size/w720/2024/02/blog-cover45.jpg",
            onClick: () => handleFollowChannel("PA2a1b3c4d6e7f8a9b0c1d02", "https://twitter.com/partner", 30)
        },

        {
            id: "PA2a1b3c4d6e7f8a9b0c1d03",
            title: "Claim Partner Airdrop",
            taskIcon: <BsGift />,
            points: 100,
            url: "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet",
            partnerBg: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*BpBk3olJUw5TiqCF.png",
            onClick: () => handleFollowChannel("PA2a1b3c4d6e7f8a9b0c1d03", "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet", 100)
        },

        {
            id: "PA2a1b3c4d6e7f8a9b0c1d04",
            title: "Stake Partner Tokens",
            taskIcon: <BsCoin />,
            points: 200,
            url: "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet",
            partnerBg: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*BpBk3olJUw5TiqCF.png",
            onClick: () => handleFollowChannel("PA2a1b3c4d6e7f8a9b0c1d04", "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet", 200)
        },
    ];

    const groupedTasks: Record<string, Task[]> = partnerAirdropTasks.reduce((acc, task) => {
        if (!acc[task.partnerBg]) {
            acc[task.partnerBg] = [];
        }
        acc[task.partnerBg].push(task);
        return acc;
    }, {} as Record<string, Task[]>);

    const handleFollowChannel = (taskId: string, url: string, points: number) => {
        setLoadingTask(taskId);
        window.open(url, "_blank");
        setTimeout(() => {
            completeTask(taskId, points);
        }, 10000)
    };

    const handleInviteTask = (taskId: string,referCount: number, points: number) => {
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
                body: JSON.stringify({ userId: userData?.id, taskId, points }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Task failed.");

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
                <TabsList className='bg-[#141414] grid rounded-full w-full grid-cols-3'>
                    <TabsTrigger className='rounded-full' value='limited'>
                        Limited
                    </TabsTrigger>
                    <TabsTrigger className='rounded-full' value='social'>
                        Community
                    </TabsTrigger>
                    <TabsTrigger className='rounded-full' value='partner'>
                        Partners
                    </TabsTrigger>
                </TabsList>
                <TabsContent className='' value='limited'>
                    <ScrollArea className='h-[50dvh] *:my-1'>
                        {limitedTasks.map((task) => (
                            <TaskCard onClick={task.onClick} isLoading={loadingTask === task.id} key={task.id} disabled={loadingTask !== null} iconBg="bg-white/10" title={task.title} taskIcon={task.taskIcon} points={task.points} />
                        ))}
                    </ScrollArea>
                </TabsContent>
                <TabsContent className='' value='social'>
                    <ScrollArea className='h-[50dvh] *:my-1 '>
                        {socialMediaTasks.map((task) => (
                            <TaskCard isLoading={loadingTask === task.id} key={task.id} disabled={loadingTask !== null} iconBg="bg-white/10" title={task.title} taskIcon={task.taskIcon} onClick={task.onClick} points={task.points} />
                        ))}
                    </ScrollArea>
                </TabsContent>
                <TabsContent value='partner'>
                    <ScrollArea className='h-[50dvh]'>
                        {Object.entries(groupedTasks).map(([partnerBg, tasks], index) => (
                            <div key={index} style={{
                                backgroundImage: `url(${partnerBg})`,
                            }} className="my-2 pt-10 *:m-1 p-2 rounded-lg bg-cover bg-center">
                                {tasks.map((task) => (
                                    <TaskCard isLoading={loadingTask === task.id} key={task.id} disabled={loadingTask !== null} bgColor='bg-black/85' iconBg="bg-white/10" title={task.title} taskIcon={task.taskIcon} onClick={task.onClick} points={task.points} />
                                ))}
                            </div>
                        ))}
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Tasks