import { WalletContent } from "@/components/profile/wallet-content";
import { SectionHeading } from "@/components/shared/section-heading";
import { ru } from "@/lib/i18n/ru";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ru.wallet.title,
  description: ru.wallet.metadata,
};

export default function WalletPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={ru.wallet.title} subtitle={ru.wallet.subtitle} />
      <WalletContent />
    </div>
  );
}
