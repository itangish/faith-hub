import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { readAuthSync } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/_admin")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const a = readAuthSync();
    if (!a.isAuthenticated) throw redirect({ to: "/login" });
    if (!a.isAdmin) throw redirect({ to: "/dashboard" });
  },
  component: () => <Outlet />,
});
