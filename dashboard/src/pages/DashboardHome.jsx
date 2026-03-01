import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import DealsTable from '../components/dashboard/DealsTable';
import { Users, DollarSign, ShoppingCart, Clock } from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total User" 
          value="40,689" 
          trend="up" 
          trendValue="8.5%" 
          icon={<Users className="text-indigo-600" />} 
          bgColor="bg-indigo-100" 
        />
        <StatCard 
          title="Total Revenue" 
          value="10,293" 
          trend="up" 
          trendValue="1.3%" 
          icon={<DollarSign className="text-yellow-600" />} 
          bgColor="bg-yellow-100" 
        />
        <StatCard 
          title="Total Sales" 
          value="$89,000" 
          trend="down" 
          trendValue="4.3%" 
          icon={<ShoppingCart className="text-teal-600" />} 
          bgColor="bg-teal-100" 
        />
        <StatCard 
          title="Total Pending" 
          value="2040" 
          trend="up" 
          trendValue="1.8%" 
          icon={<Clock className="text-orange-600" />} 
          bgColor="bg-orange-100" 
        />
      </div>

      {/* Sales Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Sales Details</h3>
          <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg p-2 outline-none">
            <option>October</option>
            <option>November</option>
          </select>
        </div>
        <div className="h-[350px] w-full">
          <SalesChart />
        </div>
      </div>

      {/* Recent Deals Table */}
      <DealsTable />
    </div>
  );
};

export default DashboardHome;