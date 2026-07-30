"use client";

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Factory, QrCode, ShieldCheck, Download, PackageCheck, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ManufacturerPortal({ harvests, batches, onBatchCreated }) {
  const [medicineName, setMedicineName] = useState('Organic Ashwagandha & Tulsi Gold Rasayana');
  const [manufacturerName, setManufacturerName] = useState('Himalaya Wellness & Botanical Labs');
  const [quantity, setQuantity] = useState('5,000 Bottles (500mg)');
  const [selectedHarvestIds, setSelectedHarvestIds] = useState(
    harvests.slice(0, 2).map(h => h.harvestId)
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastCreatedBatch, setLastCreatedBatch] = useState(null);

  const handleHarvestToggle = (harvestId) => {
    if (selectedHarvestIds.includes(harvestId)) {
      setSelectedHarvestIds(selectedHarvestIds.filter(id => id !== harvestId));
    } else {
      setSelectedHarvestIds([...selectedHarvestIds, harvestId]);
    }
  };

  const handleManufactureSubmit = (e) => {
    e.preventDefault();
    if (selectedHarvestIds.length === 0) {
      alert("Please select at least one certified herb harvest batch.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const batchId = `AYUR-2026-${Math.floor(100 + Math.random() * 900)}`;
      const manufactureDate = new Date().toISOString().split('T')[0];
      const expiryDate = new Date(Date.now() + 2 * 365 * 86400 * 1000).toISOString().split('T')[0];

      const newBatchData = {
        batchId,
        medicineName,
        manufacturerName,
        manufactureDate,
        expiryDate,
        quantity,
        harvestIds: selectedHarvestIds,
        aiVerificationScore: Number((96.5 + Math.random() * 3).toFixed(1))
      };

      const result = onBatchCreated(newBatchData);
      setLastCreatedBatch(result);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-1">
            <Factory className="w-4 h-4" /> Stage 4: Medicine Batch Formulation & Smart QR Encoding
          </div>
          <h2 className="text-2xl font-bold text-white">Manufacturer Batch Production</h2>
          <p className="text-xs text-zinc-400 mt-1">Bind certified raw herb harvest hashes directly into consumer product QR codes on Blockchain</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2 border-b border-amber-500/20 pb-3">
            <Layers className="w-5 h-5 text-amber-400" />
            Assemble Medicine Batch
          </h3>

          <form onSubmit={handleManufactureSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Ayurvedic Product Title</label>
              <input 
                type="text"
                required
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Manufacturer Facility Name</label>
                <input 
                  type="text"
                  required
                  value={manufacturerName}
                  onChange={(e) => setManufacturerName(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Batch Batch Volume / Quantity</label>
                <input 
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Select Certified Harvest Batches */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-amber-300">
                Link Origin Harvest Batches (Select multiple)
              </label>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {harvests.map((h) => {
                  const isChecked = selectedHarvestIds.includes(h.harvestId);
                  return (
                    <div 
                      key={h.harvestId}
                      onClick={() => handleHarvestToggle(h.harvestId)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked 
                          ? 'bg-amber-500/10 border-amber-500/50 text-white' 
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold font-mono text-amber-300">{h.harvestId} • {h.herbType}</div>
                        <div className="text-[11px] text-zinc-400">Farmer: {h.farmerName} ({h.farmLocation})</div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isChecked ? 'bg-amber-500 border-amber-400 text-black' : 'border-zinc-700'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-black font-bold rounded-xl shadow-lg glow-gold transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Factory className="w-5 h-5 animate-spin" />
                  Generating Smart Batch & Encoding Smart QR Code...
                </>
              ) : (
                <>
                  <QrCode className="w-5 h-5" />
                  Finalize Batch & Mint QR Code
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated QR Code Card */}
        <div className="lg:col-span-5 space-y-6">
          {lastCreatedBatch ? (
            <div className="glass-panel-gold p-6 rounded-2xl border border-amber-500/40 text-center space-y-5">
              <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm">
                <Sparkles className="w-4 h-4" /> Live Generated Smart QR Code
              </div>

              {/* QR Render */}
              <div className="bg-white p-4 rounded-2xl w-fit mx-auto shadow-2xl">
                <QRCodeSVG 
                  value={lastCreatedBatch.batchId} 
                  size={180}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-white">{lastCreatedBatch.medicineName}</div>
                <div className="text-xs font-mono text-amber-400 font-semibold">{lastCreatedBatch.batchId}</div>
                <div className="text-[11px] text-zinc-400">{lastCreatedBatch.manufacturerName}</div>
              </div>

              <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 text-left space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Linked Harvests:</span>
                  <span className="font-mono text-emerald-400 font-bold">{lastCreatedBatch.harvestIds.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">AI Authenticity:</span>
                  <span className="font-mono text-amber-300 font-bold">{lastCreatedBatch.aiVerificationScore}% Score</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Tx Hash:</span>
                  <span className="font-mono text-zinc-300 truncate max-w-[150px]">{lastCreatedBatch.blockchainTxHash}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 italic">Customers can scan this QR code on any mobile device or input batch ID directly in the Consumer Portal.</p>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl text-center text-zinc-500 space-y-3">
              <QrCode className="w-12 h-12 text-zinc-700 mx-auto animate-pulse" />
              <p className="text-sm">Complete the form to manufacture a new batch and generate its immutable QR Code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
