import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { readAuthSync } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;
    if (!readAuthSync().isAuthenticated) {
      throw redirect({ to: "/login", search: { redirect: location.href } as any });
    }
  },
  component: () => <Outlet />,
});
