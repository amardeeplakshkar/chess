import Button from '@/components/Button';
import CheckpointIcon from '@/components/CheckpointIcon'
import TaskCard from '@/components/TaskCard'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { limitedTasks, partnerAirdropTasks, socialMediaTasks } from '@/constants'
import React from 'react'

type Task = {
    id: string;
    title: string;
    taskIcon: React.ReactNode;
    points: number;
    partnerBg: string;
};


const Tasks = () => {
    const groupedTasks: Record<string, Task[]> = partnerAirdropTasks.reduce((acc, task) => {
        if (!acc[task.partnerBg]) {
            acc[task.partnerBg] = [];
        }
        acc[task.partnerBg].push(task);
        return acc;
    }, {} as Record<string, Task[]>);
    return (
        <div className='h-full w-full flex flex-col p-4 gap-2'>
            <div className='flex w-full justify-between py-2 items-center'>
                <Button>
                    <CheckpointIcon height={20} width={20} />
                    805
                </Button>
                <div>
                    <div className='text-white text-2xl uppercase font-bold'>Chapter 1</div>
                </div>
            </div>
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
                        {limitedTasks.map((task, index) => (
                            <TaskCard key={index} iconBg='bg-white/10' title={task.title} taskIcon={task.taskIcon} points={task.points} />
                        ))}
                    </ScrollArea>
                </TabsContent>
                <TabsContent className='' value='social'>
                    <ScrollArea className='h-[50dvh] *:my-1 '>
                    {socialMediaTasks.map((task, index) => (
                        <TaskCard key={index} iconBg='bg-white/10' title={task.title} taskIcon={task.taskIcon} points={task.points} />
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
                                <TaskCard key={task.id} bgColor='bg-black/85' iconBg="bg-white/10" title={task.title} taskIcon={task.taskIcon} points={task.points} />
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