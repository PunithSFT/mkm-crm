'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/purchased-customers')
      .then(res => res.json())
      .then(data => {
        const normalized = data.map((c: any) => ({
          ...c,
          _id: c._id?.toString() || '',
        }));
        setCustomers(normalized);
        setFiltered(normalized);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(customers);
      return;
    }
    const term = searchTerm.toLowerCase();
    const result = customers.filter(c =>
      c['Customer Name']?.toLowerCase().includes(term) ||
      c['Telephone Number']?.toLowerCase().includes(term)
    );
    setFiltered(result);
  }, [searchTerm, customers]);

  const handleDownload = () => {
    window.location.href = '/api/download-purchased';
  };

  // Open edit modal - map friendly keys to snake_case for editing
  const openEditModal = (record: any) => {
    if (!record._id) {
      alert('Cannot edit: missing record ID');
      return;
    }

    const snakeRecord = {
      _id: record._id,
      date: record.Date,
      customerName: record['Customer Name'],
      item: record.Item,
      itemPurchasedAmount: record['Purchased Amount'],
      telephoneNumber: record['Telephone Number'],
      value: record.Value,
      shortDescription: record['Short Description'] || '',
    };

    setEditingRecord(snakeRecord);
    setUpdateError(null);
    setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord || !editingRecord._id) {
      setUpdateError('No valid record selected');
      return;
    }

    setUpdating(true);
    setUpdateError(null);

    // Payload uses snake_case keys (matches backend)
    const payload = {
      date: editingRecord.date,
      customerName: editingRecord.customerName,
      item: editingRecord.item,
      itemPurchasedAmount: Number(editingRecord.itemPurchasedAmount || 0),
      telephoneNumber: editingRecord.telephoneNumber,
      value: Number(editingRecord.value || 0),
      shortDescription: editingRecord.shortDescription || '',
    };

    try {
      const res = await fetch(`/api/purchased-customers/${editingRecord._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Refresh table
        const freshRes = await fetch('/api/purchased-customers');
        const freshData = await freshRes.json();
        const normalized = freshData.map((c: any) => ({
          ...c,
          _id: c._id?.toString() || '',
        }));
        setCustomers(normalized);
        setFiltered(normalized);
        setShowEditModal(false);
        setEditingRecord(null);
        alert('Record updated successfully!');
      } else {
        const errData = await res.json().catch(() => ({}));
        setUpdateError(errData.message || 'Failed to update record');
      }
    } catch (err: any) {
      setUpdateError('Network or server error: ' + (err.message || 'Unknown error'));
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id || !confirm('Delete this record permanently?')) return;

    try {
      const res = await fetch(`/api/purchased-customers/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const freshRes = await fetch('/api/purchased-customers');
        const freshData = await freshRes.json();
        const normalized = freshData.map((c: any) => ({
          ...c,
          _id: c._id?.toString() || '',
        }));
        setCustomers(normalized);
        setFiltered(normalized);
        alert('Record deleted successfully!');
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
        href="/purchased"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-dark-surface p-6 rounded-2xl border border-dark-border shadow-xl">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Purchased Customers Database</h2>
          <p className="text-gray-500 mt-1">Review and manage all purchased customer records.</p>
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
          placeholder="Search by name or telephone number..."
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
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer Name</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Qty</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Telephone</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Value</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      <span className="text-gray-500 font-medium">Loading records...</span>
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
                  <tr key={c._id || i} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="p-5 text-gray-400 font-mono text-sm">{c.Date}</td>
                    <td className="p-5 font-bold text-white group-hover:text-primary transition-colors">{c['Customer Name']}</td>
                    <td className="p-5 text-gray-300 italic">{c.Item}</td>
                    <td className="p-5 text-center">
                      <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs font-bold text-gray-300 border border-dark-border">
                        {c['Purchased Amount']}
                      </span>
                    </td>
                    <td className="p-5 text-gray-400 font-medium">{c['Telephone Number']}</td>
                    <td className="p-5 text-right font-mono font-bold text-primary">
                      RS {parseFloat(c.Value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-5 text-gray-300 max-w-xs truncate" title={c['Short Description'] || ''}>
                      {c['Short Description'] || '—'}
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
              <h2 className="text-2xl font-bold text-white">Edit Record</h2>
            </div>

            <form onSubmit={handleUpdate} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Date of Transaction
                  </label>
                  <input
                    type="date"
                    value={editingRecord.date || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, date: e.target.value })}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Telephone Number
                  </label>
                  <input
                    type="tel"
                    value={editingRecord.telephoneNumber || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, telephoneNumber: e.target.value })}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Full Customer Name
                </label>
                <input
                  type="text"
                  value={editingRecord.customerName || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, customerName: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Product Category
                  </label>
                  <select
                    value={editingRecord.item || 'Rug'}
                    onChange={(e) => setEditingRecord({ ...editingRecord, item: e.target.value })}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option value="Rug">Rug</option>
                    <option value="Casa furniture">Casa furniture</option>
                    <option value="Gebbe">Gebbe</option>
                    <option value="Sophie Garcia">Sophie Garcia</option>
                    <option value="Mkm furnitures">Mkm furnitures</option>
                    <option value="Sereno pots">Sereno pots</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={editingRecord.itemPurchasedAmount || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, itemPurchasedAmount: Number(e.target.value) })}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Total Value (RS)
                  </label>
                  <input
                    type="number"
                    value={editingRecord.value || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, value: Number(e.target.value) })}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Short Description
                </label>
                <textarea
                  placeholder="Brief note about the transaction or item (optional)"
                  value={editingRecord.shortDescription || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, shortDescription: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[90px] resize-y"
                  rows={3}
                />
              </div>

              {updateError && (
                <div className="p-4 bg-rose-500/20 text-rose-300 rounded-xl text-center font-medium">
                  {updateError}
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setUpdateError(null);
                  }}
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
                  {updating ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}