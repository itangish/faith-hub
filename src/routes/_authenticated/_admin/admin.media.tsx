import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaPhotoVideo, FaImage, FaVideo, FaMusic } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/media")({
  head: () => ({ meta: [{ title: "Media Library — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaPhotoVideo}
        title="Media Library"
        subtitle="Sermons, photos, videos, and audio recordings"
        endpoint="GET /api/media"
        stats={[
          { label: "Total Files", value: 0, icon: FaPhotoVideo },
          { label: "Photos", value: 0, icon: FaImage, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Videos", value: 0, icon: FaVideo, tint: "bg-rose-500/10 text-rose-600" },
          { label: "Audio", value: 0, icon: FaMusic, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        sections={[
          { title: "Recently Uploaded", items: [], empty: "No media uploaded." },
          { title: "Albums", items: [], empty: "No albums created." },
        ]}
      />
    </AppShell>
  ),
});
