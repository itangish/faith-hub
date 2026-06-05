import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaBullhorn, FaEye, FaThumbtack, FaArchive } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/announcements")({
  head: () => ({ meta: [{ title: "Announcements — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaBullhorn}
        title="Announcements"
        subtitle="Post church-wide notices, bulletins, and updates"
        endpoint="GET /api/announcements"
        stats={[
          { label: "Published", value: 0, icon: FaBullhorn },
          { label: "Pinned", value: 0, icon: FaThumbtack, tint: "bg-gold/10 text-gold" },
          { label: "Total Views", value: 0, icon: FaEye, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Archived", value: 0, icon: FaArchive, tint: "bg-slate-500/10 text-slate-600" },
        ]}
        sections={[
          { title: "Recent Announcements", items: [], empty: "Nothing posted yet." },
          { title: "Drafts", items: [], empty: "No drafts." },
        ]}
      />
    </AppShell>
  ),
});
