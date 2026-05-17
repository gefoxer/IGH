import { LibraryContent } from "@/components/library/library-content";
import { SectionHeading } from "@/components/shared/section-heading";
import { ru } from "@/lib/i18n/ru";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ru.library.title,
  description: ru.metadata.library,
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={ru.library.title} subtitle={ru.library.subtitle} />
      <LibraryContent />
    </div>
  );
}
