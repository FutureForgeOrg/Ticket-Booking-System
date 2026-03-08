import React from "react";

// ── Mocked data ──────────────────────────────────────────────
const stats = [
  { label: "Total Revenue",    value: "$48,320", sub: "+12% this month",  up: true, icon: "💰", accent: "indigo"  },
  { label: "Total Bookings",   value: "3,841",   sub: "+8% this month",   up: true, icon: "🎟️", accent: "emerald" },
  { label: "Active Movies",    value: "24",      sub: "6 releasing soon", up: null, icon: "🎬", accent: "amber"   },
  { label: "Registered Users", value: "12,540",  sub: "+5% this month",   up: true, icon: "👤", accent: "sky"     },
];

const recentBookings = [
  { id: "#BK-0091", user: "Alex Morgan",  movie: "Interstellar",   seats: 2, amount: "$28.00", status: "Confirmed" },
  { id: "#BK-0090", user: "Jamie Lee",    movie: "Dune: Part Two", seats: 4, amount: "$56.00", status: "Confirmed" },
  { id: "#BK-0089", user: "Sam Wilson",   movie: "Oppenheimer",    seats: 1, amount: "$12.00", status: "Cancelled" },
  { id: "#BK-0088", user: "Priya Sharma", movie: "The Batman",     seats: 3, amount: "$42.00", status: "Confirmed" },
  { id: "#BK-0087", user: "Chris Evans",  movie: "Interstellar",   seats: 2, amount: "$28.00", status: "Pending"   },
];

const topMovies = [
  { title: "Interstellar",   bookings: 542, revenue: "$7,588", status: "Released" },
  { title: "Dune: Part Two", bookings: 480, revenue: "$6,720", status: "Released" },
  { title: "Oppenheimer",    bookings: 391, revenue: "$4,692", status: "Released" },
  { title: "The Batman",     bookings: 310, revenue: "$4,340", status: "Released" },
  { title: "Avatar 3",       bookings: 0,   revenue: "—",      status: "Upcoming" },
];

const cinemas = [
  { name: "Cinemax Downtown", city: "Mumbai",    screens: 6, capacity: 1200 },
  { name: "StarPlex Central", city: "Delhi",     screens: 4, capacity: 800  },
  { name: "Cinepolis West",   city: "Bangalore", screens: 5, capacity: 1000 },
  { name: "INOX Horizon",     city: "Chennai",   screens: 3, capacity: 600  },
];

const weeklyRevenue = [
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
  indigo:  { bg: "bg-indigo-50",  text: "text-indigo-600",  border: "border-indigo-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-100"  },
  sky:     { bg: "bg-sky-50",     text: "text-sky-600",     border: "border-sky-100"    },
};

const statusStyles = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-600",
  Pending:   "bg-amber-100 text-amber-700",
  Released:  "bg-slate-100 text-slate-600",
  Upcoming:  "bg-indigo-100 text-indigo-600",
};

const maxRevenue = Math.max(...weeklyRevenue.map((d) => d.amount));

// ── Sub-components ───────────────────────────────────────────
function StatCard({ label, value, sub, up, icon, accent }) {
  const a = accentMap[accent];
  return (
    <div className={`rounded-xl border ${a.border} ${a.bg} p-5 flex items-start gap-4`}>
      <div className={`text-xl w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm border ${a.border} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${a.text}`}>{value}</p>
        {sub && (
          <p className={`text-xs mt-1 ${up === true ? "text-emerald-600" : up === false ? "text-red-500" : "text-slate-400"}`}>
            {up === true ? "↑ " : up === false ? "↓ " : ""}{sub}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionCard({ title, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden ${className}`}>
      <div className="px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">Welcome back — here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Revenue chart + Top Movies */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

        <SectionCard title="Weekly Revenue" className="xl:col-span-3">
          <div className="flex items-end gap-2 h-40">
            {weeklyRevenue.map((d) => {
              const pct = Math.round((d.amount / maxRevenue) * 100);
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ${(d.amount / 1000).toFixed(1)}k
                  </span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-indigo-300 group-hover:from-indigo-600 group-hover:to-indigo-400 transition-colors"
                    style={{ height: `${pct}%` }}
                  />
                  <span className="text-[10px] font-medium text-slate-500">{d.day}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Top Movies" className="xl:col-span-2">
          <div className="space-y-3">
            {topMovies.map((m, i) => (
              <div key={m.title} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300 w-4 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{m.title}</p>
                  <p className="text-xs text-slate-400">{m.bookings} bookings · {m.revenue}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusStyles[m.status]}`}>
                  {m.status}
                </span>
              </div>
            ))}
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
                    <th key={h} className="pb-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 pr-4 font-mono text-xs text-slate-400">{b.id}</td>
                    <td className="py-2.5 pr-4 font-medium text-slate-700 whitespace-nowrap">{b.user}</td>
                    <td className="py-2.5 pr-4 text-slate-500 truncate max-w-[110px]">{b.movie}</td>
                    <td className="py-2.5 pr-4 text-slate-500">{b.seats}</td>
                    <td className="py-2.5 pr-4 font-medium text-slate-700">{b.amount}</td>
                    <td className="py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Cinemas" className="xl:col-span-2">
          <div className="space-y-2.5">
            {cinemas.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/60 transition-colors">
                <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-sm shadow-sm shrink-0">
                  🏛️
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.city} · {c.screens} screens · {c.capacity} seats</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

      </div>
    </div>
  );
}

export default Dashboard;