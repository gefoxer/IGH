import type { LibraryEntry } from "@/types";
import type { LibraryGame, User } from "@prisma/client";

export type UserProfile = {
  id: string;
  email: string;
  username: string;
  avatar: string;
  balance: number;
  library: Record<string, LibraryEntry>;
};

export function libraryToRecord(games: LibraryGame[]): Record<string, LibraryEntry> {
  return games.reduce<Record<string, LibraryEntry>>((acc, item) => {
    acc[item.gameId] = {
      gameId: item.gameId,
      purchasedAt: item.purchasedAt.toISOString(),
      hoursPlayed: item.hoursPlayed,
      installed: item.installed,
    };
    return acc;
  }, {});
}

export function toUserProfile(user: User, library: LibraryGame[]): UserProfile {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatar:
      user.avatar ??
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`,
    balance: user.balance,
    library: libraryToRecord(library),
  };
}
