import { useAuth } from "@/hooks/useAuth";
import { OverviewSection } from "./OverviewSection";
import { SummarySection } from "./SummarySection";
import { SystemStatusSection } from "./SystemStatusSection";
import { WorkspaceSection } from "./WorkspaceSection";

export function AdminDashboardPage() {
  const { admin } = useAuth();
  const firstName = admin?.fullName.trim().split(/\s+/)[0] || "Administrator";

  return (
    <div className="space-y-6">
      <OverviewSection firstName={firstName} />
      <SummarySection />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SystemStatusSection />
        <WorkspaceSection />
      </div>
    </div>
  );
}
