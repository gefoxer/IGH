import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function GameRating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm text-amber-400",
        className
      )}
    >
      <Star className="h-3.5 w-3.5 fill-amber-400" />
      {rating.toFixed(1)}
    </span>
  );
}
