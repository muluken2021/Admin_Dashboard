import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTheme } from "../../context/ThemeContext";

export default function MonthlyTarget() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const series = [75.55];

  const options: ApexOptions = {
    colors: ["#0B4E4E"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 240,
      sparkline: { enabled: true },
      background: "transparent",
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: "72%" },
        track: {
          background: isDark ? "#1f2937" : "#E4E7EC",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "32px",
            fontWeight: "700",
            offsetY: -20,
            color: isDark ? "#f9fafb" : "#111827",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#14a3a3"],
        stops: [0, 100],
      },
    },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Monthly Target
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          August 2026 revenue goal
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pb-4">
        <div className="relative w-full">
          <Chart options={options} series={series} type="radialBar" height={240} />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              ↑ 10% this month
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 px-2 mb-4">
          You earned{" "}
          <span className="font-semibold text-gray-800 dark:text-white">$15,113</span>{" "}
          of your $20,000 goal. Keep pushing!
        </p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200 dark:divide-gray-800 dark:border-gray-800">
        <div className="py-3.5 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Target</p>
          <p className="mt-1 text-base font-bold text-gray-800 dark:text-white">$20k</p>
        </div>
        <div className="py-3.5 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Earned</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">$15.1k</p>
        </div>
        <div className="py-3.5 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Remaining</p>
          <p className="mt-1 text-base font-bold text-rose-500 dark:text-rose-400">$4.9k</p>
        </div>
      </div>
    </div>
  );
}
