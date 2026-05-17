"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ru } from "@/lib/i18n/ru";

const navLinks = [
  { href: "/store", label: ru.nav.store },
  { href: "/discover", label: ru.nav.discover },
  { href: "/library", label: ru.nav.library },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-white/5">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight transition-opacity hover:opacity-90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent transition-colors group-hover:bg-accent/30">
              <Gamepad2 className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline gradient-text">{ru.siteName}</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent/15 text-accent"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/profile"
              ? "bg-accent/15 text-accent"
              : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
          )}
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{ru.nav.profile}</span>
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden">
        {navLinks.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                active ? "bg-accent/15 text-accent" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
