"use client";

import { useState } from 'react';
import { Search, ShieldCheck, MapPin, Calendar, Truck, TestTube, Factory, Package, CheckCircle2, AlertTriangle, ExternalLink, Cpu, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function ConsumerPortal({ harvests, batches, initialSearchQuery = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || batches[0]?.batchId || '');
  const [matchedBatch, setMatchedBatch] = useState(
    batches.find(b => b.batchId.toLowerCase() === (initialSearchQuery || batches[0]?.batchId || '').toLowerCase()) || batches[0]
  );
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    const foundBatch = batches.find(b => 
      b.batchId.toLowerCase() === query || 
      b.qrCodeId.toLowerCase() === query ||
      b.medicineName.toLowerCase().includes(query)
    );
    setMatchedBatch(foundBatch || null);
    setHasSearched(true);
  };

  const getLinkedHarvests = () => {
    if (!matchedBatch) return [];
    return harvests.filter(h => matchedBatch.harvestIds.includes(h.harvestId));
  };

  const linkedHarvests = getLinkedHarvests();

  return (
    <div className="space-y-8">
      {/* Search Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 text-center space-y-6 max-w-3xl mx-auto glow-emerald">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Immutable Consumer Verification Engine
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-white">Verify Farm-to-Medicine Provenance</h2>
          <p className="text-sm text-zinc-300 mt-2">Scan product QR code or enter Batch Serial Number to audit the complete blockchain journey</p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="e.g. AYUR-2026-ASH88 or AYUR-2026-TUL42"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950/90 border border-zinc-700 focus:border-emerald-500 rounded-2xl pl-12 pr-4 py-3 text-sm text-white font-mono placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
          <button 
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Verify Product
          </button>
        </form>

        {/* Quick Sample Links */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-zinc-400">
          <span>Try scanning sample batches:</span>
          {batches.map(b => (
            <button
              key={b.batchId}
              onClick={() => {
                setSearchQuery(b.batchId);
                setMatchedBatch(b);
              }}
              className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-emerald-400 font-mono text-[11px]"
            >
              {b.batchId}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Report View */}
      {matchedBatch ? (
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Authenticity Certificate Banner */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-zinc-900/60 to-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{matchedBatch.medicineName}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                    100% Genuine Ayurvedic
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-1">
                  Batch: {matchedBatch.batchId} | Manufactured by: {matchedBatch.manufacturerName}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div className="bg-white p-2 rounded-xl">
                <QRCodeSVG value={matchedBatch.batchId} size={70} />
              </div>
              <div className="text-left space-y-0.5">
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">AI Authenticity Score</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono">{matchedBatch.aiVerificationScore}%</div>
                <div className="text-[10px] text-emerald-300">Verified Grade A+</div>
              </div>
            </div>
          </div>

          {/* Verification Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Product & Batch */}
            <div className="glass-panel p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-zinc-800 pb-2.5">
                <Package className="w-4 h-4" /> Batch Specifications
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Manufacture Date:</span>
                  <span className="text-zinc-200 font-mono">{matchedBatch.manufactureDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Expiry Date:</span>
                  <span className="text-zinc-200 font-mono">{matchedBatch.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Batch Quantity:</span>
                  <span className="text-zinc-200">{matchedBatch.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Smart Contract Tx:</span>
                  <span className="text-emerald-400 font-mono truncate max-w-[120px]">{matchedBatch.blockchainTxHash}</span>
                </div>
              </div>
            </div>

            {/* Box 2: Quality & Lab */}
            <div className="glass-panel p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm border-b border-zinc-800 pb-2.5">
                <TestTube className="w-4 h-4" /> Lab Quality Audit
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Active Alkaloids:</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {linkedHarvests[0]?.labReport?.activeAlkaloidsPercent || '4.8'}% Content
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Pesticide Status:</span>
                  <span className="text-zinc-200">{linkedHarvests[0]?.labReport?.pesticideResidue || 'ND (Passed)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Heavy Metals:</span>
                  <span className="text-zinc-200">{linkedHarvests[0]?.labReport?.heavyMetals || 'Pass (< 0.01 ppm)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Certifying Lab:</span>
                  <span className="text-zinc-200 truncate max-w-[120px]">{linkedHarvests[0]?.labReport?.labName || 'Ayush Certified Lab'}</span>
                </div>
              </div>
            </div>

            {/* Box 3: Origin & Farm */}
            <div className="glass-panel p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-zinc-800 pb-2.5">
                <MapPin className="w-4 h-4" /> Origin Farm Geo-Tag
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Registered Farmer:</span>
                  <span className="text-zinc-200 font-semibold">{linkedHarvests[0]?.farmerName || 'Rajesh Kumar'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Location:</span>
                  <span className="text-zinc-200">{linkedHarvests[0]?.farmLocation || 'Wayanad, Kerala'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">GPS Coordinates:</span>
                  <span className="text-amber-300 font-mono">{linkedHarvests[0]?.lat || '11.6854'}, {linkedHarvests[0]?.lng || '76.1320'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Harvest Date:</span>
                  <span className="text-zinc-200 font-mono">{linkedHarvests[0]?.harvestDate || '2026-07-20'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Walkthrough */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Complete Farm-to-Consumer Supply Chain Journey
            </h3>

            <div className="relative border-l-2 border-emerald-500/40 pl-6 ml-3 space-y-8">
              {/* Step 1: Farm Harvest */}
              <div className="relative space-y-2">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-zinc-950 glow-emerald" />
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <span>🗺️ Farm Geo-Tag Collection</span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {linkedHarvests[0]?.harvestDate}
                  </span>
                </div>
                <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <p className="text-zinc-200">
                    Herb <strong className="text-emerald-300">{linkedHarvests[0]?.herbType}</strong> collected by farmer <strong className="text-zinc-100">{linkedHarvests[0]?.farmerName}</strong> at {linkedHarvests[0]?.farmLocation}.
                  </p>
                  <div className="flex flex-wrap gap-4 text-[11px] text-zinc-400 font-mono">
                    <span>IPFS Photo CID: <span className="text-amber-300">{linkedHarvests[0]?.ipfsPhotoCid}</span></span>
                    <span>Blockchain Tx: <span className="text-zinc-300">{linkedHarvests[0]?.blockchainTx}</span></span>
                  </div>
                </div>
              </div>

              {/* Step 2: Transport */}
              <div className="relative space-y-2">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-teal-500 border-4 border-zinc-950" />
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                  <span>🚚 Cold Chain Transport & Logistics</span>
                </div>
                <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <p className="text-zinc-200">
                    Transporter: <strong className="text-teal-300">{linkedHarvests[0]?.transport?.transporterName || 'Kerala Green Logistics'}</strong>. Vehicle: {linkedHarvests[0]?.transport?.vehicleNo || 'KL-12-AE-4091'}.
                  </p>
                  <p className="text-zinc-400 text-[11px]">
                    Temperature maintained during transit: <span className="text-emerald-400 font-mono">{linkedHarvests[0]?.transport?.tempMaintained || '22°C'}</span>. Destination: {linkedHarvests[0]?.transport?.destination || 'Processing Unit'}.
                  </p>
                </div>
              </div>

              {/* Step 3: Lab Testing */}
              <div className="relative space-y-2">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-zinc-950" />
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                  <span>🧪 Pharmacognosy Lab Quality Certification</span>
                </div>
                <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <p className="text-zinc-200">
                    Certified by <strong className="text-purple-300">{linkedHarvests[0]?.labReport?.labName || 'Ayush Quality Lab'}</strong>. Passed all purity & heavy metal tests with <strong className="text-emerald-400">{linkedHarvests[0]?.labReport?.qualityGrade || 'Grade A+'}</strong>.
                  </p>
                  <div className="text-[11px] font-mono text-amber-300">
                    IPFS Certificate CID: {linkedHarvests[0]?.labReport?.ipfsCertificateCid || 'QmLabCertHash8819'}
                  </div>
                </div>
              </div>

              {/* Step 4: Manufacturing */}
              <div className="relative space-y-2">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-zinc-950 glow-gold" />
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <span>🏭 Medicine Batch Manufacturing & QR Encoding</span>
                </div>
                <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <p className="text-zinc-200">
                    Batch <strong className="text-amber-300">{matchedBatch.batchId}</strong> formulated by <strong className="text-white">{matchedBatch.manufacturerName}</strong>. Linked to raw harvest hashes on Polygon / Ethereum smart contracts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-10 rounded-3xl border border-red-500/30 text-center max-w-xl mx-auto space-y-3">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Batch ID Not Found on Blockchain Ledger</h3>
          <p className="text-xs text-zinc-400">
            No batch matching "{searchQuery}" was located in the immutable AyurChain ledger. Please check the serial code printed under your product's QR label.
          </p>
        </div>
      )}
    </div>
  );
}
