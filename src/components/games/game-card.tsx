"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { GameRating } from "@/components/games/game-rating";
import { PurchaseButton } from "@/components/games/purchase-button";
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils";
import { ru } from "@/lib/i18n/ru";
import type { Game } from "@/types";

interface GameCardProps {
  game: Game;
  index?: number;
  variant?: "default" | "compact";
}

export function GameCard({ game, index = 0, variant = "default" }: GameCardProps) {
  const discount = game.onSale ? getDiscountPercent(game.price, game.originalPrice) : null;
  const isCompact = variant === "compact";

  return (
    <motion.article
      initial={{ opacity: 0, y: isCompact ? 8 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/5 bg-card",
        isCompact
          ? "carousel-card shadow-md shadow-black/20"
          : "card-hover"
      )}
    >
      <Link
        href={`/store/${game.id}`}
        className={cn(
          "relative block shrink-0 overflow-hidden",
          isCompact ? "aspect-[3/4] w-full" : "aspect-[3/4] w-full"
        )}
      >
        <Image
          src={game.coverImage}
          alt={`${game.title} — обложка`}
          fill
          sizes={isCompact ? "180px" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <div className="absolute left-1.5 top-1.5 flex max-w-[calc(100%-0.75rem)] flex-wrap gap-1">
          {game.isNew && (
            <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none text-white">
              {ru.badges.new}
            </span>
          )}
          {discount && (
            <span className="rounded bg-accent px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">
              −{discount}%
            </span>
          )}
          {game.price === 0 && (
            <span className="rounded bg-sky-600 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none text-white">
              {ru.badges.free}
            </span>
          )}
        </div>
        {!isCompact && (
          <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-1">
            <Badge variant="secondary" className="max-w-[58%] truncate px-1.5 py-0 text-[10px] backdrop-blur-sm">
              {game.genre}
            </Badge>
            <GameRating rating={game.rating} />
          </div>
        )}
      </Link>

      <div className={cn("flex min-h-0 flex-1 flex-col", isCompact ? "gap-1.5 p-2.5" : "gap-2 p-4")}>
        <Link href={`/store/${game.id}`} className="min-w-0">
          <h3
            className={cn(
              "font-display font-semibold leading-snug transition-colors group-hover:text-accent",
              isCompact ? "line-clamp-2 text-sm" : "text-base sm:text-lg"
            )}
          >
            {game.title}
          </h3>
        </Link>

        {isCompact ? (
          <div className="flex items-center justify-between gap-1 text-xs">
            <GameRating rating={game.rating} className="scale-90 origin-left" />
            <span className="truncate text-[10px] text-muted-foreground">{game.genre}</span>
          </div>
        ) : (
          <>
            <p className="truncate text-xs text-muted-foreground">{game.developer}</p>
            <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{game.description}</p>
          </>
        )}

        <div
          className={cn(
            "mt-auto border-t border-white/5",
            isCompact ? "flex flex-col gap-1.5 pt-2" : "flex items-center justify-between gap-2 pt-3"
          )}
        >
          <div className={cn("flex flex-wrap items-baseline gap-1", isCompact && "min-h-[1.25rem]")}>
            <span className={cn("font-bold", isCompact ? "text-sm" : "text-lg")}>
              {formatPrice(game.price)}
            </span>
            {game.originalPrice && game.originalPrice > game.price && (
              <span className="text-[10px] text-muted-foreground line-through sm:text-xs">
                {formatPrice(game.originalPrice)}
              </span>
            )}
          </div>
          <PurchaseButton
            game={game}
            size="sm"
            compactLabel={isCompact}
            className={cn(isCompact && "h-8 w-full px-2 text-xs")}
          />
        </div>
      </div>
    </motion.article>
  );
}
