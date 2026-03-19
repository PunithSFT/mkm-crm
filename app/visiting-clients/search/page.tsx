'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchVisitingClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/visiting-clients')
      .then(res => res.json())
      .then(data => {
        setClients(data);
        setFiltered(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(clients);
      return;
    }
    const term = searchTerm.toLowerCase();
    const result = clients.filter(c =>
      c['Client Name']?.toLowerCase().includes(term) ||
      c['Contact Number']?.toLowerCase().includes(term) ||
      c.Location?.toLowerCase().includes(term) ||
      c.Email?.toLowerCase().includes(term) ||
      c.Remarks?.toLowerCase().includes(term)
    );
    setFiltered(result);
  }, [searchTerm, clients]);

  const handleDownload = () => {
    window.location.href = '/api/download-visiting';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Link
        href="/visiting-clients"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-dark-surface p-6 rounded-2xl border border-dark-border shadow-xl">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Visiting Clients Database</h2>
          <p className="text-gray-500 mt-1">Review and manage all visiting client records.</p>
        </div>
        <button
          onClick={handleDownload}
          className="w-full md:w-auto bg-zinc-800 hover:bg-zinc-700 border border-dark-border text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export to Excel
        </button>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by name, contact, location, email or remarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-dark-surface border border-dark-border p-5 pl-12 rounded-2xl text-lg text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-xl placeholder:text-gray-600"
        />
      </div>

      <div className="overflow-hidden bg-dark-surface border border-dark-border rounded-2xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/50 border-b border-dark-border">
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Client Name</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Location</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Last Visit</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Remarks</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Compliment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      <span className="text-gray-500 font-medium">Accessing Database...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-lg font-medium">No matching records found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((c, i) => (
                  <tr key={i} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="p-5 text-gray-400 font-mono text-sm">{c.Date}</td>
                    <td className="p-5 font-bold text-white group-hover:text-primary transition-colors">{c['Client Name']}</td>
                    <td className="p-5 text-gray-400 font-medium">{c['Contact Number'] || '—'}</td>
                    <td className="p-5 text-gray-300">{c.Location || '—'}</td>
                    <td className="p-5 text-gray-300">{c.Email || '—'}</td>
                    <td className="p-5 text-gray-400 font-mono">{c['Last Visit Date']}</td>
                    <td className="p-5 text-gray-300 max-w-xs truncate" title={c.Remarks || ''}>
                      {c.Remarks || '—'}
                    </td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          c['Compliment Status'] === 'Yes'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {c['Compliment Status']}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-zinc-900/30 p-4 px-6 border-t border-dark-border flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest font-bold">
          <span>Total Records: {filtered.length}</span>
          <span className="text-primary/50 italic">MKM Enterprise System v1.0</span>
        </div>
      </div>
    </div>
  );
}