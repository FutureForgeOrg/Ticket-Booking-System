import React, { useEffect, useState } from "react";
import { movieApi } from "../services/movie.service";
import { cinemaApi } from "../services/cinema.service";
import { fetchTickets } from "../services/ticket.service";
import { getRevenueStatsAdmin } from "../services/payment.service";

// ── Mocked data for fallbacks ───────────────────────────────
const defaultWeeklyRevenue = [
  { day: "Mon", amount: 6200  },
  { day: "Tue", amount: 4800  },
  { day: "Wed", amount: 7100  },
  { day: "Thu", amount: 5400  },
  { day: "Fri", amount: 9800  },
  { day: "Sat", amount: 12400 },
  { day: "Sun", amount: 11200 },
];

// ── Helpers ──────────────────────────────────────────────────
const accentMap = {
  indigo:  { bg: "bg-indigo-50 dark:bg-primary-soft",  text: "text-indigo-600 dark:text-primary",  border: "border-indigo-100 dark:border-primary/20" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-100 dark:border-emerald-500/20" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-500/10",   text: "text-amber-600 dark:text-amber-400",   border: "border-amber-100 dark:border-amber-500/20"  },
  sky:     { bg: "bg-sky-50 dark:bg-sky-500/10",     text: "text-sky-600 dark:text-sky-400",     border: "border-sky-100 dark:border-sky-500/20"    },
};

const statusStyles = {
  CONFIRMED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  CANCELLED: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  PENDING:   "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  RELEASED:  "bg-slate-100 text-slate-600 dark:bg-surface dark:text-text-secondary",
  UPCOMING:  "bg-indigo-100 text-indigo-600 dark:bg-primary-soft dark:text-primary",
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Cancelled: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  Pending:   "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Released:  "bg-slate-100 text-slate-600 dark:bg-surface dark:text-text-secondary",
  Upcoming:  "bg-indigo-100 text-indigo-600 dark:bg-primary-soft dark:text-primary",
};

