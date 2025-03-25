/* eslint-disable @typescript-eslint/no-unused-vars */
import CheckpointIcon from "@/components/CheckpointIcon";
import CurrentChapter from "@/components/CurrentChapter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

const getData = async () => {
    noStore();
    return await prisma.user.findMany({
        orderBy: { points: "desc" },
        take: 20,
    });
};

interface User {
    telegramId: number;
    username: string;
    firstName: string;
    lastName: string;
    points: number;
    photoUrl: string;
    hasClaimedWelcomePoints: boolean;
    isPremium: boolean;
    streak: number;
    lastCheckIn?: Date;
    claimedCheckpoints: string[];
    gifts: string[];
    taskCompletions?: { taskId: string }[];
    lastClaimedDay: string;
    referrals?: User[];
    referredBy?: User | null;
    isNewUser: boolean;
    walletAddress?: string;
    isWalletConnected: boolean;
    dailyPlays: number;
    lastPlayedDate?: Date;
}

export default async function DataPage() {
    const data = await getData();
    const getBackgroundClass = (medalEmoji: string | null) => {
        switch (medalEmoji) {
            case "🥇":
                return "bg-yellow-500/15";
            case "🥈":
                return "bg-gray-500/15";
            case "🥉":
                return "bg-red-500/15";
            default:
                return "bg-white/5";
        }
    };
    return (
        <div className='h-full w-full flex flex-col p-4'>
            <CurrentChapter />
            <div className="w-full flex justify-center items-center">
                <Avatar className='w-[8rem] h-[8rem] rounded-none'>
                    <AvatarImage src="https://res.cloudinary.com/duscymcfc/image/upload/v1/perks/assets/DuckLeaderboard" />
                </Avatar>
            </div>
            <ScrollArea className="h-[30rem] w-full rounded-md my-4">
                {data.map((item: User) => {
                    const position = data.indexOf(item) + 1;
                    const isMedal = position <= 3;
                    const medalEmoji = isMedal
                        ? position === 1
                            ? '🥇'
                            : position === 2
                                ? '🥈'
                                : '🥉'
                        : null;

                    const backgroundClass = getBackgroundClass(medalEmoji);

                    return (
                        <div key={item.telegramId} className={`p-4 flex items-center justify-between ${backgroundClass} my-2 rounded-lg`}>
                            <div className="flex items-center gap-4">
                                <div className="">
                                    <Avatar className='rounded-xl'>
                                        <AvatarImage src={item?.photoUrl} />
                                        <AvatarFallback className='border-foreground bg-white rounded-xl'>
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <h3 className="text-base line-clamp-1 font-semibold">{item.firstName || item.username}</h3>
                                    <p className="flex items-center gap-1 text-muted-foreground text-xs">
                                        <CheckpointIcon height={16} width={16} /> {item.points.toLocaleString()} CPs
                                    </p>
                                </div>
                            </div>
                            <div className="text-right pr-2">

                                {medalEmoji || `#${position}`}
                            </div>
                        </div>
                    )
                })}
            </ScrollArea>


        </div>
    );
}
