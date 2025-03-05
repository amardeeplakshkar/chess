import { prisma } from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { userId, referrerId } = await request.json();

    if (!userId || !referrerId) {
        return NextResponse.json({ error: 'Missing userId or referrerId' }, { status: 400 });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { telegramId: parseInt(userId) },
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists. No points awarded.' });
        }

        const referrer = await prisma.user.findUnique({
            where: { telegramId: parseInt(referrerId) },
        });

        if (!referrer) {
            return NextResponse.json({ error: 'Referrer not found' }, { status: 404 });
        }

        const newUser = await prisma.user.create({
            data: {
                telegramId: parseInt(userId),
                referredByTelegramId: referrer.telegramId,
                isNewUser: false
            },
        });

        await prisma.user.update({
            where: { telegramId: referrer.telegramId },
            data: { points: { increment: 500 } },
        });

        return NextResponse.json({ success: true, newUser, referrerPoints: referrer.points + 500 });
    } catch (error) {
        console.error('Error saving referral:', error);
        return NextResponse.json({ error: 'Failed to save referral' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { telegramId: parseInt(userId) },
            include: {
                referrals: true,
                referredBy: true
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const response = {
            referrer: user.referredBy ? {
                telegramId: user.referredBy.telegramId,
                username: user.referredBy.username,
                firstName: user.referredBy.firstName,
                lastName: user.referredBy.lastName
            } : null,
            referrals: user.referrals.map((ref: { telegramId: number; username: string; firstName: string; lastName: string; }) => ({
                telegramId: ref.telegramId,
                username: ref.username,
                firstName: ref.firstName,
                lastName: ref.lastName
            }))
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching referrals:', error);
        return NextResponse.json({ error: 'Failed to fetch referrals' }, { status: 500 });
    }
}