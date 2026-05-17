"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import type { LibraryEntry } from "@/types";
import type { UserProfile } from "@/lib/user-data";

type PurchaseResult =
  | { ok: true }
  | { ok: false; reason: "not_logged_in" | "owned" | "insufficient" };

interface UserContextValue {
  profile: UserProfile | null;
  loading: boolean;
  refresh: () => Promise<void>;
  balance: number;
  library: Record<string, LibraryEntry>;
  isOwned: (gameId: string) => boolean;
  canAfford: (price: number) => boolean;
  purchaseGame: (gameId: string) => Promise<PurchaseResult>;
  topUpBalance: (amount: number) => Promise<boolean>;
  installGame: (gameId: string) => Promise<void>;
  uninstallGame: (gameId: string) => Promise<void>;
  playGame: (gameId: string) => Promise<void>;
  getOwnedCount: () => number;
  getTotalPlaytime: () => number;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (status !== "authenticated") {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = (await res.json()) as UserProfile;
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === "loading") return;
    refresh();
  }, [status, refresh]);

  const purchaseGame = useCallback(
    async (gameId: string): Promise<PurchaseResult> => {
      if (status !== "authenticated") return { ok: false, reason: "not_logged_in" };
      if (profile?.library[gameId]) return { ok: false, reason: "owned" };

      const res = await fetch("/api/library/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId }),
      });

      if (res.status === 402) return { ok: false, reason: "insufficient" };
      if (!res.ok) return { ok: false, reason: "owned" };

      const data = (await res.json()) as UserProfile;
      setProfile(data);
      return { ok: true };
    },
    [status, profile?.library]
  );

  const topUpBalance = useCallback(async (amount: number) => {
    const res = await fetch("/api/wallet/topup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as UserProfile;
    setProfile(data);
    return true;
  }, []);

  const patchLibrary = useCallback(async (gameId: string, action: string) => {
    const res = await fetch(`/api/library/${gameId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      const data = (await res.json()) as UserProfile;
      setProfile(data);
    }
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({
      profile,
      loading: status === "loading" || loading,
      refresh,
      balance: profile?.balance ?? 0,
      library: profile?.library ?? {},
      isOwned: (gameId) => Boolean(profile?.library[gameId]),
      canAfford: (price) => (profile?.balance ?? 0) >= price,
      purchaseGame,
      topUpBalance,
      installGame: (gameId) => patchLibrary(gameId, "install"),
      uninstallGame: (gameId) => patchLibrary(gameId, "uninstall"),
      playGame: (gameId) => patchLibrary(gameId, "play"),
      getOwnedCount: () => Object.keys(profile?.library ?? {}).length,
      getTotalPlaytime: () =>
        Object.values(profile?.library ?? {}).reduce((s, e) => s + e.hoursPlayed, 0),
    }),
    [profile, loading, status, refresh, purchaseGame, topUpBalance, patchLibrary]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
