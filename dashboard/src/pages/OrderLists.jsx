import React from 'react';
import { Filter, Download } from 'lucide-react';

const OrderLists = () => {
  const orders = [
    { id: '#5561', customer: 'Cody Fisher', date: '12.09.2023', total: '$120.50', method: 'Credit Card', status: 'Completed' },
    { id: '#5562', customer: 'Jane Cooper', date: '13.09.2023', total: '$450.00', method: 'PayPal', status: 'Processing' },
    { id: '#5563', customer: 'Guy Hawkins', date: '14.09.2023', total: '$80.00', method: 'Bank Transfer', status: 'On Hold' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Order Lists</h2>
        <div className="flex gap-3">
          <button className="border border-gray-200 bg-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Filter size={18} /> Filter
          </button>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-900">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4 font-bold text-teal-600">{order.id}</td>
                <td className="px-6 py-4 font-medium">{order.customer}</td>
                <td className="px-6 py-4 text-gray-500">{order.date}</td>
                <td className="px-6 py-4 font-bold">{order.total}</td>
                <td className="px-6 py-4 text-gray-600 italic">{order.method}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                    order.status === 'Completed' ? 'bg-teal-100 text-teal-600' : 
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderLists;