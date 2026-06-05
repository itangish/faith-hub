import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader, StatGrid, ListCard, InfoBanner } from "@/components/PageScaffold";
import { FaPhotoVideo, FaImage, FaVideo, FaMusic } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/member/media")({
  head: () => ({ meta: [{ title: "Media — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="member">
      <div className="space-y-6">
        <PageHeader icon={FaPhotoVideo} title="Media" subtitle="Sermons, photos, music, and videos" />
        <InfoBanner>Connects to <code className="font-mono text-gold">GET /api/media</code>.</InfoBanner>
        <StatGrid
          stats={[
            { label: "Sermons", value: 0, icon: FaVideo, tint: "bg-rose-500/10 text-rose-600" },
            { label: "Photos", value: 0, icon: FaImage, tint: "bg-blue-500/10 text-blue-600" },
            { label: "Music", value: 0, icon: FaMusic, tint: "bg-purple-500/10 text-purple-600" },
            { label: "All Files", value: 0, icon: FaPhotoVideo, tint: "bg-gold/10 text-gold" },
          ]}
        />
        <ListCard title="Recently Added" items={[]} empty="No media to display." />
      </div>
    </AppShell>
  ),
});
