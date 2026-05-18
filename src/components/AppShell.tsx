import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import type { IconType } from "react-icons";
import {
  FaChurch, FaTachometerAlt, FaUsers, FaUserCheck, FaHandHoldingUsd, FaReceipt,
  FaCalendarAlt, FaBullhorn, FaChartBar, FaCommentDots, FaPhotoVideo, FaBoxes,
  FaUserTie, FaUserShield, FaCog, FaPrayingHands, FaRobot, FaBook, FaUserGraduate,
  FaMusic, FaSignOutAlt, FaUserCircle, FaHome, FaBell, FaMapMarkedAlt, FaGift,
} from "react-icons/fa";

type NavItem = { to: string; label: string; icon: IconType };

const ADMIN_NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Overview",
    items: [
      { to: "/admin", label: "Dashboard", icon: FaTachometerAlt },
      { to: "/admin/user-approvals", label: "User Approvals", icon: FaUserCheck },
    ],
  },
  {
    section: "People",
    items: [
      { to: "/admin/members", label: "Members", icon: FaUsers },
      { to: "/admin/groups", label: "Groups", icon: FaUsers },
      { to: "/admin/staff", label: "Staff & Payroll", icon: FaUserTie },
      { to: "/admin/leaders", label: "Leaders", icon: FaUserShield },
      { to: "/admin/teachers", label: "Teachers", icon: FaUserGraduate },
      { to: "/admin/committee", label: "Committees", icon: FaUsers },
      { to: "/admin/worship-team", label: "Worship Teams", icon: FaMusic },
    ],
  },
  {
    section: "Engagement",
    items: [
      { to: "/admin/attendance", label: "Attendance", icon: FaUserCheck },
      { to: "/admin/events", label: "Events", icon: FaCalendarAlt },
      { to: "/admin/announcements", label: "Announcements", icon: FaBullhorn },
      { to: "/admin/communication", label: "Communication", icon: FaCommentDots },
    ],
  },
  {
    section: "Finance",
    items: [
      { to: "/admin/contributions", label: "Contributions", icon: FaHandHoldingUsd },
      { to: "/admin/expenses", label: "Expenses", icon: FaReceipt },
      { to: "/admin/online-services", label: "Online Services", icon: FaPrayingHands },
    ],
  },
  {
    section: "Content",
    items: [
      { to: "/admin/media", label: "Media", icon: FaPhotoVideo },
      { to: "/admin/assets", label: "Assets", icon: FaBoxes },
      { to: "/admin/books", label: "Books", icon: FaBook },
    ],
  },
  {
    section: "System",
    items: [
      { to: "/admin/reports", label: "Reports", icon: FaChartBar },
      { to: "/admin/ai-assistant", label: "AI Assistant", icon: FaRobot },
      { to: "/admin/roles", label: "Roles", icon: FaUserShield },
      { to: "/admin/settings", label: "Settings", icon: FaCog },
    ],
  },
];

const MEMBER_NAV: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: FaHome },
  { to: "/profile", label: "My Profile", icon: FaUserCircle },
  { to: "/my-giving", label: "My Giving", icon: FaGift },
  { to: "/member/events", label: "Events", icon: FaCalendarAlt },
  { to: "/member/announcements", label: "Announcements", icon: FaBullhorn },
  { to: "/member/media", label: "Media", icon: FaPhotoVideo },
  { to: "/member/notifications", label: "Notifications", icon: FaBell },
  { to: "/member/location", label: "Location", icon: FaMapMarkedAlt },
  { to: "/member/staff", label: "Staff Directory", icon: FaUserTie },
  { to: "/member/books", label: "Books", icon: FaBook },
];

export function AppShell({ variant }: { variant: "admin" | "member" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSignOut = () => { logout(); navigate({ to: "/login" }); };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
        <Link to="/" className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
          <span className="grid place-items-center w-9 h-9 rounded-md bg-sidebar-accent text-gold">
            <FaChurch className="w-5 h-5" />
          </span>
          <span className="font-display text-lg">KYB <span className="text-gold">Rajepra</span></span>
        </Link>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {variant === "admin" ? (
            ADMIN_NAV.map((s) => (
              <div key={s.section}>
                <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                  {s.section}
                </p>
                <ul className="space-y-0.5">
                  {s.items.map((it) => <NavLink key={it.to} item={it} active={location.pathname === it.to} />)}
                </ul>
              </div>
            ))
          ) : (
            <ul className="space-y-0.5">
              {MEMBER_NAV.map((it) => <NavLink key={it.to} item={it} active={location.pathname === it.to} />)}
            </ul>
          )}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-sidebar-accent transition"
          >
            <FaSignOutAlt /> Sign out
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div>
            <p className="text-xs text-muted-foreground">
              {variant === "admin" ? "Administration" : "Member Portal"}
            </p>
            <h1 className="font-display text-lg leading-none">Welcome, {user?.name || "Friend"}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-md hover:bg-accent">
              <FaBell className="text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-9 h-9 rounded-full hero-sacred grid place-items-center text-gold font-semibold">
                {(user?.name || user?.email || "?").charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-medium">{user?.name || user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role || "member"}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto"><Outlet /></main>
      </div>
    </div>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        to={item.to}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
          active
            ? "bg-gold text-gold-foreground font-medium shadow-sm"
            : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        }`}
      >
        <Icon className="w-4 h-4 shrink-0" />
        <span className="truncate">{item.label}</span>
      </Link>
    </li>
  );
}
