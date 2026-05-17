import Link from "next/link";
import { Gamepad2, Share2, MessageCircle, PlayCircle } from "lucide-react";
import { ru } from "@/lib/i18n/ru";

const footerLinks = [
  { href: "/store", label: ru.footer.store },
  { href: "/discover", label: ru.footer.discover },
  { href: "/library", label: ru.footer.library },
  { href: "/profile", label: ru.nav.profile },
];

const socialLinks = [
  { href: "https://vk.com", label: "VK", icon: Share2 },
  { href: "https://t.me", label: "Telegram", icon: MessageCircle },
  { href: "https://youtube.com", label: "YouTube", icon: PlayCircle },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/5 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <Gamepad2 className="h-5 w-5" />
              </span>
              {ru.siteName}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{ru.footer.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {ru.footer.navigate}
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {ru.footer.connect}
            </h4>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-background text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/5 pt-6 text-center text-sm text-muted-foreground">
          © {year} {ru.siteName}. {ru.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
