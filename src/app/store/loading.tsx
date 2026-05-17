import { GameGridSkeleton } from "@/components/games/game-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-72" />
      </div>
      <GameGridSkeleton count={12} />
    </div>
  );
}
