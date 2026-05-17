import { Suspense } from "react";
import { StoreContent } from "@/components/store/store-content";
import { GameGridSkeleton } from "@/components/games/game-card-skeleton";
import { SectionHeading } from "@/components/shared/section-heading";
import { ru } from "@/lib/i18n/ru";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ru.nav.store,
  description: ru.metadata.store,
};

export default function StorePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={ru.store.title} subtitle={ru.store.subtitle} />
      <Suspense fallback={<GameGridSkeleton count={12} />}>
        <StoreContent />
      </Suspense>
    </div>
  );
}
