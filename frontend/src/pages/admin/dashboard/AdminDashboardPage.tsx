import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAdminOverview, type AdminOverview } from "@/services/admin/adminOverviewService";
import { OverviewSection } from "./OverviewSection";
import { RecentActivitySection } from "./RecentActivitySection";
import { SummarySection } from "./SummarySection";
import { SystemStatusSection } from "./SystemStatusSection";
import { WorkspaceSection } from "./WorkspaceSection";

export function AdminDashboardPage() {
  const { admin } = useAuth();
  const firstName = admin?.fullName.trim().split(/\s+/)[0] || "Administrator";
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  const loadOverview = useCallback(async () => {
    setState("loading");
    const result = await getAdminOverview();
    if (!result.ok) {
      setState("error");
      return;
    }
    setOverview(result.overview);
    setState("ready");
  }, []);

  useEffect(() => void loadOverview(), [loadOverview]);

  return (
    <div className="space-y-6">
      <OverviewSection firstName={firstName} />
      <SummarySection overview={overview} state={state} onRetry={loadOverview} />
      {state === "ready" && overview ? (
        <RecentActivitySection items={overview.recentActivity} />
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SystemStatusSection />
        <WorkspaceSection />
      </div>
    </div>
  );
}
