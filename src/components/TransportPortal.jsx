"use client";

import { useState } from 'react';
import { Truck, CheckCircle2, MapPin, Clock, ShieldCheck, UserCheck, ChevronRight } from 'lucide-react';

export default function TransportPortal({ harvests, onTransportUpdated }) {
  const [selectedHarvestId, setSelectedHarvestId] = useState(harvests[0]?.harvestId || '');
  const [transporterName, setTransporterName] = useState('Sahyadri Cold Express Logistics');
  const [driverName, setDriverName] = useState('Vikramaditya Rao');
  const [vehicleNo, setVehicleNo] = useState('KA-09-E-7712');
  const [destination, setDestination] = useState('Central Ayurvedic Processing Hub, Mysuru');
  const [tempMaintained, setTempMaintained] = useState('21°C - 24°C');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const selectedHarvest = harvests.find(h => h.harvestId === selectedHarvestId) || harvests[0];

  const handleTransportSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    setTimeout(() => {
      const transportData = {
        transporterName,
        driverName,
        vehicleNo,
        dispatchDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        arrivalDate: 'In Transit (Estimated 18 hrs)',
        destination,
        tempMaintained,
      };

      onTransportUpdated(selectedHarvestId, transportData);
      setIsUpdating(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-teal-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-1">
            <Truck className="w-4 h-4" /> Stage 2: Transport & Cold Chain Custody Tracking
          </div>
          <h2 className="text-2xl font-bold text-white">Logistics & Handoff Management</h2>
          <p className="text-xs text-zinc-400 mt-1">Immutably append transport vehicle numbers, temperature logs, and delivery timestamps</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2 border-b border-teal-500/20 pb-3">
            <UserCheck className="w-5 h-5 text-teal-400" />
            Assign Transport Custody
          </h3>

          <form onSubmit={handleTransportSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Select Harvest Batch</label>
              <select 
                value={selectedHarvestId}
                onChange={(e) => setSelectedHarvestId(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-teal-500 font-mono"
              >
                {harvests.map((h) => (
                  <option key={h.harvestId} value={h.harvestId}>
                    {h.harvestId} - {h.herbType} ({h.farmerName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Logistics Agency Name</label>
                <input 
                  type="text"
                  required
                  value={transporterName}
                  onChange={(e) => setTransporterName(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Driver Name</label>
                <input 
                  type="text"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Vehicle Reg No.</label>
                <input 
                  type="text"
                  required
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Cold Chain Temp Maintained</label>
                <input 
                  type="text"
                  required
                  value={tempMaintained}
                  onChange={(e) => setTempMaintained(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Destination Facility</label>
              <input 
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-black font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <Truck className="w-5 h-5 animate-bounce" />
                  Recording Custody Handoff on Ledger...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Update Transport Custody
                </>
              )}
            </button>

            {successMsg && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Transport Handoff record written to Blockchain state!
              </div>
            )}
          </form>
        </div>

        {/* Selected Harvest Transport Status Card */}
        <div className="lg:col-span-6 space-y-6">
          {selectedHarvest && (
            <div className="glass-panel p-6 rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <div className="text-xs font-mono text-teal-400 font-bold">{selectedHarvest.harvestId}</div>
                  <h4 className="text-lg font-bold text-white">{selectedHarvest.herbType}</h4>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30">
                  {selectedHarvest.transport ? "In Transport" : "Awaiting Transport"}
                </span>
              </div>

              {/* Origin Details */}
              <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-2">
                <div className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" /> Origin Harvest Location
                </div>
                <div className="text-xs text-zinc-200 font-medium">{selectedHarvest.farmerName} • {selectedHarvest.farmLocation}</div>
                <div className="text-[11px] font-mono text-zinc-500">Harvest Date: {selectedHarvest.harvestDate} | {selectedHarvest.weightKg} kg</div>
              </div>

              {/* Transport Log */}
              {selectedHarvest.transport ? (
                <div className="p-4 bg-teal-950/30 rounded-xl border border-teal-500/30 space-y-3">
                  <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-teal-400" /> Verified Logistics Manifest
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Carrier:</span>
                      <span className="text-zinc-200 font-medium">{selectedHarvest.transport.transporterName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Driver & Vehicle:</span>
                      <span className="font-mono text-zinc-200">{selectedHarvest.transport.driverName} ({selectedHarvest.transport.vehicleNo})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Destination:</span>
                      <span className="text-zinc-200">{selectedHarvest.transport.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Temperature Log:</span>
                      <span className="font-mono text-emerald-400 font-bold">{selectedHarvest.transport.tempMaintained}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center text-zinc-500 text-xs">
                  No transport handoff logged yet for this harvest batch. Fill out the form on the left to assign carrier.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
