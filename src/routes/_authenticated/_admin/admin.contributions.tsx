import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaHandHoldingUsd, FaGift, FaChartBar, FaWallet } from "react-icons/fa";

const CONTRIBS = [
  { date: "Jun 7, 2026", member: "John Mugisha", type: "Tithe", method: "Mobile Money", amount: "$250" },
  { date: "Jun 7, 2026", member: "Esther Mukamana", type: "Offering", method: "Cash", amount: "$50" },
  { date: "Jun 6, 2026", member: "David Habimana", type: "Pledge", method: "Bank Transfer", amount: "$500" },
  { date: "Jun 5, 2026", member: "Sarah Uwase", type: "Tithe", method: "Mobile Money", amount: "$120" },
  { date: "Jun 5, 2026", member: "Paul Nkurunziza", type: "Building Fund", method: "Bank Transfer", amount: "$1,000" },
  { date: "Jun 4, 2026", member: "Grace Iradukunda", type: "Tithe", method: "Mobile Money", amount: "$80" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/contributions")({
  head: () => ({ meta: [{ title: "Contributions — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaHandHoldingUsd}
        title="Contributions"
        subtitle="Tithes, offerings, pledges, and special giving"
        endpoint="GET /api/contributions"
        addLabel="Record Gift"
        stats={[
          { label: "Total (YTD)", value: "$42,890", icon: FaWallet, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "This Month", value: "$8,420", icon: FaHandHoldingUsd, tint: "bg-gold/10 text-gold" },
          { label: "Pledges Outstanding", value: "$12,500", icon: FaGift, tint: "bg-purple-500/10 text-purple-600" },
          { label: "Avg per Member", value: "$104", icon: FaChartBar, tint: "bg-blue-500/10 text-blue-600" },
        ]}
        table={{
          title: "Recent Contributions",
          columns: [
            { key: "date", label: "Date" }, { key: "member", label: "Member" },
            { key: "type", label: "Type" }, { key: "method", label: "Method" },
            { key: "amount", label: "Amount" }, { key: "status", label: "Status" },
          ],
          rows: CONTRIBS.map(c => ({
            ...c,
            type: <Badge tone="info">{c.type}</Badge>,
            amount: <span className="font-semibold text-emerald-600">{c.amount}</span>,
            status: <Badge tone="success">Recorded</Badge>,
          })),
        }}
      />
    </AppShell>
  ),
});
