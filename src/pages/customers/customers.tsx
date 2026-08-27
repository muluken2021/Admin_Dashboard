import { useState, useMemo } from "react";
import { EnvelopeIcon, EyeIcon } from "../../icons";

const customersData = [
  {
    id: "CUST-001",
    name: "James Mitchell",
    email: "j.mitchell@example.com",
    avatar: "https://ui-avatars.com/api/?name=James+Mitchell&background=0B4E4E&color=fff&size=40",
    orders: 24,
    totalSpent: 8940.50,
    status: "VIP",
    location: "New York, US",
    joined: "Jan 12, 2023",
    lastOrder: "Aug 27, 2026",
  },
  {
    id: "CUST-002",
    name: "Sophia Turner",
    email: "sophia.t@example.com",
    avatar: "https://ui-avatars.com/api/?name=Sophia+Turner&background=14a3a3&color=fff&size=40",
    orders: 11,
    totalSpent: 3210.75,
    status: "Regular",
    location: "London, UK",
    joined: "Mar 8, 2023",
    lastOrder: "Aug 26, 2026",
  },
  {
    id: "CUST-003",
    name: "Liam Anderson",
    email: "liam.a@example.com",
    avatar: "https://ui-avatars.com/api/?name=Liam+Anderson&background=7c3aed&color=fff&size=40",
    orders: 2,
    totalSpent: 289.99,
    status: "New",
    location: "Toronto, CA",
    joined: "Aug 20, 2026",
    lastOrder: "Aug 26, 2026",
  },
  {
    id: "CUST-004",
    name: "Emily Clarke",
    email: "emily.c@example.com",
    avatar: "https://ui-avatars.com/api/?name=Emily+Clarke&background=f97316&color=fff&size=40",
    orders: 18,
    totalSpent: 6720.00,
    status: "VIP",
    location: "Sydney, AU",
    joined: "Jun 3, 2022",
    lastOrder: "Aug 25, 2026",
  },
  {
    id: "CUST-005",
    name: "Noah Williams",
    email: "n.williams@example.com",
    avatar: "https://ui-avatars.com/api/?name=Noah+Williams&background=dc2626&color=fff&size=40",
    orders: 5,
    totalSpent: 890.45,
    status: "Regular",
    location: "Chicago, US",
    joined: "Nov 15, 2023",
    lastOrder: "Aug 25, 2026",
  },
  {
    id: "CUST-006",
    name: "Ava Johnson",
    email: "ava.j@example.com",
    avatar: "https://ui-avatars.com/api/?name=Ava+Johnson&background=0891b2&color=fff&size=40",
    orders: 9,
    totalSpent: 2340.60,
    status: "Regular",
    location: "Berlin, DE",
    joined: "Feb 22, 2024",
    lastOrder: "Aug 24, 2026",
  },
  {
    id: "CUST-007",
    name: "Ethan Brown",
    email: "ethan.b@example.com",
    avatar: "https://ui-avatars.com/api/?name=Ethan+Brown&background=059669&color=fff&size=40",
    orders: 31,
    totalSpent: 14580.25,
    status: "VIP",
    location: "San Francisco, US",
    joined: "Sep 4, 2021",
    lastOrder: "Aug 24, 2026",
  },
  {
    id: "CUST-008",
    name: "Isabella Davis",
    email: "i.davis@example.com",
    avatar: "https://ui-avatars.com/api/?name=Isabella+Davis&background=d97706&color=fff&size=40",
    orders: 1,
    totalSpent: 749.99,
    status: "New",
    location: "Paris, FR",
    joined: "Aug 22, 2026",
    lastOrder: "Aug 23, 2026",
  },
  {
    id: "CUST-009",
    name: "Oliver Martinez",
    email: "o.martinez@example.com",
    avatar: "https://ui-avatars.com/api/?name=Oliver+Martinez&background=7c3aed&color=fff&size=40",
    orders: 7,
    totalSpent: 1490.80,
    status: "Regular",
    location: "Madrid, ES",
    joined: "Apr 10, 2024",
    lastOrder: "Aug 22, 2026",
  },
  {
    id: "CUST-010",
    name: "Charlotte Wilson",
    email: "c.wilson@example.com",
    avatar: "https://ui-avatars.com/api/?name=Charlotte+Wilson&background=be185d&color=fff&size=40",
    orders: 14,
    totalSpent: 4230.00,
    status: "VIP",
    location: "Amsterdam, NL",
    joined: "Jul 19, 2023",
    lastOrder: "Aug 21, 2026",
  },
];

const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  VIP: {
    badge: "bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-500/15 dark:text-violet-400 dark:ring-violet-500/20",
    dot: "bg-violet-500",
  },
  Regular: {
    badge: "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:ring-sky-500/20",
    dot: "bg-sky-500",
  },
  New: {
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/20",
    dot: "bg-emerald-500",
  },
};

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredCustomers = useMemo(() => {
    return customersData.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || c.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const totalRevenue = customersData.reduce((sum, c) => sum + c.totalSpent, 0);
  const vipCount = customersData.filter((c) => c.status === "VIP").length;
  const avgSpend = totalRevenue / customersData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {customersData.length} registered customers
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Customer
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Customers</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{customersData.length}</p>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-500/20 dark:bg-violet-500/10">
          <p className="text-xs font-medium text-violet-600 dark:text-violet-400">VIP Customers</p>
          <p className="mt-1 text-2xl font-bold text-violet-700 dark:text-violet-400">{vipCount}</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Total Revenue</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            ${(totalRevenue / 1000).toFixed(1)}k
          </p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-500/20 dark:bg-sky-500/10">
          <p className="text-xs font-medium text-sky-600 dark:text-sky-400">Avg. Spend</p>
          <p className="mt-1 text-2xl font-bold text-sky-700 dark:text-sky-400">
            ${avgSpend.toFixed(0)}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Customers</option>
          <option value="VIP">VIP</option>
          <option value="Regular">Regular</option>
          <option value="New">New</option>
        </select>
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-white">{filteredCustomers.length}</span> results
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.02]">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Customer</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Location</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Orders</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Total Spent</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Last Order</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
                        alt={customer.name}
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{customer.name}</p>
                        <p className="text-xs text-gray-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[customer.status]?.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[customer.status]?.dot}`}></span>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{customer.location}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{customer.orders}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-gray-800 dark:text-white">
                      ${customer.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{customer.lastOrder}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-500/10 dark:hover:text-brand-400 transition-colors"
                        title="Send email"
                      >
                        <EnvelopeIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
                        title="View profile"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
