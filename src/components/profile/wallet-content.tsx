"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Wallet, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/user-provider";
import { cn, formatPrice } from "@/lib/utils";
import { ru } from "@/lib/i18n/ru";

export function WalletContent() {
  const router = useRouter();
  const { status } = useSession();
  const { profile, loading, balance, topUpBalance } = useUser();

  const [selectedPreset, setSelectedPreset] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount =
      customAmount.trim() !== ""
        ? Number.parseInt(customAmount.replace(/\s/g, ""), 10)
        : selectedPreset;

    if (!amount || amount < 100) {
      toast.error(ru.wallet.invalidAmount);
      return;
    }

    setSubmitting(true);
    const ok = await topUpBalance(amount);
    setSubmitting(false);

    if (!ok) {
      toast.error(ru.auth.registerFailed);
      return;
    }

    toast.success(`${ru.wallet.success} ${formatPrice(amount)}`);
    setCustomAmount("");
    router.push("/profile");
  };

  if (status === "loading" || loading) {
    return <p className="text-muted-foreground">{ru.profile.loading}</p>;
  }

  if (!profile) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">{ru.wallet.loginRequired}</p>
          <Button asChild className="mt-4">
            <Link href="/profile">{ru.wallet.goLogin}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        {ru.wallet.backToProfile}
      </Link>

      <Card className="overflow-hidden border-accent/20">
        <div className="bg-gradient-to-br from-accent/25 via-card to-card px-6 py-8">
          <div className="flex items-center gap-3 text-accent">
            <Wallet className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {ru.wallet.currentBalance}
            </span>
          </div>
          <p className="mt-2 font-display text-4xl font-bold tracking-tight">
            {formatPrice(balance)}
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-xl">{ru.wallet.selectAmount}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTopUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ru.wallet.presets.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(amount);
                    setCustomAmount("");
                  }}
                  className={cn(
                    "rounded-xl border px-3 py-4 text-center font-semibold transition-all",
                    selectedPreset === amount && customAmount === ""
                      ? "border-accent bg-accent/15 text-accent shadow-lg shadow-accent/20"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  )}
                >
                  {formatPrice(amount)}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-amount">{ru.wallet.customAmount}</Label>
              <Input
                id="custom-amount"
                type="number"
                min={100}
                step={100}
                placeholder={ru.wallet.customPlaceholder}
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedPreset(null);
                }}
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              <Sparkles className="h-4 w-4" />
              {submitting ? ru.auth.loading : ru.wallet.topUp}
            </Button>
            <p className="text-center text-xs text-muted-foreground">{ru.wallet.demoNote}</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
