import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Manage Your <span className="text-primary">Customers</span> <br />
          With Confidence.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          The all-in-one professional CRM system designed for the MKM enterprise.
          Streamline your customer management and data tracking with ease.
        </p>
      </div>

      {/* ── Three Category Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        
        {/* Purchased Customers Card */}
        <Link
          href="/purchased"  // redirects to add page (you can change to a category overview later if needed)
          className="group bg-dark-surface border border-dark-border rounded-2xl p-8 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
            Purchased Customers
          </h3>
          <p className="text-gray-500 text-sm">
            Track sales, items, quantities, values & descriptions
          </p>
          <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-primary font-medium">Add / Search →</span>
          </div>
        </Link>

        {/* Visiting Clients Card */}
        <Link
          href="/visiting-clients"
          className="group bg-dark-surface border border-dark-border rounded-2xl p-8 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
            Visiting Clients
          </h3>
          <p className="text-gray-500 text-sm">
            Manage visits, locations, emails, last visit & remarks
          </p>
          <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-primary font-medium">Add / Search →</span>
          </div>
        </Link>

        {/* Daily Visiting Customers Card */}
        <Link
          href="/daily-visiting-customers"
          className="group bg-dark-surface border border-dark-border rounded-2xl p-8 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
            Daily Visits
          </h3>
          <p className="text-gray-500 text-sm">
            Quick log of daily showroom customer interactions & purchases
          </p>
          <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-primary font-medium">Add / Search →</span>
          </div>
        </Link>
      </div>

      {/* Keep your original three small feature cards at the bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl pt-10 border-t border-dark-border/50">
        <div className="p-6 bg-dark-surface/50 rounded-2xl border border-dark-border text-left space-y-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Fast Entry</h3>
          <p className="text-gray-500 text-sm">Optimized forms for quick customer data input and categorization.</p>
        </div>
        <div className="p-6 bg-dark-surface/50 rounded-2xl border border-dark-border text-left space-y-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Smart Search</h3>
          <p className="text-gray-500 text-sm">Real-time filtering of thousands of customer records instantly.</p>
        </div>
        <div className="p-6 bg-dark-surface/50 rounded-2xl border border-dark-border text-left space-y-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Data Export</h3>
          <p className="text-gray-500 text-sm">Download your entire database as a professional Excel file with one click.</p>
        </div>
      </div>
    </div>
  );
}