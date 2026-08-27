import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Link } from "react-router";

interface Order {
  id: string;
  orderId: string;
  customer: string;
  avatar: string;
  product: string;
  amount: string;
  date: string;
  status: "Pending" | "Cancelled" | "Shipped";
}

const tableData: Order[] = [
  {
    id: "1",
    orderId: "#ORD-7731",
    customer: "James Mitchell",
    avatar: "/images/user/user-01.jpg",
    product: 'MacBook Pro 16"',
    amount: "$3,499.00",
    date: "Aug 27, 2026",
    status: "Shipped",
  },
  {
    id: "2",
    orderId: "#ORD-7732",
    customer: "Sophia Turner",
    avatar: "/images/user/user-02.jpg",
    product: "Sony WH-1000XM5",
    amount: "$379.99",
    date: "Aug 26, 2026",
    status: "Shipped",
  },
  {
    id: "3",
    orderId: "#ORD-7733",
    customer: "Liam Anderson",
    avatar: "/images/user/user-03.jpg",
    product: "iPhone 15 Pro Max",
    amount: "$1,199.00",
    date: "Aug 26, 2026",
    status: "Pending",
  },
  {
    id: "4",
    orderId: "#ORD-7734",
    customer: "Emily Clarke",
    avatar: "/images/user/user-04.jpg",
    product: "Samsung 4K OLED TV",
    amount: "$1,849.00",
    date: "Aug 25, 2026",
    status: "Shipped",
  },
  {
    id: "5",
    orderId: "#ORD-7735",
    customer: "Noah Williams",
    avatar: "/images/user/user-05.jpg",
    product: "Logitech MX Master 3",
    amount: "$99.99",
    date: "Aug 25, 2026",
    status: "Cancelled",
  },
  {
    id: "6",
    orderId: "#ORD-7736",
    customer: "Ava Johnson",
    avatar: "/images/user/user-06.jpg",
    product: "iPad Pro 12.9",
    amount: "$1,099.00",
    date: "Aug 24, 2026",
    status: "Shipped",
  },
  {
    id: "7",
    orderId: "#ORD-7737",
    customer: "Ethan Brown",
    avatar: "/images/user/user-07.jpg",
    product: "Canon EOS R6 Mark II",
    amount: "$2,499.00",
    date: "Aug 24, 2026",
    status: "Shipped",
  },
];

const statusBadgeColor = (status: Order["status"]) => {
  switch (status) {
    case "Shipped": return "success";
    case "Shipped": return "info";
    case "Pending": return "warning";
    case "Cancelled": return "error";
  }
};

export default function RecentOrders() {
  const [filter, setFilter] = useState<string>("All");

  const filteredData =
    filter === "All" ? tableData : tableData.filter((item) => item.status === filter);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Latest customer transactions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="All">All Status</option>
            <option value="Shipped">Shipped</option>
            <option value="Shipped">Shipped</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <Link to="/orders">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
              View All
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-xs uppercase tracking-wide dark:text-gray-400">
                Order
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-xs uppercase tracking-wide dark:text-gray-400">
                Customer
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-xs uppercase tracking-wide dark:text-gray-400">
                Date
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-xs uppercase tracking-wide dark:text-gray-400">
                Amount
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-xs uppercase tracking-wide dark:text-gray-400">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredData.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <TableCell className="py-3.5">
                  <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {order.orderId}
                  </span>
                  <p className="text-xs text-gray-400 mt-0.5">{order.product}</p>
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-100 dark:border-gray-800 flex-shrink-0">
                      <img
                        src={order.avatar}
                        className="h-full w-full object-cover"
                        alt={order.customer}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(order.customer)}&background=0B4E4E&color=fff&size=32`;
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {order.customer}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 text-sm text-gray-500 dark:text-gray-400">
                  {order.date}
                </TableCell>
                <TableCell className="py-3.5 text-sm font-semibold text-gray-800 dark:text-white/90">
                  {order.amount}
                </TableCell>
                <TableCell className="py-3.5">
                  <Badge size="sm" color={statusBadgeColor(order.status) as any}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
