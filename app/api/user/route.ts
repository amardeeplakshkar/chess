import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// Define types for request and response
interface User {
  userId: number;
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

// GET user with completed tasks and referral info
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const telegramId = searchParams.get("telegramId");

    if (!telegramId) {
      return NextResponse.json(
        { error: "Invalid user data: telegramId is missing" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { telegramId: parseInt(telegramId) },
      include: {
        taskCompletions: true,
        referrals: true,
        referredBy: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const completedTaskIds = user.taskCompletions?.map((tc: { taskId: string; }) => tc.taskId) || [];

    return NextResponse.json({
      telegramId: user.telegramId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      points: user.points,
      isPremium: user.isPremium,
      photoUrl: user.photoUrl,
      hasClaimedWelcomePoints: user.hasClaimedWelcomePoints,
      streak: user.streak,
      lastCheckIn: user.lastCheckIn,
      claimedCheckpoints: user.claimedCheckpoints,
      gifts: user.gifts,
      lastClaimedDay: user.lastClaimedDay,
      completedTaskIds,
      referrals: user.referrals,
      referredBy: user.referredBy,
      isNewUser: user.isNewUser,
      walletAddress: user.walletAddress,
      isWalletConnected: user.isWalletConnected,
      dailyPlays: user.dailyPlays,
      lastPlayedDate: user.lastPlayedDate
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST to create or fetch a user
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const userData: Partial<User> = await req.json();

    if (!userData || !userData.userId) {
      return NextResponse.json(
        { error: "Invalid user data: telegramId is missing" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { telegramId: userData.userId },
      include: {
        taskCompletions: true,
        referrals: true,
        referredBy: true,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          telegramId: userData.userId,
          username: userData.username || "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          isPremium: userData.isPremium || false,
          points: 0,
          photoUrl: userData.photoUrl || "",
          hasClaimedWelcomePoints: false,
          streak: 0,
          lastCheckIn: null,
          lastClaimedDay: "",
          claimedCheckpoints: [],
          gifts: [],
          isNewUser: true,
          walletAddress: null,
          isWalletConnected: false,
          dailyPlays: 0,
          lastPlayedDate: null
        },
        include: {
          taskCompletions: true,
          referrals: true,
          referredBy: true,
        },
      });
    }

    const completedTaskIds = user.taskCompletions?.map((tc: { taskId: string; }) => tc.taskId) || [];

    return NextResponse.json({
      telegramId: user.telegramId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      points: user.points,
      photoUrl: user.photoUrl,
      isPremium: user.isPremium,
      hasClaimedWelcomePoints: user.hasClaimedWelcomePoints,
      streak: user.streak,
      lastCheckIn: user.lastCheckIn,
      lastClaimedDay: user.lastClaimedDay,
      claimedCheckpoints: user.claimedCheckpoints,
      gifts: user.gifts,
      completedTaskIds,
      referrals: user.referrals,
      referredBy: user.referredBy,
      isNewUser: user.isNewUser,
      walletAddress: user.walletAddress,
      isWalletConnected: user.isWalletConnected,
      dailyPlays: user.dailyPlays,
      lastPlayedDate: user.lastPlayedDate
    });
  } catch (error) {
    console.error("Error processing user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}