"use client";

import { useState } from 'react';
import { Leaf, MapPin, Camera, Database, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import AIInspectorModal from './AIInspectorModal';

export default function FarmerPortal({ onHarvestCreated, harvests }) {
  const [farmerName, setFarmerName] = useState('Rajesh Kumar Sharma');
  const [aadhaarId, setAadhaarId] = useState('8892-4102-9912');
  const [farmLocation, setFarmLocation] = useState('Wayanad Organic Herb Valley, Kerala');
  const [lat, setLat] = useState('11.6854');
  const [lng, setLng] = useState('76.1320');
  const [herbType, setHerbType] = useState('Ashwagandha Organic Roots');
  const [weightKg, setWeightKg] = useState('120');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastCreated, setLastCreated] = useState(null);
  const [showAiModal, setShowAiModal] = useState(false);

  const fetchLiveGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude.toFixed(4));
        setLng(pos.coords.longitude.toFixed(4));
      }, () => {
        alert("GPS fetched successfully (Simulated Wayanad Coordinates)");
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newHarvestData = {
        farmerId: `FAR-${Math.floor(1000 + Math.random() * 9000)}`,
        farmerName,
        aadhaarId,
        farmLocation,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        herbType,
        harvestDate: new Date().toISOString().split('T')[0],
        weightKg: parseFloat(weightKg),
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
      };

      const result = onHarvestCreated(newHarvestData);
      setLastCreated(result);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
            <Leaf className="w-4 h-4" /> Stage 1: Origin Farmer Registration & Harvest Geo-Tagging
          </div>
          <h2 className="text-2xl font-bold text-white">Farmer Harvest Registration</h2>
          <p className="text-xs text-zinc-400 mt-1">Immutably mint harvest records onto the Ethereum blockchain with GPS coordinates & IPFS photos</p>
        </div>

        <button 
          onClick={() => setShowAiModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          Test Herb with AI Quality Inspector
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2 border-b border-emerald-500/20 pb-3">
            <MapPin className="w-5 h-5 text-emerald-400" />
            Record Geo-Tagged Harvest
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Farmer Full Name</label>
                <input 
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Aadhaar / Farmer License ID</label>
                <input 
                  type="text"
                  required
                  value={aadhaarId}
                  onChange={(e) => setAadhaarId(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Farm Location Name</label>
              <input 
                type="text"
                required
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Latitude (°N)</label>
                <input 
                  type="text"
                  required
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Longitude (°E)</label>
                <input 
                  type="text"
                  required
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <button 
                type="button"
                onClick={fetchLiveGPS}
                className="w-full py-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold hover:bg-emerald-900/60 transition-all flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" /> Auto Geo-Tag
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Herb Variety</label>
                <select 
                  value={herbType}
                  onChange={(e) => setHerbType(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Ashwagandha Organic Roots">Ashwagandha (Withania somnifera)</option>
                  <option value="Krishna Tulsi & Leaves">Tulsi (Ocimum sanctum)</option>
                  <option value="Organic Turmeric Rhizomes">Turmeric (Curcuma longa)</option>
                  <option value="Giloy Stems">Giloy (Tinospora cordifolia)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Harvest Batch Weight (kg)</label>
                <input 
                  type="number"
                  required
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Sample Photo URL (Simulated IPFS Upload)</label>
              <input 
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-black font-bold rounded-xl shadow-lg glow-emerald transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Database className="w-5 h-5 animate-spin text-black" />
                  Minting Blockchain Record & Storing on IPFS...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Mint Harvest to Blockchain
                </>
              )}
            </button>
          </form>
        </div>

        {/* Status / History Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Last Minted Transaction Box */}
          {lastCreated && (
            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" /> Blockchain Record Minted Successfully!
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Harvest ID:</span>
                  <span className="font-mono text-emerald-300 font-bold">{lastCreated.harvestId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">IPFS Photo CID:</span>
                  <span className="font-mono text-amber-300 truncate max-w-[180px]">{lastCreated.ipfsPhotoCid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Tx Hash:</span>
                  <span className="font-mono text-zinc-300 truncate max-w-[180px]">{lastCreated.blockchainTx}</span>
                </div>
              </div>
            </div>
          )}

          {/* Existing Harvest Logs */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-zinc-200 flex items-center justify-between border-b border-zinc-800 pb-3">
              <span>Registered Harvest Batches</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                {harvests.length} Active
              </span>
            </h3>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {harvests.map((h) => (
                <div key={h.harvestId} className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800/80 hover:border-emerald-500/40 transition-all space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-300">{h.herbType}</div>
                      <div className="text-[11px] text-zinc-400">{h.farmerName} • {h.farmLocation}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                      {h.weightKg} kg
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-zinc-500 flex justify-between items-center">
                    <span>GPS: {h.lat}, {h.lng}</span>
                    <span className="text-emerald-400">{h.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AIInspectorModal 
        isOpen={showAiModal} 
        onClose={() => setShowAiModal(false)} 
        selectedHerbType={herbType}
      />
    </div>
  );
}
