import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ListCard, InfoBanner } from "@/components/PageScaffold";
import { FaBullhorn, FaThumbtack } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/member/announcements")({
  head: () => ({ meta: [{ title: "Announcements — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="member">
      <div className="space-y-6">
        <PageHeader icon={FaBullhorn} title="Announcements" subtitle="Latest news and updates from the church" />
        <InfoBanner>Connects to <code className="font-mono text-gold">GET /api/announcements</code>.</InfoBanner>
        <div className="grid lg:grid-cols-2 gap-4">
          <ListCard title="Pinned" items={[{ icon: FaThumbtack, title: "Welcome to KYB Rajepra", subtitle: "Stay connected through your member portal." }]} />
          <ListCard title="Recent" items={[]} empty="No new announcements." />
        </div>
      </div>
    </AppShell>
  ),
});
