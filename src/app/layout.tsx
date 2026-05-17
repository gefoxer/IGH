import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";
import { Providers } from "@/components/providers";
import { ru } from "@/lib/i18n/ru";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: ru.siteName,
    template: `%s | ${ru.siteName}`,
  },
  description: ru.metadata.defaultDescription,
  keywords: ["инди игры", "магазин игр", "steam", "библиотека игр", "terraria"],
  openGraph: {
    title: ru.siteName,
    description: ru.metadata.defaultDescription,
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${dmSans.variable} ${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground antialiased">
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
