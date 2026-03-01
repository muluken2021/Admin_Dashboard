import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, trend, trendValue, icon, bgColor }) => {
  // Determine if the trend is positive or negative for coloring
  const isUp = trend === 'up';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            {value}
          </h3>
        </div>
        
        {/* Icon Container with dynamic background */}
        <div className={`p-4 rounded-2xl ${bgColor} flex items-center justify-center`}>
          {React.cloneElement(icon, { size: 28 })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <div className={`flex items-center gap-1 font-bold text-sm ${isUp ? 'text-teal-500' : 'text-red-500'}`}>
          {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{trendValue}</span>
        </div>
        <p className="text-gray-400 text-xs font-medium">
          {isUp ? 'Up from yesterday' : 'Down from yesterday'}
        </p>
      </div>
    </div>
  );
};

export default StatCard;