import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Building2 } from "lucide-react";
import { getGameById, games } from "@/data/games";
import { ScreenshotGallery } from "@/components/games/screenshot-gallery";
import { GameDetailPurchase } from "@/components/games/game-detail-purchase";
import { GameRating } from "@/components/games/game-rating";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPrice } from "@/lib/utils";
import { ru } from "@/lib/i18n/ru";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

const reqLabels: Record<string, string> = {
  os: ru.requirements.os,
  processor: ru.requirements.processor,
  memory: ru.requirements.memory,
  graphics: ru.requirements.graphics,
  storage: ru.requirements.storage,
};

export async function generateStaticParams() {
  return games.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const game = getGameById(id);
  if (!game) return { title: "Игра не найдена" };
  return {
    title: game.title,
    description: game.description,
  };
}

export default async function GameDetailPage({ params }: PageProps) {
  const { id } = await params;
  const game = getGameById(id);
  if (!game) notFound();

  return (
    <div className="pb-16">
      <div className="relative h-64 sm:h-80 lg:h-96">
        <Image
          src={game.bannerImage}
          alt={game.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Link
            href="/store"
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            {ru.game.backToStore}
          </Link>
          <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            {game.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Badge>{game.genre}</Badge>
            <GameRating rating={game.rating} />
            <span className="text-2xl font-bold">{formatPrice(game.price)}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold">{ru.game.screenshots}</h2>
            <ScreenshotGallery screenshots={game.screenshots} />
          </section>
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold">{ru.game.about}</h2>
            <p className="leading-relaxed text-muted-foreground">{game.longDescription}</p>
          </section>
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold">{ru.game.requirements}</h2>
            <dl className="grid gap-3 rounded-xl border border-white/5 bg-card p-6 sm:grid-cols-2">
              {Object.entries(game.systemRequirements).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {reqLabels[key] ?? key}
                  </dt>
                  <dd className="mt-1 text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-white/5 bg-card p-6">
            <GameDetailPurchase game={game} />
            <dl className="mt-6 space-y-4 border-t border-white/5 pt-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4 shrink-0 text-accent" />
                <div>
                  <dt className="text-xs uppercase tracking-wider">{ru.game.developer}</dt>
                  <dd className="text-foreground">{game.developer}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0 text-accent" />
                <div>
                  <dt className="text-xs uppercase tracking-wider">{ru.game.release}</dt>
                  <dd className="text-foreground">{formatDate(game.releaseDate)}</dd>
                </div>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}