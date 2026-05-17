import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/api-auth";
import { toUserProfile } from "@/lib/user-data";

type RouteContext = { params: Promise<{ gameId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const authResult = await requireSession();
  if ("error" in authResult) return authResult.error;

  const { gameId } = await context.params;

  try {
    const body = await request.json();
    const action = body.action as "install" | "uninstall" | "play";

    const entry = await prisma.libraryGame.findUnique({
      where: {
        userId_gameId: { userId: authResult.userId, gameId },
      },
    });

    if (!entry) {
      return NextResponse.json({ error: "not_owned" }, { status: 404 });
    }

    if (action === "play" && !entry.installed) {
      return NextResponse.json({ error: "not_installed" }, { status: 400 });
    }

    const hoursDelta = action === "play" ? 0.5 + Math.random() * 1.5 : 0;

    await prisma.libraryGame.update({
      where: { id: entry.id },
      data: {
        installed: action === "install" ? true : action === "uninstall" ? false : entry.installed,
        hoursPlayed:
          action === "play" ? { increment: hoursDelta } : entry.hoursPlayed,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: authResult.userId },
      include: { library: true },
    });

    if (!user) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    return NextResponse.json(toUserProfile(user, user.library));
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
