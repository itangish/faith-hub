import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaBoxes, FaTools, FaChair, FaBuilding } from "react-icons/fa";

const ASSETS = [
  { name: "Main Sanctuary Building", category: "Building", value: "$420,000", purchased: "2010", condition: "Excellent", location: "Plot 12, Kicukiro" },
  { name: "Yamaha Digital Mixer 32CH", category: "Equipment", value: "$2,800", purchased: "2022", condition: "Good", location: "Sound Booth" },
  { name: "Sanctuary Chairs (Set of 300)", category: "Furniture", value: "$9,000", purchased: "2019", condition: "Good", location: "Main Sanctuary" },
  { name: "Toyota Hiace — Church Van", category: "Vehicle", value: "$18,000", purchased: "2021", condition: "Good", location: "Parking Lot" },
  { name: "Projector & Screen Bundle", category: "Equipment", value: "$1,500", purchased: "2023", condition: "Excellent", location: "Main Sanctuary" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/assets")({
  head: () => ({ meta: [{ title: "Assets — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaBoxes}
        title="Assets & Inventory"
        subtitle="Church property, equipment, furniture, and inventory"
        endpoint="GET /api/assets"
        addLabel="Add Asset"
        stats={[
          { label: "Total Assets", value: ASSETS.length, icon: FaBoxes },
          { label: "Buildings", value: 1, icon: FaBuilding, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Equipment", value: 2, icon: FaTools, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Furniture", value: 1, icon: FaChair, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        table={{
          title: "Asset Register",
          columns: [
            { key: "name", label: "Asset" }, { key: "category", label: "Category" },
            { key: "value", label: "Value" }, { key: "purchased", label: "Acquired" },
            { key: "condition", label: "Condition" }, { key: "location", label: "Location" },
          ],
          rows: ASSETS.map(a => ({ ...a, condition: <Badge tone={a.condition === "Excellent" ? "success" : "info"}>{a.condition}</Badge> })),
        }}
      />
    </AppShell>
  ),
});
