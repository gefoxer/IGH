"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GameRating } from "@/components/games/game-rating";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { ru } from "@/lib/i18n/ru";
import type { Game } from "@/types";

interface FeaturedGameBannerProps {
  game: Game;
  badge?: string;
  compact?: boolean;
}

export function FeaturedGameBanner({
  game,
  badge = ru.game.featured,
  compact = false,
}: FeaturedGameBannerProps) {
  const discount = game.onSale ? getDiscountPercent(game.price, game.originalPrice) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <Link
        href={`/store/${game.id}`}
        className="group relative flex overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors hover:border-accent/40"
      >
        <div
          className={`relative shrink-0 overflow-hidden ${compact ? "h-48 w-full sm:h-auto sm:w-72" : "h-56 w-full sm:h-64 sm:w-96"}`}
        >
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 384px"
          />
          {discount && (
            <span className="absolute left-3 top-3 rounded-md bg-accent px-2 py-1 text-xs font-bold text-white">
              −{discount}%
            </span>
          )}
        </div>
        <div
          className={`relative flex flex-1 flex-col justify-center bg-gradient-to-r from-card to-card/80 p-6 sm:p-8 ${!compact ? "min-h-56 sm:min-h-64" : ""}`}
        >
          <Badge className="mb-3 w-fit">{badge}</Badge>
          <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-accent sm:text-3xl">
            {game.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{game.developer}</p>
          <p className="mt-3 line-clamp-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            {game.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <GameRating rating={game.rating} />
            <Badge variant="secondary">{game.genre}</Badge>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{formatPrice(game.price)}</span>
              {game.originalPrice && game.originalPrice > game.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(game.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <Button variant="secondary" size="sm" className="mt-5 w-fit pointer-events-none">
            {ru.game.viewGame}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}