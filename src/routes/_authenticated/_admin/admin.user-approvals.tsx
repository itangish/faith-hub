import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaUserCheck, FaUserClock, FaUserTimes, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { localMembers, type LocalMember } from "@/lib/local-members";

export const Route = createFileRoute("/_authenticated/_admin/admin/user-approvals")({
  head: () => ({ meta: [{ title: "User Approvals — KYB Rajepra" }] }),
  component: ApprovalsPage,
});

function ApprovalsPage() {
  const [list, setList] = useState<LocalMember[]>([]);
  useEffect(() => { setList(localMembers.list()); }, []);

  const rows = list.map((m) => ({
    name: <span className="font-medium">{m.name}</span>,
    email: m.email,
    phone: m.phone || "—",
    requested: new Date(m.createdAt).toLocaleString(),
    status: <Badge tone="success">{m.status}</Badge>,
    actions: (
      <div className="flex gap-2 justify-end">
        <button className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 text-xs font-medium hover:bg-emerald-500/20">Approve</button>
        <button className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-600 text-xs font-medium hover:bg-rose-500/20">Reject</button>
      </div>
    ),
  }));

  return (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserCheck}
        title="User Approvals"
        subtitle="Review and approve new member registrations"
        endpoint="GET /api/users/pending"
        addLabel="Invite User"
        stats={[
          { label: "Pending", value: 0, icon: FaUserClock, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Approved", value: list.length, icon: FaUserCheck, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Rejected (30d)", value: 0, icon: FaUserTimes, tint: "bg-rose-500/10 text-rose-600" },
          { label: "Total Members", value: list.length, icon: FaUsers, tint: "bg-blue-500/10 text-blue-600" },
        ]}
        table={{
          title: "Registered Users",
          columns: [
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "requested", label: "Registered" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ],
          rows,
          empty: "No registrations yet.",
        }}
      />
    </AppShell>
  );
}
