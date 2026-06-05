import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaUserShield, FaKey, FaUsers, FaLock } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/roles")({
  head: () => ({ meta: [{ title: "Roles & Permissions — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserShield}
        title="Roles & Permissions"
        subtitle="Define roles such as Admin, Pastor, Treasurer, Leader, Member"
        endpoint="GET /api/roles"
        stats={[
          { label: "Roles", value: 4, icon: FaUserShield },
          { label: "Permissions", value: 0, icon: FaKey, tint: "bg-gold/10 text-gold" },
          { label: "Users Assigned", value: 0, icon: FaUsers, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Restricted Routes", value: 0, icon: FaLock, tint: "bg-rose-500/10 text-rose-600" },
        ]}
        sections={[
          {
            title: "Built-in Roles",
            items: [
              { icon: FaUserShield, title: "Admin", subtitle: "Full system access" },
              { icon: FaUserShield, title: "Pastor", subtitle: "Spiritual oversight & members" },
              { icon: FaUserShield, title: "Treasurer", subtitle: "Finance & contributions" },
              { icon: FaUserShield, title: "Leader", subtitle: "Groups & ministry leads" },
            ],
          },
          { title: "Recent Role Changes", items: [], empty: "No recent changes." },
        ]}
      />
    </AppShell>
  ),
});
