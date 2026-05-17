import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GameCard } from "@/components/games/game-card";
import { GameCarousel } from "@/components/games/game-carousel";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ru } from "@/lib/i18n/ru";
import type { Game } from "@/types";

interface GameRowProps {
  title: string;
  subtitle?: string;
  games: Game[];
  storeHref?: string;
}

export function GameRow({ title, subtitle, games, storeHref = "/store" }: GameRowProps) {
  if (games.length === 0) return null;

  return (
    <section className="overflow-hidden">
      <SectionHeading
        title={title}
        subtitle={subtitle}
        action={
          <Button asChild variant="ghost" size="sm">
            <Link href={storeHref}>
              {ru.home.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />
      <GameCarousel>
        {games.map((game, i) => (
          <div
            key={game.id}
            className="w-[152px] shrink-0 snap-start sm:w-[168px] md:w-[176px]"
          >
            <GameCard game={game} index={i} variant="compact" />
          </div>
        ))}
      </GameCarousel>
    </section>
  );
}
