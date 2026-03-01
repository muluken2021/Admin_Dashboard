import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

const Products = () => {
  const products = [
    { id: '#1021', name: 'Apple Watch Series 4', category: 'Digital Product', price: '$690.00', stock: 120, status: 'In Stock' },
    { id: '#1022', name: 'Microsoft Surface Pro', category: 'Digital Product', price: '$1,290.00', stock: 12, status: 'Low Stock' },
    { id: '#1023', name: 'Samsung Galaxy S21', category: 'Mobile', price: '$890.00', stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Products</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4 font-medium">{item.id}</td>
                <td className="px-6 py-4 text-slate-700 font-semibold">{item.name}</td>
                <td className="px-6 py-4 text-gray-500">{item.category}</td>
                <td className="px-6 py-4 font-bold">{item.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.stock > 50 ? 'bg-green-100 text-green-600' : 
                    item.stock > 0 ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {item.status} ({item.stock})
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                  <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;