import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader, StatGrid, ListCard, InfoBanner } from "@/components/PageScaffold";
import { FaGift, FaHandHoldingUsd, FaWallet, FaCalendarAlt, FaReceipt } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/my-giving")({
  head: () => ({ meta: [{ title: "My Giving — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="member">
      <div className="space-y-6">
        <PageHeader
          icon={FaGift}
          title="My Giving"
          subtitle="Your tithes, offerings, and pledges"
          actions={
            <button className="btn-gold inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium">
              <FaHandHoldingUsd /> Give now
            </button>
          }
        />
        <InfoBanner>Connects to <code className="font-mono text-gold">GET /api/contributions/me</code>.</InfoBanner>
        <StatGrid
          stats={[
            { label: "Year to Date", value: "$0", icon: FaWallet, tint: "bg-emerald-500/10 text-emerald-600" },
            { label: "This Month", value: "$0", icon: FaHandHoldingUsd, tint: "bg-gold/10 text-gold" },
            { label: "Pledges", value: "$0", icon: FaGift, tint: "bg-purple-500/10 text-purple-600" },
            { label: "Last Gift", value: "—", icon: FaCalendarAlt, tint: "bg-blue-500/10 text-blue-600" },
          ]}
        />
        <div className="grid lg:grid-cols-2 gap-4">
          <ListCard title="Recent Contributions" items={[]} empty="You haven't given yet." />
          <ListCard
            title="Giving History"
            items={[{ icon: FaReceipt, title: "Download annual statement", subtitle: "PDF for tax purposes" }]}
          />
        </div>
      </div>
    </AppShell>
  ),
});
