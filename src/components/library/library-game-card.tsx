"use client";

import Image from "next/image";
import { Download, Play, Trash2, HardDrive } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/user-provider";
import { formatPlaytime } from "@/lib/utils";
import { ru } from "@/lib/i18n/ru";
import type { Game, LibraryEntry } from "@/types";

interface LibraryGameCardProps {
  game: Game;
  entry: LibraryEntry;
}

export function LibraryGameCard({ game, entry }: LibraryGameCardProps) {
  const { installGame, uninstallGame, playGame } = useUser();

  const handleInstall = async () => {
    await installGame(game.id);
    toast.success(`${game.title} ${ru.library.installedToast}`);
  };

  const handleUninstall = async () => {
    await uninstallGame(game.id);
    toast.info(`${game.title} ${ru.library.uninstalledToast}`);
  };

  const handlePlay = async () => {
    if (!entry.installed) {
      toast.error(ru.library.installFirst);
      return;
    }
    await playGame(game.id);
    toast.success(`${ru.library.playingToast}: ${game.title}`, {
      description: `+${formatPlaytime(0.5)} ${ru.library.sessionAdded}`,
    });
  };

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-white/5 bg-card p-4 sm:flex-row sm:items-center">
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-20">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-semibold">{game.title}</h3>
        <p className="text-sm text-muted-foreground">{game.genre}</p>
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          <span className="text-muted-foreground">
            {ru.library.playtime}:{" "}
            <strong className="text-foreground">{formatPlaytime(entry.hoursPlayed)}</strong>
          </span>
          <Badge variant={entry.installed ? "default" : "secondary"}>
            {entry.installed ? (
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3" /> {ru.library.installed}
              </span>
            ) : (
              ru.library.notInstalled
            )}
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
        {!entry.installed ? (
          <Button size="sm" onClick={handleInstall}>
            <Download className="h-4 w-4" />
            {ru.library.install}
          </Button>
        ) : (
          <>
            <Button size="sm" onClick={handlePlay}>
              <Play className="h-4 w-4" />
              {ru.library.play}
            </Button>
            <Button size="sm" variant="destructive" onClick={handleUninstall}>
              <Trash2 className="h-4 w-4" />
              {ru.library.uninstall}
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
