"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/user-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#ffffff",
            },
          }}
        />
      </UserProvider>
    </SessionProvider>
  );
}
