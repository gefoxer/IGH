import { GameGrid } from "@/components/games/game-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  games,
  getFreeGames,
  getGenres,
  getGamesByGenre,
  getNewReleases,
  getOnSale,
  getTopRated,
} from "@/data/games";
import { ru } from "@/lib/i18n/ru";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ru.discover.title,
  description: ru.metadata.discover,
};

export default function DiscoverPage() {
  const genres = getGenres();

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={ru.discover.title} subtitle={ru.discover.subtitle} />

      <section>
        <SectionHeading
          title={ru.discover.allGames}
          subtitle={`${games.length} ${ru.discover.gamesCount}`}
        />
        <GameGrid games={games} />
      </section>

      <section>
        <SectionHeading title={ru.discover.newReleases} subtitle={ru.discover.newReleasesSub} />
        <GameGrid games={getNewReleases(12)} />
      </section>

      <section>
        <SectionHeading title={ru.discover.onSale} subtitle={ru.discover.onSaleSub} />
        <GameGrid games={getOnSale()} />
      </section>

      <section>
        <SectionHeading title={ru.discover.topRated} subtitle={ru.discover.topRatedSub} />
        <GameGrid games={getTopRated(12)} />
      </section>

      {getFreeGames().length > 0 && (
        <section>
          <SectionHeading title={ru.discover.freeGames} subtitle={ru.discover.freeSub} />
          <GameGrid games={getFreeGames()} />
        </section>
      )}

      {genres.map((genre) => {
        const genreGames = getGamesByGenre(genre);
        if (genreGames.length === 0) return null;
        return (
          <section key={genre}>
            <SectionHeading
              title={genre}
              subtitle={`${genreGames.length} ${ru.discover.games}`}
            />
            <GameGrid games={genreGames} />
          </section>
        );
      })}
    </div>
  );
}
