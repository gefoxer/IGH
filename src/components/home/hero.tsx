"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameRating } from "@/components/games/game-rating";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { getSpotlightGame } from "@/data/games";
import { ru } from "@/lib/i18n/ru";

export function Hero() {
  const spotlight = getSpotlightGame();

  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0">
        <Image
          src={spotlight.bannerImage}
          alt={spotlight.title}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Gamepad2 className="h-3.5 w-3.5" />
              {ru.hero.badge}
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="gradient-text">{ru.hero.title}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {ru.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/store">
                  {ru.hero.browseGames}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/library">{ru.hero.myLibrary}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              href={`/store/${spotlight.id}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-card/80 shadow-2xl shadow-accent/10 backdrop-blur-sm transition-all hover:border-accent/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={spotlight.coverImage}
                  alt={spotlight.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute left-4 top-4 rounded-md bg-accent px-2 py-1 text-xs font-bold uppercase text-white">
                  {ru.hero.spotlight}
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl font-bold group-hover:text-accent sm:text-2xl">
                  {spotlight.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{spotlight.developer}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Badge variant="secondary">{spotlight.genre}</Badge>
                  <GameRating rating={spotlight.rating} />
                  <span className="text-lg font-bold">{formatPrice(spotlight.price)}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
