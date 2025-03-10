import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { userId, referrerId } = await request.json();

        if (!userId || !referrerId) {
            return NextResponse.json({ error: 'Missing userId or referrerId' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { telegramId: parseInt(userId) }
        });

        if (existingUser?.referredByTelegramId) {
            return NextResponse.json({ error: 'User already has a referrer' }, { status: 400 });
        }

        // Get referrer
        const referrer = await prisma.user.findUnique({
            where: { telegramId: parseInt(referrerId) }
        });

        if (!referrer) {
            return NextResponse.json({ error: 'Referrer not found' }, { status: 404 });
        }

        // Update user with referrer
        const updatedUser = await prisma.user.update({
            where: { telegramId: parseInt(userId) },
            data: { referredByTelegramId: parseInt(referrerId) }
        });

        // Calculate points based on premium status
        const pointsToAdd = existingUser?.isPremium ? 150 : 50;

        // Update referrer's points
        const updatedReferrer = await prisma.user.update({
            where: { telegramId: parseInt(referrerId) },
            data: { points: { increment: pointsToAdd } }
        });

        return NextResponse.json({
            success: true,
            user: updatedUser,
            referrer: updatedReferrer,
            pointsAdded: pointsToAdd
        });
    } catch (error) {
        console.error('Error processing referral:', error);
        return NextResponse.json({ error: 'Failed to process referral' }, { status: 500 });
    }
}