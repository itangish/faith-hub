import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaUserTie, FaMoneyCheckAlt, FaCalendarAlt, FaFileInvoiceDollar } from "react-icons/fa";

const STAFF = [
  { name: "Pastor John Mugisha", role: "Senior Pastor", department: "Pastoral", salary: "$1,800", status: "Active", payday: "Jun 30, 2026" },
  { name: "Esther Mukamana", role: "Worship Director", department: "Worship", salary: "$900", status: "Active", payday: "Jun 30, 2026" },
  { name: "David Habimana", role: "Treasurer", department: "Finance", salary: "$750", status: "Active", payday: "Jun 30, 2026" },
  { name: "Grace Iradukunda", role: "Children's Coordinator", department: "Education", salary: "$650", status: "Active", payday: "Jun 30, 2026" },
  { name: "Samuel Niyonsenga", role: "Facilities Manager", department: "Operations", salary: "$600", status: "On Leave", payday: "—" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/staff")({
  head: () => ({ meta: [{ title: "Staff & Payroll — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserTie}
        title="Staff & Payroll"
        subtitle="Employee directory, salaries, and monthly payroll runs"
        endpoint="GET /api/staff"
        addLabel="Add Staff"
        stats={[
          { label: "Staff Members", value: STAFF.length, icon: FaUserTie },
          { label: "Monthly Payroll", value: "$4,700", icon: FaMoneyCheckAlt, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Pending Payslips", value: 4, icon: FaFileInvoiceDollar, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Next Payday", value: "Jun 30", icon: FaCalendarAlt, tint: "bg-blue-500/10 text-blue-600" },
        ]}
        table={{
          title: "Staff Directory",
          columns: [
            { key: "name", label: "Name" }, { key: "role", label: "Role" },
            { key: "department", label: "Department" }, { key: "salary", label: "Salary" },
            { key: "status", label: "Status" }, { key: "payday", label: "Next Payday" },
          ],
          rows: STAFF.map(s => ({ ...s, status: <Badge tone={s.status === "Active" ? "success" : "warning"}>{s.status}</Badge> })),
        }}
      />
    </AppShell>
  ),
});
