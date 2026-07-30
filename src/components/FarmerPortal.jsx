"use client";

import { useState } from 'react';
import { Leaf, MapPin, Camera, Database, CheckCircle2, ShieldCheck, Sparkles, Inbox } from 'lucide-react';
import AIInspectorModal from './AIInspectorModal';

export default function FarmerPortal({ onHarvestCreated, harvests }) {
  const [farmerName, setFarmerName] = useState('');
  const [aadhaarId, setAadhaarId] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [herbType, setHerbType] = useState('Ashwagandha Organic Roots');
  const [weightKg, setWeightKg] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastCreated, setLastCreated] = useState(null);
  const [showAiModal, setShowAiModal] = useState(false);

  const fetchLiveGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude.toFixed(4));
        setLng(pos.coords.longitude.toFixed(4));
      }, () => {
        // Fallback default coordinates if location permission denied
        setLat("11.6854");
        setLng("76.1320");
      });
    } else {
      setLat("11.6854");
      setLng("76.1320");
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
        lat: parseFloat(lat) || 11.6854,
        lng: parseFloat(lng) || 76.1320,
        herbType,
        harvestDate: new Date().toISOString().split('T')[0],
        weightKg: parseFloat(weightKg) || 50,
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
      };

      const result = onHarvestCreated(newHarvestData);
      setLastCreated(result);
      setIsSubmitting(false);

      // Reset form
      setFarmerName('');
      setAadhaarId('');
      setFarmLocation('');
      setWeightKg('');
      setPhotoUrl('');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-[#2E7D32]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#2E7D32] dark:text-[#66BB6A] font-semibold text-xs mb-1 font-mono">
            <Leaf className="w-4 h-4" /> Stage 1: Farmer Account & Herb Geo-Tagging
          </div>
          <h2 className="text-2xl font-bold text-[#1B1B1B] dark:text-white">Register Raw Herb Harvest</h2>
          <p className="text-xs text-[#4A5568] dark:text-zinc-400 mt-1">
            Store name, farm location, Aadhaar/ID, record GPS location & upload herb photo to Convex DB & Blockchain.
          </p>
        </div>

        <button 
          onClick={() => setShowAiModal(true)}
          className="px-4 py-2.5 bg-[#C8A96A]/15 hover:bg-[#C8A96A]/25 border border-[#C8A96A]/40 text-[#C8A96A] rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#C8A96A]" />
          Test Sample with AI Inspector
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-6">
          <h3 className="text-lg font-bold text-[#1B1B1B] dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <MapPin className="w-5 h-5 text-[#2E7D32]" />
            New Harvest Entry Form
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Farmer Store / Full Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel Farms"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-[#1B1B1B] dark:text-white focus:outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Aadhaar / Farmer ID *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. 9942-8810-1120"
                  value={aadhaarId}
                  onChange={(e) => setAadhaarId(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-[#1B1B1B] dark:text-white focus:outline-none focus:border-[#2E7D32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Farm Address / Location *</label>
              <input 
                type="text"
                required
                placeholder="e.g. Organic Herbal Zone, Anand, Gujarat"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-[#1B1B1B] dark:text-white focus:outline-none focus:border-[#2E7D32]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Latitude (°N)</label>
                <input 
                  type="text"
                  placeholder="e.g. 22.5645"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-[#1B1B1B] dark:text-white focus:outline-none focus:border-[#2E7D32] font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Longitude (°E)</label>
                <input 
                  type="text"
                  placeholder="e.g. 72.9289"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-[#1B1B1B] dark:text-white focus:outline-none focus:border-[#2E7D32] font-mono"
                />
              </div>
              <button 
                type="button"
                onClick={fetchLiveGPS}
                className="w-full py-2 bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-[#2E7D32] dark:text-[#66BB6A] rounded-xl text-xs font-bold hover:bg-[#2E7D32]/20 transition-all flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" /> Detect My GPS
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Herb Variety *</label>
                <select 
                  value={herbType}
                  onChange={(e) => setHerbType(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-[#1B1B1B] dark:text-white focus:outline-none focus:border-[#2E7D32]"
                >
                  <option value="Ashwagandha Organic Roots">Ashwagandha (Withania somnifera)</option>
                  <option value="Krishna Tulsi Leaves">Tulsi (Ocimum sanctum)</option>
                  <option value="Organic Turmeric Rhizomes">Turmeric (Curcuma longa)</option>
                  <option value="Giloy Stems">Giloy (Tinospora cordifolia)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Batch Weight (kg) *</label>
                <input 
                  type="number"
                  required
                  placeholder="e.g. 100"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-[#1B1B1B] dark:text-white focus:outline-none focus:border-[#2E7D32] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Photo URL (Optional IPFS Upload)</label>
              <input 
                type="text"
                placeholder="https://..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-[#1B1B1B] dark:text-white focus:outline-none focus:border-[#2E7D32] font-mono text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white font-extrabold rounded-2xl shadow-lg glow-forest transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Database className="w-5 h-5 animate-spin" />
                  Saving to Convex Cloud DB & Blockchain...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Save & Mint Harvest Record
                </>
              )}
            </button>
          </form>
        </div>

        {/* Real Live Database Feed */}
        <div className="lg:col-span-5 space-y-6">
          {lastCreated && (
            <div className="glass-panel p-5 rounded-3xl border border-[#43A047]/40 bg-[#43A047]/10 space-y-3">
              <div className="flex items-center gap-2 text-[#43A047] font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" /> Convex DB Saved & Blockchain Minted!
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#4A5568] dark:text-zinc-400">Harvest ID:</span>
                  <span className="text-[#2E7D32] dark:text-[#66BB6A] font-bold">{lastCreated.harvestId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568] dark:text-zinc-400">IPFS CID:</span>
                  <span className="text-[#C8A96A] truncate max-w-[170px]">{lastCreated.ipfsPhotoCid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568] dark:text-zinc-400">Tx Hash:</span>
                  <span className="text-zinc-500 truncate max-w-[170px]">{lastCreated.blockchainTx}</span>
                </div>
              </div>
            </div>
          )}

          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-[#1B1B1B] dark:text-white flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <span>Saved Harvest Records</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] dark:text-[#66BB6A] font-bold">
                {harvests.length} Recorded
              </span>
            </h3>

            {harvests.length > 0 ? (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {harvests.map((h) => (
                  <div key={h.harvestId} className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-[#2E7D32] dark:text-[#66BB6A]">{h.herbType}</div>
                        <div className="text-[#4A5568] dark:text-zinc-400">{h.farmerName} • {h.farmLocation}</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[#C8A96A] font-bold">
                        {h.weightKg} kg
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-zinc-500 flex justify-between items-center">
                      <span>GPS: {h.lat}° N, {h.lng}° E</span>
                      <span className="text-[#43A047] font-bold">{h.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-zinc-400 space-y-2">
                <Inbox className="w-10 h-10 mx-auto text-zinc-300 dark:text-zinc-700" />
                <p className="text-xs font-medium">No harvest recorded yet in database. Use the form on the left to add your first real harvest!</p>
              </div>
            )}
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
