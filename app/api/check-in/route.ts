import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { userId, checkpointId, points } = await req.json();

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

        let streak = user.claimedCheckpoints.length;
        let lastCheckInDate: Date | null = null;

        if (streak > 0) {
            lastCheckInDate = new Date(user.lastCheckIn || 0);
            lastCheckInDate.setHours(0, 0, 0, 0);
        }

        if (lastCheckInDate) {
            const difference = (today.getTime() - lastCheckInDate.getTime()) / (1000 * 60 * 60 * 24);
            
            if (difference === 1) {
                streak += 1; // Continue streak
            } else if (difference > 1) {
                streak = 1; // Reset streak
            }
        } else {
            streak = 1;
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId: numericUserId },
            data: {
                points: { increment: points },
                claimedCheckpoints: { push: checkpointId },
                streak,
                lastCheckIn: today,
            },
        });

        return NextResponse.json({ points: updatedUser.points, streak: updatedUser.streak });
    } catch (error) {
        return NextResponse.json({ error: `Something went wrong: ${error}` }, { status: 500 });
    }
}
