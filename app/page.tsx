'use client';

import { useState } from 'react';

const ACCENT = 'text-amber-400';
const ACCENT_BG = 'bg-amber-500';

export default function SustainableAgriculturePage() {
  const [form, setForm] = useState({
    cropType: 'Wheat',
    acreage: '500',
    soilType: 'Loam',
    irrigationType: 'Drip',
    location: '',
    organic: 'No',
    fertilizerUse: 'Conventional NPK',
    pestControl: 'Chemical',
    description: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 ${ACCENT} text-sm font-medium mb-4 uppercase tracking-widest`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Environmental AI Suite
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={ACCENT}>Sustainable Agriculture</span> Yield Optimizer
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI-powered crop yield optimization with soil health, water efficiency, and regenerative farming strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h2 className={`text-xl font-semibold ${ACCENT} mb-6`}>Farm Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Crop Type</label>
                  <select name="cropType" value={form.cropType} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                    <option>Wheat</option><option>Corn</option><option>Soybeans</option><option>Rice</option>
                    <option>Barley</option><option>Cotton</option><option>Vegetables</option><option>Fruits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Acreage</label>
                  <input name="acreage" type="number" value={form.acreage} onChange={handleChange} required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Soil Type</label>
                  <select name="soilType" value={form.soilType} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                    <option>Loam</option><option>Clay</option><option>Sandy</option><option>Silt</option>
                    <option>Peat</option><option>Chalk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Irrigation</label>
                  <select name="irrigationType" value={form.irrigationType} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                    <option>Drip</option><option>Flood</option><option>Sprinkler</option><option>Center Pivot</option>
                    <option>Rainfed</option><option>Furrow</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Location / Climate Region</label>
                <input name="location" type="text" value={form.location} onChange={handleChange}
                  placeholder="e.g. Midwest US, Semi-arid climate"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Organic Farming</label>
                  <select name="organic" value={form.organic} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                    <option>No</option><option>Transitional</option><option>Certified Organic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Pest Control</label>
                  <select name="pestControl" value={form.pestControl} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                    <option>Chemical</option><option>Biological</option><option>Integrated (IPM)</option><option>Organic</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Fertilizer Regimen</label>
                <select name="fertilizerUse" value={form.fertilizerUse} onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                  <option>Conventional NPK</option><option>Organic Compost</option><option>Cover Cropping</option>
                  <option>Synthetic + Organic Blend</option><option>Minimal/None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Additional Details</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  placeholder="Current yield per acre, equipment available, budget constraints, challenges faced..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className={`w-full ${ACCENT_BG} hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20`}>
                {loading ? 'Optimizing Yield Strategy...' : 'Generate Yield Optimization Plan'}
              </button>
            </form>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h2 className={`text-xl font-semibold ${ACCENT} mb-6`}>Optimization Report</h2>
            {error && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 text-red-300 text-sm">
                {error}
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4" />
                <p>Generating sustainable agriculture recommendations...</p>
              </div>
            )}
            {!loading && !result && !error && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-center">Enter your farm parameters and click generate to see AI-powered yield optimization strategies.</p>
              </div>
            )}
            {result && (
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="bg-gray-900/80 rounded-xl p-5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap overflow-auto max-h-[600px]">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-xs">
          Powered by DeepSeek AI · Next.js 16 · Tailwind CSS
        </div>
      </div>
    </div>
  );
}
