import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { telegramId, points } = await request.json();

    if (!telegramId) {
      return NextResponse.json({ error: "Telegram ID is required." }, { status: 400 });
    }

    const telegramIdInt = parseInt(telegramId, 10);

    if (isNaN(telegramIdInt)) {
      return NextResponse.json({ error: "Invalid Telegram ID." }, { status: 400 });
    }   

    const user = await prisma.user.findUnique({
      where: { telegramId: telegramIdInt },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (user.hasClaimedWelcomePoints) {
      return NextResponse.json(
        { error: "You have already claimed your welcome points." },
        { status: 403 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { telegramId: telegramIdInt },
      data: {
        points: { increment: points },
        hasClaimedWelcomePoints: true,
        isNewUser: false,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error claiming points:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}