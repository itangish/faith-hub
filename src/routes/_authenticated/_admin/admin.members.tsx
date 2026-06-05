import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaUsers, FaUserCheck, FaUserSlash, FaUserPlus, FaBirthdayCake } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/members")({
  head: () => ({ meta: [{ title: "Members — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUsers}
        title="Members"
        subtitle="Manage church member profiles, status, and history"
        endpoint="GET /api/members"
        stats={[
          { label: "Total Members", value: 0, icon: FaUsers, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Active", value: 0, icon: FaUserCheck, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Inactive", value: 0, icon: FaUserSlash, tint: "bg-slate-500/10 text-slate-600" },
          { label: "New This Month", value: 0, icon: FaUserPlus, tint: "bg-gold/10 text-gold" },
        ]}
        sections={[
          { title: "Recent Members", items: [], empty: "No members yet." },
          { title: "Upcoming Birthdays", items: [{ icon: FaBirthdayCake, title: "No birthdays this week" }] },
        ]}
      />
    </AppShell>
  ),
});
