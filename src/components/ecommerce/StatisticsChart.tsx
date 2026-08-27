import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTheme } from "../../context/ThemeContext";

export default function StatisticsChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const gridColor = isDark ? "#1f2937" : "#f3f4f6";
  const labelColor = isDark ? "#9ca3af" : "#6b7280";

  const options: ApexOptions = {
    legend: { show: false },
    colors: ["#0B4E4E", "#f97316"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: [3, 3],
    },
    fill: {
      type: ["gradient", "gradient"],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.25,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 4,
      strokeColors: isDark ? "#111827" : "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: isDark ? "dark" : "light",
      style: { fontFamily: "Outfit, sans-serif" },
      y: { formatter: (val) => `$${val.toLocaleString()}` },
    },
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: labelColor, fontSize: "12px" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${(val / 1000).toFixed(0)}k`,
        style: { colors: labelColor, fontSize: "12px" },
      },
    },
  };

  const series = [
    {
      name: "Online Sales",
      data: [32000, 42000, 38000, 55000, 47000, 63000, 58000, 74000, 68000, 81000, 75000, 92000],
    },
    {
      name: "In-Store Sales",
      data: [18000, 22000, 20000, 28000, 24000, 32000, 29000, 38000, 34000, 41000, 37000, 46000],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Sales Trend Analysis
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Online vs In-Store performance across 2024
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#0B4E4E]"></span>
            <span className="text-gray-600 dark:text-gray-400">Online</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#f97316]"></span>
            <span className="text-gray-600 dark:text-gray-400">In-Store</span>
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[600px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
