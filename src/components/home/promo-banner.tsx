"use client";

import { getOnSale } from "@/data/games";
import { FeaturedGameBanner } from "@/components/games/featured-game-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { ru } from "@/lib/i18n/ru";

export function SaleGamesSection() {
  const saleGames = getOnSale();
  const mainDeal = saleGames[0];

  if (!mainDeal) return null;

  return (
    <section>
      <SectionHeading title={ru.home.onSale} subtitle={ru.home.onSaleSub} />
      <FeaturedGameBanner game={mainDeal} badge={ru.game.onSale} />
      {saleGames.length > 1 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          +{saleGames.length - 1} {ru.home.moreOnSale}
        </p>
      )}
    </section>
  );
}
