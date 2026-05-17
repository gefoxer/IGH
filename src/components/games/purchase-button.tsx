"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-provider";
import { cn, formatPrice } from "@/lib/utils";
import { ru } from "@/lib/i18n/ru";
import type { Game } from "@/types";

interface PurchaseButtonProps {
  game: Game;
  size?: "default" | "sm" | "lg";
  className?: string;
  redirectToLibrary?: boolean;
  compactLabel?: boolean;
}

export function PurchaseButton({
  game,
  size = "default",
  className,
  redirectToLibrary = false,
  compactLabel = false,
}: PurchaseButtonProps) {
  const router = useRouter();
  const { status } = useSession();
  const { loading, isOwned, canAfford, purchaseGame } = useUser();

  const owned = isOwned(game.id);
  const authenticated = status === "authenticated";

  if (status === "loading" || loading) {
    return (
      <Button size={size} className={className} disabled>
        {ru.game.loading}
      </Button>
    );
  }

  if (owned) {
    return (
      <Button size={size} variant="secondary" className={className} disabled>
        <Check className="h-4 w-4" />
        {ru.game.owned}
      </Button>
    );
  }

  const handlePurchase = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!authenticated) {
      toast.error(ru.game.loginToBuy, {
        action: { label: ru.game.login, onClick: () => router.push("/profile") },
      });
      return;
    }

    const result = await purchaseGame(game.id);

    if (!result.ok) {
      if (result.reason === "insufficient") {
        toast.error(ru.game.insufficientFunds, {
          description: `${ru.game.insufficientFundsDesc}: ${formatPrice(game.price)}`,
          action: {
            label: ru.game.topUpWallet,
            onClick: () => router.push("/profile/wallet"),
          },
        });
      }
      return;
    }

    toast.success(`${game.title} ${ru.game.addedToLibrary}`, {
      description: `${ru.game.purchasedFor}: ${formatPrice(game.price)}`,
    });
    if (redirectToLibrary) router.push("/library");
  };

  const affordHint = authenticated && !canAfford(game.price) && game.price > 0;

  return (
    <Button
      size={size}
      className={cn(className, affordHint && "border-amber-500/40")}
      onClick={handlePurchase}
      variant={affordHint ? "outline" : "default"}
    >
      <ShoppingCart className={cn(compactLabel && "h-3.5 w-3.5")} />
      {compactLabel ? ru.game.buy : `${ru.game.buy} ${formatPrice(game.price)}`}
    </Button>
  );
}
