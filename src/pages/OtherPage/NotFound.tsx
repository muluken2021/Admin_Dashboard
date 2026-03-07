import { Link } from "react-router";

export default function NotFound() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Oops! Page not found.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
      >
        Back to Home
      </Link>

      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        &copy; {currentYear} - Your App Name
      </p>
    </div>
  );
}