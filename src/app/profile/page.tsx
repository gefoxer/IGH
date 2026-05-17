import { ProfileContent } from "@/components/profile/profile-content";
import { SectionHeading } from "@/components/shared/section-heading";
import { ru } from "@/lib/i18n/ru";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ru.profile.title,
  description: ru.metadata.profile,
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={ru.profile.title} subtitle={ru.profile.subtitle} />
      <ProfileContent />
    </div>
  );
}
