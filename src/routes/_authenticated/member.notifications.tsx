import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ListCard, InfoBanner } from "@/components/PageScaffold";
import { FaBell, FaCheckDouble } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/member/notifications")({
  head: () => ({ meta: [{ title: "Notifications — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="member">
      <div className="space-y-6">
        <PageHeader
          icon={FaBell}
          title="Notifications"
          subtitle="Alerts, reminders, and messages"
          actions={
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm hover:bg-accent">
              <FaCheckDouble /> Mark all read
            </button>
          }
        />
        <InfoBanner>Connects to <code className="font-mono text-gold">GET /api/notifications</code>.</InfoBanner>
        <ListCard title="Inbox" items={[]} empty="You're all caught up." />
      </div>
    </AppShell>
  ),
});
