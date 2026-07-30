"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Layers, ShieldCheck, ExternalLink } from 'lucide-react';

export default function InteractiveMapSection({ harvests }) {
  const [selectedHarvest, setSelectedHarvest] = useState(harvests[0] || null);
  const [activeFilterState, setActiveFilterState] = useState('All');

  const states = ['All', 'Kerala', 'Karnataka', 'Himachal Pradesh'];

  const filteredHarvests = activeFilterState === 'All' 
    ? harvests 
    : harvests.filter(h => h.farmLocation.toLowerCase().includes(activeFilterState.toLowerCase()));

  return (
    <section className="py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#2E7D32] dark:text-[#66BB6A] text-xs font-bold font-mono">
            <Compass className="w-4 h-4 text-[#43A047]" /> Geo-Tagging & GIS Tracking
          </div>
          <h2 className="text-2xl font-bold text-[#1B1B1B] dark:text-white">
            Interactive Geo-Tagged Farm Map
          </h2>
          <p className="text-xs text-[#4A5568] dark:text-zinc-400 mt-1">
            Real-time GPS collection points and state-wise Ayurvedic herb origins across India
          </p>
        </div>

        {/* State Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => setActiveFilterState(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilterState === st 
                  ? 'bg-[#2E7D32] text-white shadow-md' 
                  : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#4A5568] dark:text-zinc-300 hover:border-[#2E7D32]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map Visualizer Container */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
          <div className="flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-[#2E7D32] dark:text-[#66BB6A] text-xs font-bold font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#43A047] animate-ping" />
              Live GIS Satellite Stream
            </span>
            <span className="text-xs font-mono text-[#C8A96A] font-bold">
              {filteredHarvests.length} Geo-Nodes Tagged
            </span>
          </div>

          {/* Map Grid Simulation */}
          <div className="relative my-4 p-8 rounded-2xl bg-[#E8E4D9] dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 overflow-hidden flex flex-col justify-center items-center min-h-[260px]">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20 dark:opacity-30 bg-[radial-gradient(#2E7D32_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Interactive Pins */}
            <div className="relative z-10 w-full flex flex-wrap justify-around items-center gap-6">
              {filteredHarvests.map((h) => {
                const isSelected = selectedHarvest?.harvestId === h.harvestId;
                return (
                  <motion.div
                    key={h.harvestId}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedHarvest(h)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-xl max-w-xs ${
                      isSelected 
                        ? 'bg-[#2E7D32] text-white border-[#43A047] glow-forest' 
                        : 'bg-white dark:bg-zinc-900 text-[#1B1B1B] dark:text-white border-zinc-200 dark:border-zinc-800 hover:border-[#2E7D32]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#2E7D32]'}`} />
                      <span className="text-xs font-bold font-mono">{h.harvestId}</span>
                    </div>
                    <div className="text-xs font-semibold">{h.herbType}</div>
                    <div className="text-[11px] opacity-80">{h.farmLocation}</div>
                    <div className="text-[10px] font-mono mt-1 opacity-70">
                      GPS: {h.lat}° N, {h.lng}° E
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Geo Node Info Card */}
        <div className="lg:col-span-4 space-y-4">
          {selectedHarvest ? (
            <div className="glass-panel p-6 rounded-3xl space-y-4 border border-[#2E7D32]/30">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div>
                  <div className="text-xs font-mono font-bold text-[#C8A96A]">{selectedHarvest.harvestId}</div>
                  <h3 className="text-lg font-bold text-[#1B1B1B] dark:text-white">{selectedHarvest.herbType}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#43A047]/10 text-[#43A047] text-xs font-bold border border-[#43A047]/30">
                  Geo-Tagged
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#4A5568] dark:text-zinc-400">Registered Farmer:</span>
                  <span className="font-semibold text-[#1B1B1B] dark:text-zinc-100">{selectedHarvest.farmerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568] dark:text-zinc-400">Farmer Aadhaar:</span>
                  <span className="font-mono text-zinc-500">{selectedHarvest.aadhaarId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568] dark:text-zinc-400">Farm Location:</span>
                  <span className="text-[#2E7D32] dark:text-[#66BB6A] font-medium">{selectedHarvest.farmLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568] dark:text-zinc-400">GPS Coordinates:</span>
                  <span className="font-mono text-[#C8A96A] font-bold">{selectedHarvest.lat}° N, {selectedHarvest.lng}° E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568] dark:text-zinc-400">Soil Health Score:</span>
                  <span className="font-mono text-[#43A047] font-bold">{selectedHarvest.soilHealthScore || '96/100 Bio-Humus'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5568] dark:text-zinc-400">IPFS CID:</span>
                  <span className="font-mono text-zinc-500 truncate max-w-[140px]">{selectedHarvest.ipfsPhotoCid}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center text-zinc-500 text-xs">
              Click any pin on the map to inspect farm location and GIS telemetry.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
