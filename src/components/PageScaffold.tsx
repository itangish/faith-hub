import type { IconType } from "react-icons";
import type { ReactNode } from "react";
import { FaPlus, FaDownload, FaSearch, FaFilter } from "react-icons/fa";

export type Stat = { label: string; value: string | number; icon: IconType; tint?: string };
export type ListItem = { icon: IconType; title: string; subtitle?: string; meta?: string; tint?: string };

export function PageHeader({
  icon: Icon,
  title,
  subtitle,
  actions,
}: {
  icon: IconType;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <span className="w-12 h-12 rounded-md hero-sacred grid place-items-center text-gold">
          <Icon className="w-5 h-5" />
        </span>
        <div>
          <h2 className="font-display text-2xl leading-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </header>
  );
}

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <span className={`w-9 h-9 rounded-md grid place-items-center ${s.tint || "bg-gold/10 text-gold"}`}>
              <s.icon className="w-4 h-4" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-display">{s.value}</p>
        </div>
      ))}
    </section>
  );
}

export function Toolbar({ placeholder }: { placeholder?: string }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="relative flex-1 min-w-[220px]">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
        <input
          placeholder={placeholder || "Search..."}
          className="w-full pl-9 pr-3 py-2 rounded-md bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm hover:bg-accent">
        <FaFilter className="w-3.5 h-3.5" /> Filter
      </button>
      <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm hover:bg-accent">
        <FaDownload className="w-3.5 h-3.5" /> Export
      </button>
    </div>
  );
}

export function AddButton({ label = "New" }: { label?: string }) {
  return (
    <button className="btn-gold inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium">
      <FaPlus className="w-3.5 h-3.5" /> {label}
    </button>
  );
}

export function ListCard({ title, items, empty }: { title: string; items: ListItem[]; empty?: string }) {
  return (
    <section className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-display text-xl mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">{empty || "No records yet."}</p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((it, i) => (
            <li key={i} className="flex items-center gap-3 py-3 text-sm">
              <span className={`w-9 h-9 rounded-md grid place-items-center shrink-0 ${it.tint || "bg-accent text-gold"}`}>
                <it.icon className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{it.title}</p>
                {it.subtitle && <p className="text-xs text-muted-foreground truncate">{it.subtitle}</p>}
              </div>
              {it.meta && <span className="text-xs text-muted-foreground shrink-0">{it.meta}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function InfoBanner({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md bg-gold/5 border border-gold/20 px-4 py-3 text-sm text-muted-foreground">
      {children}
    </div>
  );
}

export function AdminPage({
  icon, title, subtitle, stats, sections, endpoint,
}: {
  icon: IconType;
  title: string;
  subtitle: string;
  stats: Stat[];
  sections: { title: string; items: ListItem[]; empty?: string }[];
  endpoint?: string;
}) {
  return (
    <div className="space-y-6">
      <PageHeader icon={icon} title={title} subtitle={subtitle} actions={<><AddButton /></>} />
      {endpoint && (
        <InfoBanner>
          Data source: <code className="font-mono text-gold">{endpoint}</code>. Connect your MongoDB API via{" "}
          <code className="font-mono">VITE_API_URL</code>.
        </InfoBanner>
      )}
      <StatGrid stats={stats} />
      <Toolbar />
      <div className="grid lg:grid-cols-2 gap-4">
        {sections.map((s) => (
          <ListCard key={s.title} title={s.title} items={s.items} empty={s.empty} />
        ))}
      </div>
    </div>
  );
}
