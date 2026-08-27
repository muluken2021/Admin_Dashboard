import CountryMap from "./CountryMap";

const countries = [
  { flag: "/images/country/country-01.svg", name: "United States", alt: "usa", customers: 4821, percent: 79 },
  { flag: "/images/country/country-02.svg", name: "France", alt: "france", customers: 1394, percent: 23 },
  { flag: "/images/country/country-03.svg", name: "Germany", alt: "germany", customers: 1102, percent: 18 },
  { flag: "/images/country/country-04.svg", name: "United Kingdom", alt: "uk", customers: 987, percent: 16 },
  { flag: "/images/country/country-05.svg", name: "Australia", alt: "australia", customers: 743, percent: 12 },
];

export default function DemographicCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Customer Demographics
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customers by country
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 mb-5">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-0 h-[212px] w-full"
        >
          <CountryMap />
        </div>
      </div>

      <div className="space-y-3.5">
        {countries.map((country, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
                <img src={country.flag} alt={country.alt} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">
                  {country.name}
                </p>
                <p className="text-xs text-gray-400">
                  {country.customers.toLocaleString()} customers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative h-1.5 w-20 rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-brand-500"
                  style={{ width: `${country.percent}%` }}
                ></div>
              </div>
              <span className="w-8 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                {country.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
