import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard | Ecommerce Admin"
        description="Comprehensive ecommerce store monitoring and analytics."
      />

      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome back — here's what's happening with your store today.
          </p>
        </div>

        {/* KPI Metrics */}
        <EcommerceMetrics />

        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-8">
            <MonthlySalesChart />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <MonthlyTarget />
          </div>
        </div>

        {/* Sales Trend */}
        <StatisticsChart />

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-8">
            <RecentOrders />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <DemographicCard />
          </div>
        </div>
      </div>
    </>
  );
}
