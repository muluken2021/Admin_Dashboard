import { useState, useMemo } from "react";
import { TrashBinIcon } from "../../icons";

type TrxStatus = "Succeeded" | "Processing" | "Refunded" | "Failed";

interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  method: string;
  methodIcon: string;
  status: TrxStatus;
  date: string;
}

const initialTransactions: Transaction[] = [
  { id: "TRX-1001", customer: "James Mitchell", email: "j.mitchell@example.com", amount: 3499.00, method: "Visa •••• 4242", methodIcon: "💳", status: "Succeeded", date: "Aug 27, 2026 · 14:22" },
  { id: "TRX-1002", customer: "Sophia Turner", email: "sophia.t@example.com", amount: 379.99, method: "PayPal", methodIcon: "🅿️", status: "Processing", date: "Aug 26, 2026 · 09:15" },
  { id: "TRX-1003", customer: "Liam Anderson", email: "liam.a@example.com", amount: 1199.00, method: "Apple Pay", methodIcon: "🍎", status: "Succeeded", date: "Aug 26, 2026 · 11:45" },
  { id: "TRX-1004", customer: "Emily Clarke", email: "emily.c@example.com", amount: 1849.00, method: "Mastercard •••• 8812", methodIcon: "💳", status: "Succeeded", date: "Aug 25, 2026 · 16:30" },
  { id: "TRX-1005", customer: "Noah Williams", email: "n.williams@example.com", amount: 99.99, method: "Visa •••• 7731", methodIcon: "💳", status: "Refunded", date: "Aug 25, 2026 · 10:00" },
  { id: "TRX-1006", customer: "Ava Johnson", email: "ava.j@example.com", amount: 1099.00, method: "Google Pay", methodIcon: "G", status: "Succeeded", date: "Aug 24, 2026 · 13:52" },
  { id: "TRX-1007", customer: "Ethan Brown", email: "ethan.b@example.com", amount: 2499.00, method: "Bank Transfer", methodIcon: "🏦", status: "Succeeded", date: "Aug 24, 2026 · 08:17" },
  { id: "TRX-1008", customer: "Isabella Davis", email: "i.davis@example.com", amount: 749.99, method: "Apple Pay", methodIcon: "🍎", status: "Processing", date: "Aug 23, 2026 · 19:44" },
  { id: "TRX-1009", customer: "Oliver Martinez", email: "o.martinez@example.com", amount: 349.99, method: "Visa •••• 1122", methodIcon: "💳", status: "Failed", date: "Aug 22, 2026 · 15:30" },
  { id: "TRX-1010", customer: "Charlotte Wilson", email: "c.wilson@example.com", amount: 2199.00, method: "Bank Transfer", methodIcon: "🏦", status: "Succeeded", date: "Aug 21, 2026 · 12:05" },
];

const STATUS_STYLES: Record<TrxStatus, string> = {
  Succeeded: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/20",
  Processing: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:ring-amber-500/20",
  Refunded: "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:ring-sky-500/20",
  Failed: "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:ring-rose-500/20",
};

export default function Payments() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((trx) => {
      const matchesSearch =
        trx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || trx.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, filterStatus]);

  const handleRefund = (id: string) => {
    if (window.confirm("Refund this transaction?")) {
      setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Refunded" as TrxStatus } : t)));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this transaction record?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const totalRevenue = transactions.filter((t) => t.status === "Succeeded").reduce((s, t) => s + t.amount, 0);
  const totalRefunded = transactions.filter((t) => t.status === "Refunded").reduce((s, t) => s + t.amount, 0);
  const totalProcessing = transactions.filter((t) => t.status === "Processing").reduce((s, t) => s + t.amount, 0);
  const successRate = Math.round((transactions.filter((t) => t.status === "Succeeded").length / transactions.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor transactions and manage payment records
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Statement
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Total Received</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            ${(totalRevenue / 1000).toFixed(1)}k
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Processing</p>
          <p className="mt-1 text-2xl font-bold text-amber-700 dark:text-amber-400">
            ${totalProcessing.toFixed(2)}
          </p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-500/20 dark:bg-sky-500/10">
          <p className="text-xs font-medium text-sky-600 dark:text-sky-400">Refunded</p>
          <p className="mt-1 text-2xl font-bold text-sky-700 dark:text-sky-400">
            ${totalRefunded.toFixed(2)}
          </p>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-500/20 dark:bg-violet-500/10">
          <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Success Rate</p>
          <p className="mt-1 text-2xl font-bold text-violet-700 dark:text-violet-400">{successRate}%</p>
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
            placeholder="Search transaction ID or customer..."
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
          <option value="">All Statuses</option>
          <option value="Succeeded">Succeeded</option>
          <option value="Processing">Processing</option>
          <option value="Refunded">Refunded</option>
          <option value="Failed">Failed</option>
        </select>
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-white">{filteredTransactions.length}</span> transactions
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.02]">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Transaction</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Customer</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Method</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Amount</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 text-center">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">{trx.id}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{trx.date}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{trx.customer}</p>
                    <p className="text-xs text-gray-400">{trx.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{trx.methodIcon}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{trx.method}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-gray-800 dark:text-white">
                      ${trx.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[trx.status]}`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      {trx.status === "Succeeded" && (
                        <button
                          onClick={() => handleRefund(trx.id)}
                          className="text-xs font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
                        >
                          Refund
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(trx.id)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-colors"
                      >
                        <TrashBinIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="py-16 text-center text-gray-400 dark:text-gray-600">
              <p className="text-sm font-medium">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
