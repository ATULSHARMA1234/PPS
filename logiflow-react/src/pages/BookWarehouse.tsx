import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getWarehouses, bookWarehouseCapacity, Warehouse } from '../utils/storage';

export const BookWarehouse: React.FC = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [requestedSpace, setRequestedSpace] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const whs = getWarehouses();
    setWarehouses(whs);
    if (whs.length > 0) {
      setSelectedWarehouseId(whs[0].id);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const spaceNum = parseInt(requestedSpace, 10);
    if (isNaN(spaceNum) || spaceNum <= 0) {
      setError('Please enter a valid amount of space.');
      return;
    }

    const success = bookWarehouseCapacity(selectedWarehouseId, spaceNum);
    if (success) {
      setSubmitted(true);
      // Refresh local state to ensure it updated (though not strictly necessary since we unmount the form)
      setWarehouses(getWarehouses());
    } else {
      setError('Error: The requested capacity exceeds the available space. Please reduce your requested square footage.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 max-w-lg text-center">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-navy mb-4">Space Secured!</h2>
          <p className="text-slate-600 mb-8">
            Your warehouse capacity has been successfully allocated. A Logistics Manager will reach out with your specific bay assignments and loading dock schedules.
          </p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-colors">
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  const selectedWh = warehouses.find(w => w.id === selectedWarehouseId);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/smart-warehousing" className="text-sm font-bold text-slate-500 hover:text-green-700 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Smart Warehousing
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-green-800 p-8 text-white">
            <h1 className="text-3xl font-black mb-2">Reserve Warehouse Space</h1>
            <p className="text-green-200">Secure intelligent storage dynamically.</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-navy mb-3">Select Facility Phase</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {warehouses.map(wh => (
                    <div 
                      key={wh.id}
                      onClick={() => setSelectedWarehouseId(wh.id)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedWarehouseId === wh.id ? 'border-green-600 bg-green-50 shadow-md' : 'border-slate-200 hover:border-green-300'}`}
                    >
                      <div className="font-bold text-navy text-lg">{wh.name}</div>
                      <div className="text-sm text-slate-500 mb-2">{wh.location}</div>
                      <div className="text-xs bg-slate-100 px-2 py-1 inline-block rounded font-mono text-slate-600 mb-2">{wh.id}</div>
                      
                      <div className="flex justify-between items-center text-sm mt-3 border-t border-slate-200 pt-2">
                        <span className="font-semibold text-green-700">{wh.availableCapacity.toLocaleString()} sqft left</span>
                      </div>
                    </div>
                  ))}
                  {warehouses.length === 0 && (
                    <div className="col-span-2 text-center py-6 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                      No active warehouses found.
                    </div>
                  )}
                </div>
              </div>

              {selectedWh && (
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Space Required (Square Feet)</label>
                  <div className="relative rounded-md shadow-sm">
                    <input 
                      type="number" 
                      required 
                      min="100"
                      value={requestedSpace}
                      onChange={(e) => setRequestedSpace(e.target.value)}
                      placeholder="e.g. 5000" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-green-600 focus:border-green-600" 
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 sm:text-sm font-bold">sq ft</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Maximum allocatable space at {selectedWh.name} is {selectedWh.availableCapacity.toLocaleString()} sq ft.</p>
                </div>
              )}

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={warehouses.length === 0}
                  className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-green-800 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Allocate Storage Space
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
