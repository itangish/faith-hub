import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader, InfoBanner } from "@/components/PageScaffold";
import { FaMapMarkedAlt, FaMapMarkerAlt, FaDirections, FaPhone } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/member/location")({
  head: () => ({ meta: [{ title: "Location — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="member">
      <div className="space-y-6">
        <PageHeader icon={FaMapMarkedAlt} title="Find Us" subtitle="Church campus, service times, and contact" />
        <InfoBanner>Connects to <code className="font-mono text-gold">GET /api/church/info</code>.</InfoBanner>
        <div className="grid lg:grid-cols-3 gap-4">
          <section className="bg-card border border-border rounded-lg p-6 lg:col-span-2 min-h-[280px] hero-sacred grid place-items-center text-white">
            <div className="text-center">
              <FaMapMarkerAlt className="mx-auto w-10 h-10 text-gold mb-2" />
              <p className="font-display text-2xl">KYB Rajepra Main Campus</p>
              <p className="text-white/70 text-sm mt-1">Map preview will load when API returns coordinates.</p>
            </div>
          </section>
          <section className="bg-card border border-border rounded-lg p-6 space-y-3">
            <h3 className="font-display text-xl">Contact</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><FaMapMarkerAlt className="text-gold" /> Address pending</p>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><FaPhone className="text-gold" /> Phone pending</p>
            <button className="btn-gold w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium">
              <FaDirections /> Get directions
            </button>
          </section>
        </div>
      </div>
    </AppShell>
  ),
});
