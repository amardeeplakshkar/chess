import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { telegramId: userId },
      data: {
        claimedCheckpoints: [],
        lastCheckIn: null,
        lastClaimedDay: "",
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error resetting check-in data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}