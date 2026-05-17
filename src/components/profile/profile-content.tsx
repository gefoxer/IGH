"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, Gamepad2, Clock, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AuthForms } from "@/components/profile/auth-forms";
import { useUser } from "@/context/user-provider";
import { formatPlaytime, formatPrice } from "@/lib/utils";
import { ru } from "@/lib/i18n/ru";

export function ProfileContent() {
  const { profile, loading, balance, getOwnedCount, getTotalPlaytime } = useUser();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.info(ru.profile.loggedOut);
  };

  if (loading) {
    return <p className="text-muted-foreground">{ru.profile.loading}</p>;
  }

  if (!profile) {
    return <AuthForms />;
  }

  const owned = getOwnedCount();
  const playtime = getTotalPlaytime();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="border-accent/20">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{ru.wallet.balance}</p>
              <p className="font-display text-2xl font-bold">{formatPrice(balance)}</p>
            </div>
          </div>
          <Button asChild>
            <Link href="/profile/wallet">{ru.wallet.topUpLink}</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:items-start">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-accent/40 bg-card">
            <Image
              src={profile.avatar}
              alt={profile.username}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-display text-2xl font-bold">{profile.username}</h2>
            <p className="text-muted-foreground">{profile.email}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-start">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm">
                <Gamepad2 className="h-4 w-4 text-accent" />
                <span>
                  <strong>{owned}</strong> {ru.profile.gamesOwned}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm">
                <Clock className="h-4 w-4 text-accent" />
                <span>
                  <strong>{formatPlaytime(playtime)}</strong> {ru.profile.totalPlaytime}
                </span>
              </div>
            </div>
            <Button variant="destructive" className="mt-6" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              {ru.profile.logout}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
