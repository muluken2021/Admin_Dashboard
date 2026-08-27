import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTheme } from "../../context/ThemeContext";

export default function MonthlySalesChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const gridColor = isDark ? "#1f2937" : "#f3f4f6";
  const labelColor = isDark ? "#9ca3af" : "#6b7280";
  const tooltipBg = isDark ? "#111827" : "#ffffff";
  const tooltipText = isDark ? "#f9fafb" : "#111827";

  const options: ApexOptions = {
    colors: ["#0B4E4E", "#14a3a3"],
    chart: {
      type: "bar",
      height: 320,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontFamily: "Outfit, sans-serif",
      fontSize: "13px",
      labels: { colors: labelColor },
      markers: { size: 6 },
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    xaxis: {
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
    tooltip: {
      theme: isDark ? "dark" : "light",
      style: { fontFamily: "Outfit, sans-serif", fontSize: "13px" },
      y: { formatter: (val) => `$${val.toLocaleString()}` },
    },
    fill: { opacity: 1 },
  };

  const series = [
    {
      name: "Revenue",
      data: [44200, 55100, 41000, 67000, 52000, 73000, 62000, 89000, 76000, 93000, 81000, 97000],
    },
    {
      name: "Expenses",
      data: [22000, 31000, 26000, 34000, 29000, 38000, 33000, 42000, 37000, 45000, 39000, 48000],
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-2 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-4 mb-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Revenue vs Expenses
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monthly financial overview for 2024
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#0B4E4E]"></span>
            <span className="text-gray-600 dark:text-gray-400">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#14a3a3]"></span>
            <span className="text-gray-600 dark:text-gray-400">Expenses</span>
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[600px] xl:min-w-full">
          <Chart options={options} series={series} type="bar" height={320} />
        </div>
      </div>
    </div>
  );
}
