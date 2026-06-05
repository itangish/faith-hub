import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader, StatGrid, ListCard, InfoBanner, Toolbar } from "@/components/PageScaffold";
import { FaBook, FaBookOpen, FaBookmark, FaHistory } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/member/books")({
  head: () => ({ meta: [{ title: "Library — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="member">
      <div className="space-y-6">
        <PageHeader icon={FaBook} title="Library" subtitle="Browse and borrow from the church library" />
        <InfoBanner>Connects to <code className="font-mono text-gold">GET /api/books</code>.</InfoBanner>
        <StatGrid
          stats={[
            { label: "Available", value: 0, icon: FaBookOpen, tint: "bg-emerald-500/10 text-emerald-600" },
            { label: "My Loans", value: 0, icon: FaBookmark, tint: "bg-gold/10 text-gold" },
            { label: "History", value: 0, icon: FaHistory, tint: "bg-blue-500/10 text-blue-600" },
            { label: "Wishlist", value: 0, icon: FaBook, tint: "bg-purple-500/10 text-purple-600" },
          ]}
        />
        <Toolbar placeholder="Search books..." />
        <ListCard title="Featured Titles" items={[]} empty="No books in catalog." />
      </div>
    </AppShell>
  ),
});
