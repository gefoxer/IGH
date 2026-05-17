"use client";

import { PurchaseButton } from "@/components/games/purchase-button";
import type { Game } from "@/types";

export function GameDetailPurchase({ game }: { game: Game }) {
  return (
    <PurchaseButton game={game} size="lg" className="w-full" redirectToLibrary />
  );
}
