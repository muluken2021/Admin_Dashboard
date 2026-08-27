import { useState, useMemo } from "react";
import ordersData from "../../data/orders.json";
import { EyeIcon, TrashBinIcon } from "../../icons";
import { Modal } from "../../components/ui/modal/index";

type OrderStatus = "Delivered" | "Shipped" | "Pending" | "Cancelled";

interface Order {
  orderId: string;
  customer: { name: string; avatar: string; email: string };
  product: string;
  amount: number;
  date: string;
  status: OrderStatus;
  payment: string;
}

const STATUS_STYLES: Record<OrderStatus, { badge: string; dot: string }> = {
  Delivered: {
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/20",
    dot: "bg-emerald-500",
  },
  Shipped: {
    badge: "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:ring-sky-500/20",
    dot: "bg-sky-500",
  },
  Pending: {
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:ring-amber-500/20",
    dot: "bg-amber-500",
  },
  Cancelled: {
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:ring-rose-500/20",
    dot: "bg-rose-500",
  },
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(ordersData as Order[]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || order.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, filterStatus]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o)));
    if (selectedOrder?.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((o) => o.orderId !== orderId));
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.amount, 0);

  const statusCounts = orders.reduce(
    (acc, o) => ({ ...acc, [o.status]: (acc[o.status as keyof typeof acc] || 0) + 1 }),
    { Delivered: 0, Shipped: 0, Pending: 0, Cancelled: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track all customer orders
          </p>
        </div>
        <button
          onClick={() => {
            const csv = [
              ["Order ID", "Customer", "Product", "Amount", "Date", "Status"],
              ...orders.map((o) => [o.orderId, o.customer.name, o.product, `$${o.amount.toFixed(2)}`, o.date, o.status]),
            ]
              .map((r) => r.join(","))
              .join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "orders.csv";
            a.click();
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(["Delivered", "Shipped", "Pending", "Cancelled"] as OrderStatus[]).map((status) => (
          <div
            key={status}
            onClick={() => setFilterStatus(filterStatus === status ? "" : status)}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              filterStatus === status
                ? "border-brand-400 bg-brand-50 dark:border-brand-500 dark:bg-brand-500/10"
                : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-block h-2 w-2 rounded-full ${STATUS_STYLES[status].dot}`}></span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{status}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {statusCounts[status]}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search order ID, customer, or product..."
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
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-white">{filteredOrders.length}</span> orders •{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>{" "}
          delivered
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.02]">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Order</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Customer</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Product</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Amount</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Date</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 text-center">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredOrders.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                      {order.orderId}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.customer.avatar}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
                        alt={order.customer.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(order.customer.name)}&background=0B4E4E&color=fff`;
                        }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{order.customer.name}</p>
                        <p className="text-xs text-gray-400">{order.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 max-w-[180px] truncate">{order.product}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-gray-800 dark:text-white">
                      ${order.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{order.date}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[order.status].badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[order.status].dot}`}></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-brand-600 dark:hover:bg-gray-800 dark:hover:text-brand-400 transition-colors"
                        title="View order"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.orderId)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-colors"
                        title="Delete order"
                      >
                        <TrashBinIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="py-16 text-center text-gray-400 dark:text-gray-600">
              <svg className="mx-auto mb-3 h-12 w-12 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm font-medium">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[580px] p-0">
        {selectedOrder && (
          <div className="overflow-hidden rounded-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedOrder.orderId}</h3>
                  <p className="mt-0.5 text-sm text-brand-200">{selectedOrder.date}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${STATUS_STYLES[selectedOrder.status].badge}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-5 bg-white dark:bg-gray-900">
              {/* Customer Info */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <img
                  src={selectedOrder.customer.avatar}
                  className="h-12 w-12 rounded-full object-cover"
                  alt={selectedOrder.customer.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedOrder.customer.name)}&background=0B4E4E&color=fff`;
                  }}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedOrder.customer.email}</p>
                </div>
              </div>

              {/* Order Item */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">Order Item</h4>
                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedOrder.product}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">${selectedOrder.amount.toFixed(2)}</p>
                </div>
              </div>

              {/* Payment Status */}
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">Payment</span>
                <span className={`text-sm font-semibold ${selectedOrder.payment === "Paid" ? "text-emerald-600 dark:text-emerald-400" : selectedOrder.payment === "Refunded" ? "text-sky-600 dark:text-sky-400" : "text-amber-600 dark:text-amber-400"}`}>
                  {selectedOrder.payment}
                </span>
              </div>

              {/* Update Status */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {(["Pending", "Shipped", "Delivered", "Cancelled"] as OrderStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateOrderStatus(selectedOrder.orderId, s)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                        selectedOrder.status === s
                          ? "bg-brand-500 text-white shadow-sm"
                          : "border border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
