import Link from 'next/link';

export default function DailyVisitingCustomers() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest group self-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Manage Your <span className="text-primary">Daily Visits</span> <br />
          With Confidence.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Log and track daily customer interactions quickly and efficiently.
          Keep your daily records organized and accessible.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
        <Link
          href="/daily-visiting-customers/add"
          className="flex-1 bg-primary hover:bg-primary-hover text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span>Add New Visit</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </Link>

        <Link
          href="/daily-visiting-customers/search"
          className="flex-1 bg-dark-surface hover:bg-zinc-800 border border-dark-border text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>Search Visits</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl pt-10 border-t border-dark-border/50">
        <div className="p-6 bg-dark-surface/50 rounded-2xl border border-dark-border text-left space-y-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Fast Entry</h3>
          <p className="text-gray-500 text-sm">Quick input for daily customer visits and purchases.</p>
        </div>

        <div className="p-6 bg-dark-surface/50 rounded-2xl border border-dark-border text-left space-y-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Smart Search</h3>
          <p className="text-gray-500 text-sm">Instant search across all daily visit records.</p>
        </div>

        <div className="p-6 bg-dark-surface/50 rounded-2xl border border-dark-border text-left space-y-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Data Export</h3>
          <p className="text-gray-500 text-sm">Export daily visit logs to Excel instantly.</p>
        </div>
      </div>
    </div>
  );
}