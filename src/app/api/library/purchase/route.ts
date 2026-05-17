import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/api-auth";
import { toUserProfile } from "@/lib/user-data";
import { getGameById } from "@/data/games";

export async function POST(request: Request) {
  const authResult = await requireSession();
  if ("error" in authResult) return authResult.error;

  try {
    const body = await request.json();
    const gameId = body.gameId?.toString();

    if (!gameId) {
      return NextResponse.json({ error: "invalid_game" }, { status: 400 });
    }

    const game = getGameById(gameId);
    if (!game) {
      return NextResponse.json({ error: "game_not_found" }, { status: 404 });
    }

    const existing = await prisma.libraryGame.findUnique({
      where: {
        userId_gameId: { userId: authResult.userId, gameId },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "already_owned" }, { status: 409 });
    }

    const user = await prisma.user.findUnique({
      where: { id: authResult.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    if (user.balance < game.price) {
      return NextResponse.json({ error: "insufficient_funds" }, { status: 402 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: authResult.userId },
        data: { balance: { decrement: game.price } },
      });

      await tx.libraryGame.create({
        data: {
          userId: authResult.userId,
          gameId,
        },
      });

      return tx.user.findUnique({
        where: { id: authResult.userId },
        include: { library: true },
      });
    });

    if (!updated) {
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }

    return NextResponse.json(toUserProfile(updated, updated.library));
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
