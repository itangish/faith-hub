import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaHandHoldingUsd, FaGift, FaChartBar, FaWallet } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/contributions")({
  head: () => ({ meta: [{ title: "Contributions — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaHandHoldingUsd}
        title="Contributions"
        subtitle="Tithes, offerings, pledges, and special giving"
        endpoint="GET /api/contributions"
        stats={[
          { label: "Total (YTD)", value: "$0", icon: FaWallet, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "This Month", value: "$0", icon: FaHandHoldingUsd, tint: "bg-gold/10 text-gold" },
          { label: "Pledges", value: "$0", icon: FaGift, tint: "bg-purple-500/10 text-purple-600" },
          { label: "Avg per Member", value: "$0", icon: FaChartBar, tint: "bg-blue-500/10 text-blue-600" },
        ]}
        sections={[
          { title: "Recent Contributions", items: [], empty: "No contributions recorded." },
          { title: "Top Givers", items: [], empty: "No data." },
        ]}
      />
    </AppShell>
  ),
});
