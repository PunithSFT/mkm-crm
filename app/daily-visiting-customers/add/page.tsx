'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AddDailyVisit() {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    item: 'Rug',
    itemPurchasedAmount: '',
    telephoneNumber: '',
    value: '',
    shortDescription: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/daily-visiting-customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage({ text: 'Visit data has been successfully synchronized.', type: 'success' });
        setForm({
          date: new Date().toISOString().split('T')[0],
          customerName: '',
          item: 'Rug',
          itemPurchasedAmount: '',
          telephoneNumber: '',
          value: '',
          shortDescription: '',
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      setMessage({ text: 'An error occurred while saving the data. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-dark-bg border border-dark-border rounded-xl p-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600";
  const labelClasses = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/daily-visiting-customers"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </Link>

      <div className="bg-dark-surface border border-dark-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-dark-border bg-gradient-to-br from-dark-surface to-zinc-900">
          <h2 className="text-3xl font-extrabold text-white">Add New Daily Visit</h2>
          <p className="text-gray-500 mt-1">Enter daily customer visit details below.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Date of Visit</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Telephone Number</label>
              <input
                type="tel"
                placeholder="e.g. +94 77 123 4567"
                value={form.telephoneNumber}
                onChange={(e) => setForm({ ...form, telephoneNumber: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Customer Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className={inputClasses}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className={labelClasses}>Product Category</label>
              <select
  value={form.item}
  onChange={(e) => setForm({ ...form, item: e.target.value })}
  className={inputClasses}
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
              <label className={labelClasses}>Quantity</label>
              <input
                type="number"
                placeholder="0"
                value={form.itemPurchasedAmount}
                onChange={(e) => setForm({ ...form, itemPurchasedAmount: e.target.value })}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Total Value (RS)</label>
              <input
                type="number"
                placeholder="0.00"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Short Description</label>
            <textarea
              placeholder="Brief note about the visit or item (optional)"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className={`${inputClasses} min-h-[90px] resize-y`}
              rows={3}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-black font-extrabold py-4 rounded-xl text-lg transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Commit to Database
                </>
              )}
            </button>
          </div>
        </form>

        {message && (
          <div className={`p-4 text-center font-bold animate-fade-in ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}