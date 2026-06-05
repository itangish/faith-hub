import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaUserCheck, FaUserClock, FaUserTimes, FaUsers, FaUserPlus } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/user-approvals")({
  head: () => ({ meta: [{ title: "User Approvals — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserCheck}
        title="User Approvals"
        subtitle="Review and approve new member registrations"
        endpoint="GET /api/users/pending"
        stats={[
          { label: "Pending", value: 0, icon: FaUserClock, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Approved (30d)", value: 0, icon: FaUserCheck, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Rejected (30d)", value: 0, icon: FaUserTimes, tint: "bg-rose-500/10 text-rose-600" },
          { label: "Total Members", value: 0, icon: FaUsers, tint: "bg-blue-500/10 text-blue-600" },
        ]}
        sections={[
          { title: "Pending Registrations", items: [], empty: "No pending registrations." },
          { title: "Recently Approved", items: [], empty: "No recent approvals." },
        ]}
      />
    </AppShell>
  ),
});
