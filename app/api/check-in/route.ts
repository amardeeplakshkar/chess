import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { userId, checkpointId, points, day, bgImage  } = await req.json();

        const numericUserId = Number(userId);
        if (isNaN(numericUserId)) {
            return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { telegramId: numericUserId } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.claimedCheckpoints.includes(checkpointId)) {
            return NextResponse.json({ error: 'Already checked in' }, { status: 400 });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // If user has never checked in before, they must start with Day 01
        if (!user.lastCheckIn) {
            if (day !== "Day 01") {
                return NextResponse.json({ error: 'Must start with Day 01' }, { status: 400 });
            }

            const updatedUser = await prisma.user.update({
                where: { telegramId: numericUserId },
                data: {
                    points: { increment: points },
                    claimedCheckpoints: { push: checkpointId },
                    gifts: { push: bgImage ? bgImage : [] },
                    streak: 1,
                    lastCheckIn: today,
                    lastClaimedDay: day
                },
            });

            return NextResponse.json({ 
                points: updatedUser.points, 
                streak: updatedUser.streak,
                lastClaimedDay: updatedUser.lastClaimedDay 
            });
        }

        // For existing users, check the time difference
        const lastCheckIn = new Date(user.lastCheckIn);
        lastCheckIn.setHours(0, 0, 0, 0);
        
        const daysDifference = Math.floor((today.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24));

        // If trying to claim on the same day
        if (daysDifference === 0) {
            return NextResponse.json({ error: 'Already claimed today' }, { status: 400 });
        }

        // If streak is broken (more than 1 day has passed)
        if (daysDifference > 1) {
            if (day !== "Day 01") {
                return NextResponse.json({ error: 'Streak broken. Must start from Day 01' }, { status: 400 });
            }

            // Reset streak and start over
            const updatedUser = await prisma.user.update({
                where: { telegramId: numericUserId },
                data: {
                    points: { increment: points },
                    claimedCheckpoints: [checkpointId], // Reset claimed checkpoints array
                    streak: 1,
                    gifts: bgImage ? [bgImage] : [], // Reset gifts array
                    lastCheckIn: today,
                    lastClaimedDay: "Day 01"
                },
            });

            return NextResponse.json({ 
                points: updatedUser.points, 
                streak: updatedUser.streak,
                lastClaimedDay: updatedUser.lastClaimedDay 
            });
        }

        // For consecutive days, verify correct day is being claimed
        const currentDayNumber = parseInt(user.lastClaimedDay.split(" ")[1]);
        const nextDayNumber = currentDayNumber + 1;
        const expectedNextDay = `Day ${String(nextDayNumber).padStart(2, '0')}`;

        if (day !== expectedNextDay) {
            return NextResponse.json({ 
                error: `Must claim ${expectedNextDay} next` 
            }, { status: 400 });
        }

        // Update user with new streak and checkpoint
        const updatedUser = await prisma.user.update({
            where: { telegramId: numericUserId },
            data: {
                points: { increment: points },
                claimedCheckpoints: { push: checkpointId },
                gifts: { push: bgImage ? bgImage : [] },
                streak: { increment: 1 },
                lastCheckIn: today,
                lastClaimedDay: day
            },
        });

        return NextResponse.json({ 
            points: updatedUser.points, 
            streak: updatedUser.streak,
            lastClaimedDay: updatedUser.lastClaimedDay 
        });

    } catch (error) {
        console.error('Check-in error:', error);
        return NextResponse.json({ error: `Something went wrong: ${error}` }, { status: 500 });
    }
}