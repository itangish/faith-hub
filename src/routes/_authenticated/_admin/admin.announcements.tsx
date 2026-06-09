import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaBullhorn, FaEye, FaThumbtack, FaArchive } from "react-icons/fa";

const ANNOUNCEMENTS = [
  { title: "Annual General Meeting — June 30", category: "Important", author: "Pastor John", views: 412, status: "Published", date: "Jun 5, 2026" },
  { title: "Youth Conference Registration Open", category: "Events", author: "Sarah Uwase", views: 287, status: "Pinned", date: "Jun 3, 2026" },
  { title: "New Building Project Update Q2", category: "Project", author: "Elder David", views: 198, status: "Published", date: "May 28, 2026" },
  { title: "Sunday School Curriculum Refresh", category: "Education", author: "Grace I.", views: 142, status: "Published", date: "May 22, 2026" },
  { title: "Mission Trip to Burundi — Sign Up", category: "Missions", author: "Pastor John", views: 356, status: "Published", date: "May 18, 2026" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/announcements")({
  head: () => ({ meta: [{ title: "Announcements — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaBullhorn}
        title="Announcements"
        subtitle="Post church-wide notices, bulletins, and updates"
        endpoint="GET /api/announcements"
        addLabel="New Post"
        stats={[
          { label: "Published", value: ANNOUNCEMENTS.length, icon: FaBullhorn },
          { label: "Pinned", value: 1, icon: FaThumbtack, tint: "bg-gold/10 text-gold" },
          { label: "Total Views", value: ANNOUNCEMENTS.reduce((a, x) => a + x.views, 0), icon: FaEye, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Archived", value: 12, icon: FaArchive, tint: "bg-slate-500/10 text-slate-600" },
        ]}
        table={{
          title: "Recent Announcements",
          columns: [
            { key: "title", label: "Title" }, { key: "category", label: "Category" },
            { key: "author", label: "Author" }, { key: "date", label: "Posted" },
            { key: "views", label: "Views" }, { key: "status", label: "Status" },
          ],
          rows: ANNOUNCEMENTS.map(a => ({ ...a, status: <Badge tone={a.status === "Pinned" ? "gold" : "success"}>{a.status}</Badge> })),
        }}
      />
    </AppShell>
  ),
});