// ── Sub-components ───────────────────────────────────────────
function StatCard({ label, value, sub, up, icon, accent }) {
  const a = accentMap[accent] || accentMap.indigo;
  return (
    <div className={`rounded-xl border ${a.border} ${a.bg} p-5 flex items-start gap-4`}>
      <div className={`text-xl w-10 h-10 flex items-center justify-center rounded-lg bg-surface shadow-sm border ${a.border} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${a.text}`}>{value}</p>
        {sub && (
          <p className={`text-xs mt-1 ${up === true ? "text-success" : up === false ? "text-danger" : "text-text-muted"}`}>
            {up === true ? "↑ " : up === false ? "↓ " : ""}{sub}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionCard({ title, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-border bg-surface shadow-sm overflow-hidden ${className}`}>
      <div className="px-5 py-3.5 border-b border-border">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────
function Dashboard() {
  const [data, setData] = useState({
    movies: [],
    cinemas: [],
    tickets: [],
    totalBookings: 0,
    totalMovies: 0,
    revenue: 0,
    loading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [moviesRes, cinemasRes, ticketsRes, revenueRes] = await Promise.all([
          movieApi.getAllMovies({ limit: 5 }), // Fetch recent 5 for "Recent Movies"
          cinemaApi.getAllCinemas(),
          fetchTickets(), 
          getRevenueStatsAdmin().catch(() => ({ revenue: { totalRevenue: 0 } }))
        ]);

        setData({
          movies: moviesRes?.data?.data || [],
          totalMovies: moviesRes?.data?.totalMovies || 0,
          cinemas: cinemasRes?.data?.data || [],
          tickets: ticketsRes?.tickets?.slice(0, 5) || [], // only show recent 5
          totalBookings: ticketsRes?.total || 0,
          revenue: revenueRes?.revenue?.totalRevenue || 0,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };
    loadData();
  }, []);

  const stats = [
    { label: "Total Revenue",    value: `₹${data.revenue.toLocaleString()}`, sub: "from payments",  up: true, icon: "💰", accent: "indigo"  },
    { label: "Total Bookings",   value: data.totalBookings.toLocaleString(),   sub: "all time tickets",   up: true, icon: "🎟️", accent: "emerald" },
    { label: "Active Movies",    value: data.totalMovies.toString(),      sub: "currently in DB", up: null, icon: "🎬", accent: "amber"   },
    { label: "Registered Users", value: "12,540",  sub: "+5% this month (Mock)",   up: true, icon: "👤", accent: "sky"     },
  ];

  const maxRevenue = Math.max(...defaultWeeklyRevenue.map((d) => d.amount));

  if (data.loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-text-muted">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-muted mt-0.5">Welcome back — here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Revenue chart + Top Movies */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

        <SectionCard title="Weekly Revenue (Mock)" className="xl:col-span-3">
          <div className="flex items-end gap-2 h-40">
            {defaultWeeklyRevenue.map((d) => {
              const pct = Math.round((d.amount / maxRevenue) * 100);
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(d.amount / 1000).toFixed(1)}k
                  </span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-indigo-300 group-hover:from-indigo-600 group-hover:to-indigo-400 transition-colors"
                    style={{ height: `${pct}%` }}
                  />
                  <span className="text-[10px] font-medium text-text-secondary">{d.day}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Recent Movies" className="xl:col-span-2">
          <div className="space-y-3">
            {data.movies.length > 0 ? data.movies.map((m, i) => (
              <div key={m._id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-text-muted w-4 shrink-0">{i + 1}</span>
                {m.posterUrl && (
                  <img src={m.posterUrl} alt={m.title} className="w-8 h-8 rounded object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{m.title}</p>
                  <p className="text-xs text-text-secondary">{m.runtime} mins · {m.genres?.join(", ")}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusStyles[m.status] || statusStyles.Released}`}>
                  {m.status || "Released"}
                </span>
              </div>
            )) : <p className="text-sm text-text-muted">No movies found.</p>}
          </div>
        </SectionCard>

      </div>

      {/* Recent Bookings + Cinemas */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

        <SectionCard title="Recent Bookings" className="xl:col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {["ID", "User", "Movie", "Seats", "Amount", "Status"].map((h) => (
                    <th key={h} className="pb-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.tickets.length > 0 ? data.tickets.map((b) => (
                  <tr key={b._id} className="hover:bg-canvas transition-colors">
                    <td className="py-2.5 pr-4 font-mono text-xs text-text-muted">#{b._id.slice(-6).toUpperCase()}</td>
                    <td className="py-2.5 pr-4 font-medium text-text-primary whitespace-nowrap">{b.user?.name || "Unknown"}</td>
                    <td className="py-2.5 pr-4 text-text-secondary truncate max-w-[110px]">{b.show?.movie?.title || "N/A"}</td>
                    <td className="py-2.5 pr-4 text-text-secondary">{b.seats?.length || 0}</td>
                    <td className="py-2.5 pr-4 font-medium text-text-primary">₹{b.totalPrice}</td>
                    <td className="py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[b.status] || statusStyles.Confirmed}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-text-muted text-sm">No recent bookings.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Cinemas" className="xl:col-span-2">
          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-2">
            {data.cinemas.length > 0 ? data.cinemas.map((c) => (
              <div key={c._id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-canvas/50 hover:bg-surface transition-colors">
                <div className="w-8 h-8 rounded-md bg-surface border border-border flex items-center justify-center text-sm shadow-sm shrink-0">
                  🏛️
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{c.name}</p>
                  <p className="text-xs text-text-muted">{c.location?.city} · {c.screens?.length || 0} screens</p>
                </div>
              </div>
            )) : <p className="text-sm text-text-muted">No cinemas found.</p>}
          </div>
        </SectionCard>

      </div>
    </div>
  );
}

export default Dashboard;