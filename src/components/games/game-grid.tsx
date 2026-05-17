import { GameCard } from "@/components/games/game-card";
import type { Game } from "@/types";

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {games.map((game, i) => (
        <GameCard key={game.id} game={game} index={i} />
      ))}
    </div>
  );
}
