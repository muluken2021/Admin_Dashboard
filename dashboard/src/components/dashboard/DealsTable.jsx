import React from 'react';

const DealsTable = () => {
  const deals = [
    {
      id: 1,
      productName: 'Apple Watch',
      location: '6096 Marjolaine Landing',
      dateTime: '12.09.2019 - 12.53 PM',
      piece: 423,
      amount: '$34,295',
      status: 'Delivered',
      image: 'https://p7.hiclipart.com/preview/436/755/543/apple-watch-series-3-apple-watch-series-2-smartwatch-apple-watch.jpg'
    },
    // Add more mock objects here to fill the table
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-teal-500 text-white';
      case 'Pending':
        return 'bg-orange-400 text-white';
      case 'Canceled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Deals Details</h3>
        <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg p-2 outline-none">
          <option>October</option>
          <option>September</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Product Name</th>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold">Date - Time</th>
              <th className="px-6 py-4 font-semibold">Piece</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 p-1 flex-shrink-0">
                    <img src={deal.image} alt={deal.productName} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-semibold text-slate-700">{deal.productName}</span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{deal.location}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{deal.dateTime}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">{deal.piece}</td>
                <td className="px-6 py-4 text-gray-700 font-bold">{deal.amount}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${getStatusStyles(deal.status)}`}>
                    {deal.status}
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

export default DealsTable;