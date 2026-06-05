import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaBoxes, FaTools, FaChair, FaBuilding } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/assets")({
  head: () => ({ meta: [{ title: "Assets — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaBoxes}
        title="Assets & Inventory"
        subtitle="Church property, equipment, furniture, and inventory"
        endpoint="GET /api/assets"
        stats={[
          { label: "Total Assets", value: 0, icon: FaBoxes },
          { label: "Buildings", value: 0, icon: FaBuilding, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Equipment", value: 0, icon: FaTools, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Furniture", value: 0, icon: FaChair, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        sections={[
          { title: "Recently Added", items: [], empty: "No assets recorded." },
          { title: "Maintenance Due", items: [], empty: "Nothing scheduled." },
        ]}
      />
    </AppShell>
  ),
});
