import { useState } from "react";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import { ArrowUpIcon, ArrowDownIcon } from "../../icons";

const kpiData = [
  { label: "Page Views", value: "1.24M", change: "+12.5%", isUp: true, period: "vs last month" },
  { label: "Conversion Rate", value: "3.82%", change: "+0.4%", isUp: true, period: "vs last month" },
  { label: "Avg. Session", value: "4m 32s", change: "-0.3%", isUp: false, period: "vs last month" },
  { label: "Bounce Rate", value: "41.2%", change: "-2.1%", isUp: true, period: "lower is better" },
];

const topProducts = [
  { name: 'MacBook Pro 16" M3 Pro', sales: 342, revenue: 1196658, growth: 14.2 },
  { name: "iPhone 15 Pro Max", sales: 891, revenue: 1068309, growth: 22.8 },
  { name: "Sony WH-1000XM5", sales: 1240, revenue: 471228, growth: 8.5 },
  { name: "Samsung 65\" OLED S95C", sales: 187, revenue: 345763, growth: -3.1 },
  { name: "Canon EOS R6 Mark II", sales: 109, revenue: 272391, growth: 31.4 },
];

const trafficSources = [
  { source: "Organic Search", sessions: 48230, percent: 41 },
  { source: "Direct", sessions: 28100, percent: 24 },
  { source: "Social Media", sessions: 18670, percent: 16 },
  { source: "Email Campaign", sessions: 11490, percent: 10 },
  { source: "Referral", sessions: 10540, percent: 9 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Business intelligence and performance insights
          </p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-brand-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 3 Months</option>
          <option value="365">Last Year</option>
        </select>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpiData.map((kpi, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{kpi.label}</p>
            <p className="mt-1.5 text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
            <div className="mt-2 flex items-center gap-1">
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${kpi.isUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {kpi.isUp ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
                {kpi.change}
              </span>
              <span className="text-xs text-gray-400">{kpi.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8">
          <MonthlySalesChart />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <MonthlyTarget />
        </div>
      </div>

      {/* Statistics */}
      <StatisticsChart />

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-6">
        {/* Top Products */}
        <div className="col-span-12 xl:col-span-7">
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">Top Performing Products</h3>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">By revenue this period</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800 dark:text-white">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800 dark:text-white">
                      ${(product.revenue / 1000).toFixed(0)}k
                    </p>
                    <p className={`text-xs font-medium ${product.growth >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {product.growth >= 0 ? "+" : ""}{product.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources + Demographic */}
        <div className="col-span-12 xl:col-span-5 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">Traffic Sources</h3>
            </div>
            <div className="p-5 space-y-4">
              {trafficSources.map((src, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{src.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{src.sessions.toLocaleString()}</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">{src.percent}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-1.5 rounded-full bg-brand-500"
                      style={{ width: `${src.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DemographicCard />
        </div>
      </div>
    </div>
  );
}
