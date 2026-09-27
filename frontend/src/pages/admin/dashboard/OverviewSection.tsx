import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export function OverviewSection({ firstName }: { firstName: string }) {
  return (
    <AdminPageHeader
      eyebrow="Operations Overview"
      title={`Welcome back, ${firstName}`}
      description="Manage conference registrations, review delegate and commercial applications, track verified payments, and administer staff access."
    />
  );
}
