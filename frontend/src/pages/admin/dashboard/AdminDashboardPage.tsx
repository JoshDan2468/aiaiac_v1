import { useAuth } from "@/hooks/useAuth";
import { OverviewSection } from "./OverviewSection";
import { SummarySection } from "./SummarySection";
import { SystemStatusSection } from "./SystemStatusSection";
import { WorkspaceSection } from "./WorkspaceSection";

export function AdminDashboardPage() {
  const { admin } = useAuth();
  const firstName = admin?.fullName.trim().split(/\s+/)[0] || "Administrator";

  return (
    <div className="mx-auto max-w-[92rem]">
      <OverviewSection firstName={firstName} />
      <SummarySection />
      <div className="grid gap-6 border-t border-border pt-8 xl:grid-cols-[0.72fr_1.28fr]">
        <SystemStatusSection />
        <WorkspaceSection />
      </div>
    </div>
  );
}
