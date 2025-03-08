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
  taskCompletions?: { taskId: string }[];
}

// GET user with completed tasks
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
      include: { taskCompletions: true },
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
      completedTaskIds,
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
      include: { taskCompletions: true },
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
          claimedCheckpoints: [],
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
      claimedCheckpoints: user.claimedCheckpoints,
      completedTaskIds,
    });
  } catch (error) {
    console.error("Error processing user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}