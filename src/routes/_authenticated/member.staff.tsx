import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ListCard, InfoBanner, Toolbar } from "@/components/PageScaffold";
import { FaUserTie } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/member/staff")({
  head: () => ({ meta: [{ title: "Staff Directory — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="member">
      <div className="space-y-6">
        <PageHeader icon={FaUserTie} title="Staff Directory" subtitle="Reach out to pastors, leaders, and staff" />
        <InfoBanner>Connects to <code className="font-mono text-gold">GET /api/staff/public</code>.</InfoBanner>
        <Toolbar placeholder="Search staff..." />
        <ListCard title="Pastoral & Staff Team" items={[]} empty="No staff listed yet." />
      </div>
    </AppShell>
  ),
});
