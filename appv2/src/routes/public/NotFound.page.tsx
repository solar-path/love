export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh]  px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Oops! The page you're looking for seems to have gone on vacation.
      </p>
      <button
        onClick={() => window.history.back()}
        className="px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
      >
        Return to Previous Page
      </button>
    </section>
  );
}
