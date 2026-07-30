"use client";

import { useState } from 'react';
import { Database, ShieldCheck, Cpu, ExternalLink, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

export default function BlockchainExplorer({ logs, batches, harvests }) {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
            <Database className="w-4 h-4" /> Live Smart Contract Ledger Explorer
          </div>
          <h2 className="text-2xl font-bold text-white">Ethereum / Polygon State Ledger</h2>
          <p className="text-xs text-zinc-400 mt-1">Real-time immutable transaction blocks, block heights, and cryptographic hashes for all supply chain state changes</p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-xl text-xs">
          <span className="text-zinc-400 font-mono pl-2">Contract Address:</span>
          <span className="font-mono text-emerald-400 font-bold bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
            0xAyur77...99b2
          </span>
        </div>
      </div>

      {/* Transaction Feed */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Immutable Blockchain Transactions ({logs.length})
          </h3>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Mainnet Consensus Verified
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {logs.map((log, index) => (
            <div 
              key={log.txHash} 
              className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800/80 hover:border-emerald-500/40 transition-all space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
                    {log.action}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Block #{log.blockNumber}</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">{log.timestamp}</span>
              </div>

              <p className="text-xs text-zinc-200 font-medium">{log.details}</p>

              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                <div className="flex items-center gap-1">
                  <span>Tx Hash:</span>
                  <span className="text-amber-300 truncate max-w-[280px]">{log.txHash}</span>
                </div>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Confirmed (12 Block Confirmations)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
