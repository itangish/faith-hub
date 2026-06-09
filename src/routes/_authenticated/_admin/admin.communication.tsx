import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaCommentDots, FaEnvelope, FaSms, FaPaperPlane } from "react-icons/fa";

const CAMPAIGNS = [
  { name: "Sunday Service Reminder", channel: "SMS", audience: "All Members", sent: 412, delivered: 408, date: "Jun 7, 2026" },
  { name: "Youth Conference Invite", channel: "Email", audience: "Youth Group", sent: 156, delivered: 152, date: "Jun 5, 2026" },
  { name: "Monthly Newsletter — June", channel: "Email", audience: "All Members", sent: 412, delivered: 405, date: "Jun 1, 2026" },
  { name: "Prayer Request — Family X", channel: "In-App", audience: "Leaders", sent: 28, delivered: 28, date: "May 30, 2026" },
  { name: "Pledge Reminder Q2", channel: "SMS", audience: "Givers", sent: 198, delivered: 196, date: "May 28, 2026" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/communication")({
  head: () => ({ meta: [{ title: "Communication — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaCommentDots}
        title="Communication"
        subtitle="Send emails, SMS, and in-app messages to members and groups"
        endpoint="GET /api/messages"
        addLabel="New Campaign"
        stats={[
          { label: "Messages Sent", value: CAMPAIGNS.reduce((a, c) => a + c.sent, 0), icon: FaPaperPlane },
          { label: "Email Delivered", value: 557, icon: FaEnvelope, tint: "bg-blue-500/10 text-blue-600" },
          { label: "SMS Delivered", value: 604, icon: FaSms, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Conversations", value: 47, icon: FaCommentDots, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        table={{
          title: "Recent Campaigns",
          columns: [
            { key: "name", label: "Campaign" }, { key: "channel", label: "Channel" },
            { key: "audience", label: "Audience" }, { key: "sent", label: "Sent" },
            { key: "delivered", label: "Delivered" }, { key: "date", label: "Date" },
          ],
          rows: CAMPAIGNS.map(c => ({ ...c, channel: <Badge tone="info">{c.channel}</Badge> })),
        }}
      />
    </AppShell>
  ),
});
