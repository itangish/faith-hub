import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaBook, FaBookOpen, FaBookmark, FaUsers } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/books")({
  head: () => ({ meta: [{ title: "Library — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaBook}
        title="Library"
        subtitle="Bibles, devotionals, study guides, and lending records"
        endpoint="GET /api/books"
        stats={[
          { label: "Titles", value: 0, icon: FaBook },
          { label: "Copies", value: 0, icon: FaBookOpen, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Loaned Out", value: 0, icon: FaBookmark, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Borrowers", value: 0, icon: FaUsers, tint: "bg-emerald-500/10 text-emerald-600" },
        ]}
        sections={[
          { title: "Recent Additions", items: [], empty: "No books in catalog." },
          { title: "Overdue Loans", items: [], empty: "No overdue loans." },
        ]}
      />
    </AppShell>
  ),
});
