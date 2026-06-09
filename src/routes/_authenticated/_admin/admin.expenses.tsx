import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaReceipt, FaFileInvoice, FaClock, FaCheckCircle } from "react-icons/fa";

const EXPENSES = [
  { date: "Jun 6, 2026", description: "Sound system maintenance", category: "Facilities", submittedBy: "Samuel N.", amount: "$320", status: "Pending" },
  { date: "Jun 4, 2026", description: "Conference catering deposit", category: "Events", submittedBy: "Sarah U.", amount: "$850", status: "Approved" },
  { date: "Jun 3, 2026", description: "Sunday school supplies", category: "Education", submittedBy: "Grace I.", amount: "$140", status: "Approved" },
  { date: "Jun 2, 2026", description: "Pastor's travel — Burundi mission", category: "Missions", submittedBy: "Pastor John", amount: "$650", status: "Pending" },
  { date: "May 30, 2026", description: "Electricity bill — May", category: "Utilities", submittedBy: "Elder David", amount: "$220", status: "Paid" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/expenses")({
  head: () => ({ meta: [{ title: "Expenses — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaReceipt}
        title="Expenses"
        subtitle="Submitted expenses, approvals, and reimbursements"
        endpoint="GET /api/expenses"
        addLabel="Submit Expense"
        stats={[
          { label: "Pending", value: 2, icon: FaClock, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Approved (MTD)", value: "$1,210", icon: FaCheckCircle, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Invoices", value: EXPENSES.length, icon: FaFileInvoice, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Total YTD", value: "$14,560", icon: FaReceipt, tint: "bg-rose-500/10 text-rose-600" },
        ]}
        table={{
          title: "Recent Expenses",
          columns: [
            { key: "date", label: "Date" }, { key: "description", label: "Description" },
            { key: "category", label: "Category" }, { key: "submittedBy", label: "Submitted By" },
            { key: "amount", label: "Amount" }, { key: "status", label: "Status" },
          ],
          rows: EXPENSES.map(e => ({
            ...e,
            status: <Badge tone={e.status === "Approved" || e.status === "Paid" ? "success" : "warning"}>{e.status}</Badge>,
          })),
        }}
      />
    </AppShell>
  ),
});
