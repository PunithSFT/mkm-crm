'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface VisitingClientRecord {
  _id: string;
  Date: string;
  'Client Name': string;
  'Contact Number': string;
  Location: string;
  Email: string;
  'Last Visit Date': string;
  Remarks: string;
  'Compliment Status': 'Yes' | 'No';
}

export default function VisitingClientsSearch() {
  const [clients, setClients] = useState<VisitingClientRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/visiting-clients')
      .then(res => res.json())
      .then((data: any[]) => {
        const normalized = data.map((c) => ({
          ...c,
          _id: c._id?.toString() || '',
        }));
        setClients(normalized);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return clients;
    const term = searchTerm.toLowerCase();
    return clients.filter(c =>
      c['Client Name']?.toLowerCase().includes(term) ||
      c['Contact Number']?.toLowerCase().includes(term) ||
      c.Location?.toLowerCase().includes(term) ||
      c.Email?.toLowerCase().includes(term) ||
      c.Remarks?.toLowerCase().includes(term)
    );
  }, [searchTerm, clients]);

  const handleDownload = () => {
    window.location.href = '/api/download-visiting';
  };

  // ==================== EDIT ====================
  const openEditModal = (record: VisitingClientRecord) => {
    const snakeRecord = {
      _id: record._id,
      date: record.Date,
      clientName: record['Client Name'],
      contactNumber: record['Contact Number'],
      location: record.Location,
      email: record.Email || '',
      lastVisitDate: record['Last Visit Date'],
      remarks: record.Remarks || '',
      complimentStatus: record['Compliment Status'],
    };

    setEditingRecord(snakeRecord);
    setUpdateError(null);
    setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord || !editingRecord._id) return;

    setUpdating(true);
    setUpdateError(null);

    try {
      const res = await fetch(`/api/visiting-clients/${editingRecord._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingRecord),
      });

      if (res.ok) {
        const freshRes = await fetch('/api/visiting-clients');
        const freshData: any[] = await freshRes.json();
        const normalized = freshData.map((c) => ({
          ...c,
          _id: c._id?.toString() || '',
        }));
        setClients(normalized);
        setShowEditModal(false);
        setEditingRecord(null);
        alert('Client record updated successfully!');
      } else {
        const errData = await res.json();
        setUpdateError(errData.message || 'Failed to update');
      }
    } catch (err: any) {
      setUpdateError('Network error: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // ==================== DELETE ====================
  const handleDelete = async (id: string) => {
    if (!id || !confirm('Delete this client record permanently?')) return;

    try {
      const res = await fetch(`/api/visiting-clients/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const freshRes = await fetch('/api/visiting-clients');
        const freshData: any[] = await freshRes.json();
        const normalized = freshData.map((c) => ({
          ...c,
          _id: c._id?.toString() || '',
        }));
        setClients(normalized);
        alert('Client record deleted successfully!');
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      alert('Network error while deleting');
    }
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
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      <span className="text-gray-500 font-medium">Loading records...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-20 text-center">
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
                  <tr key={c._id || i} className="hover:bg-zinc-800/30 transition-colors group">
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
                    <td className="p-5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all duration-200"
                          title="Edit Record"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-200"
                          title="Delete Record"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
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

      {/* ==================== EDIT MODAL ==================== */}
      {showEditModal && editingRecord && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-surface border border-dark-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-dark-border sticky top-0 bg-dark-surface z-10">
              <h2 className="text-2xl font-bold text-white">Edit Client Record</h2>
            </div>

            <form onSubmit={handleUpdate} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Date of Visit</label>
                  <input
                    type="date"
                    value={editingRecord.date || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, date: e.target.value })}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Last Visit Date</label>
                  <input
                    type="date"
                    value={editingRecord.lastVisitDate || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, lastVisitDate: e.target.value })}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Client Name</label>
                <input
                  type="text"
                  value={editingRecord.clientName || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, clientName: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Contact Number</label>
                  <input
                    type="tel"
                    value={editingRecord.contactNumber || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, contactNumber: e.target.value })}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Location</label>
                  <input
                    type="text"
                    value={editingRecord.location || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, location: e.target.value })}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email</label>
                <input
                  type="email"
                  value={editingRecord.email || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, email: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Remarks</label>
                <textarea
                  value={editingRecord.remarks || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, remarks: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[90px] resize-y"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Compliment Status</label>
                <select
                  value={editingRecord.complimentStatus || 'No'}
                  onChange={(e) => setEditingRecord({ ...editingRecord, complimentStatus: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {updateError && (
                <div className="p-4 bg-rose-500/20 text-rose-300 rounded-xl text-center">
                  {updateError}
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={updating}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl font-bold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-primary hover:bg-primary-hover text-black font-bold py-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}