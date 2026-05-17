"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LibraryGameCard } from "@/components/library/library-game-card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-provider";
import { games } from "@/data/games";
import { ru } from "@/lib/i18n/ru";
import type { LibraryFilter, LibrarySort } from "@/types";

export function LibraryContent() {
  const { status } = useSession();
  const { profile, loading, library } = useUser();
  const [sort, setSort] = useState<LibrarySort>("recent");
  const [filter, setFilter] = useState<LibraryFilter>("all");

  const ownedGames = useMemo(() => {
    const entries = Object.values(library);
    let items = entries
      .map((entry) => {
        const game = games.find((g) => g.id === entry.gameId);
        return game ? { game, entry } : null;
      })
      .filter(Boolean) as { game: (typeof games)[0]; entry: (typeof entries)[0] }[];

    if (filter === "installed") items = items.filter((i) => i.entry.installed);
    if (filter === "not-installed") items = items.filter((i) => !i.entry.installed);

    items.sort((a, b) => {
      switch (sort) {
        case "title":
          return a.game.title.localeCompare(b.game.title, "ru");
        case "hours":
          return b.entry.hoursPlayed - a.entry.hoursPlayed;
        default:
          return (
            new Date(b.entry.purchasedAt).getTime() -
            new Date(a.entry.purchasedAt).getTime()
          );
      }
    });

    return items;
  }, [library, sort, filter]);

  if (status === "loading" || loading) {
    return <p className="text-muted-foreground">{ru.library.loading}</p>;
  }

  if (!profile) {
    return (
      <div className="rounded-xl border border-white/5 bg-card p-12 text-center">
        <p className="text-muted-foreground">{ru.library.loginRequired}</p>
        <Button asChild className="mt-4">
          <Link href="/profile">{ru.library.goProfile}</Link>
        </Button>
      </div>
    );
  }

  if (ownedGames.length === 0) {
    return (
      <div className="rounded-xl border border-white/5 bg-card p-12 text-center">
        <p className="text-muted-foreground">{ru.library.empty}</p>
        <Button asChild className="mt-4">
          <Link href="/store">{ru.library.browseStore}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as LibraryFilter)}
          className="h-10 rounded-lg border border-white/10 bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="all">{ru.library.filterAll}</option>
          <option value="installed">{ru.library.filterInstalled}</option>
          <option value="not-installed">{ru.library.filterNotInstalled}</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as LibrarySort)}
          className="h-10 rounded-lg border border-white/10 bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="recent">{ru.library.sortRecent}</option>
          <option value="title">{ru.library.sortTitle}</option>
          <option value="hours">{ru.library.sortHours}</option>
        </select>
      </div>
      <div className="space-y-4">
        {ownedGames.map(({ game, entry }) => (
          <LibraryGameCard key={game.id} game={game} entry={entry} />
        ))}
      </div>
    </div>
  );
}
