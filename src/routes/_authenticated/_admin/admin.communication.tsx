import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaCommentDots, FaEnvelope, FaSms, FaPaperPlane } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/communication")({
  head: () => ({ meta: [{ title: "Communication — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaCommentDots}
        title="Communication"
        subtitle="Send emails, SMS, and in-app messages to members and groups"
        endpoint="GET /api/messages"
        stats={[
          { label: "Messages Sent", value: 0, icon: FaPaperPlane },
          { label: "Email Delivered", value: 0, icon: FaEnvelope, tint: "bg-blue-500/10 text-blue-600" },
          { label: "SMS Delivered", value: 0, icon: FaSms, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Conversations", value: 0, icon: FaCommentDots, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        sections={[
          { title: "Recent Campaigns", items: [], empty: "No campaigns sent." },
          { title: "Direct Conversations", items: [], empty: "No active conversations." },
        ]}
      />
    </AppShell>
  ),
});
