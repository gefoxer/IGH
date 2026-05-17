import { Hero } from "@/components/home/hero";
import { SaleGamesSection } from "@/components/home/promo-banner";
import { GameGrid } from "@/components/games/game-grid";
import { GameRow } from "@/components/games/game-row";
import { FeaturedGameBanner } from "@/components/games/featured-game-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  getFeaturedGames,
  getFreeGames,
  getNewReleases,
  getOnSale,
  getTopRated,
} from "@/data/games";
import { ru } from "@/lib/i18n/ru";

export default function HomePage() {
  const featured = getFeaturedGames();
  const newReleases = getNewReleases(8);
  const topRated = getTopRated(8);
  const onSale = getOnSale();
  const freeGames = getFreeGames();
  const spotlightSecondary = featured[1];

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:space-y-20 lg:px-8">
        <section>
          <SectionHeading title={ru.home.featured} subtitle={ru.home.featuredSub} />
          <GameGrid games={featured} />
        </section>

        {spotlightSecondary && (
          <section>
            <SectionHeading
              title={ru.home.editorsChoice}
              subtitle={ru.home.editorsChoiceSub}
            />
            <FeaturedGameBanner game={spotlightSecondary} badge={ru.game.editorsChoice} />
          </section>
        )}

        <SaleGamesSection />

        <GameRow
          title={ru.home.newReleases}
          subtitle={ru.home.newReleasesSub}
          games={newReleases}
        />

        <GameRow
          title={ru.home.topRated}
          subtitle={ru.home.topRatedSub}
          games={topRated}
        />

        {onSale.length > 1 && (
          <section>
            <SectionHeading title={ru.home.moreDeals} subtitle={ru.home.moreDealsSub} />
            <GameGrid games={onSale.slice(1)} />
          </section>
        )}

        {freeGames.length > 0 && (
          <GameRow title={ru.home.free} subtitle={ru.home.freeSub} games={freeGames} />
        )}
      </div>
    </>
  );
}
