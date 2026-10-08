import React from 'react';
import { SUPPLY_CHAIN_MATERIALS } from '../../data/mockData';
import { Truck, ShieldCheck, AlertTriangle, Globe, Factory, ArrowRight } from 'lucide-react';

interface SupplyChainPageProps {
  onNavigate: (tab: string) => void;
}

export const SupplyChainPage: React.FC<SupplyChainPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Truck className="w-3.5 h-3.5" />
          <span>UPSTREAM SOURCING & DOMESTIC RISK INTELLIGENCE</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Raw Material &amp; Supply Chain Intelligence
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Screen geopolitical vulnerability, domestic vendor concentration, and import substitution feasibility for Route B.
            </p>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
            Route B Reagent Envelope
          </span>
        </div>
      </div>

      {/* 5 Risk Assessment Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">DOMESTIC AVAILABILITY</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1.5">75%</div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">
            Majority sourced from Indian petrochem base
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">IMPORT DEPENDENCE</span>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-1.5">25%</div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">
            Reagent C hydroxylamine salt import exposed
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">SUPPLIER CONCENTRATION</span>
            <div className="text-2xl font-bold font-mono text-white mt-1.5">Moderate</div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">
            Catalyst TS-1 has 2 qualified producers
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">PRICE VOLATILITY</span>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-1.5">Low–Mod</div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">
            Crude-indexed feedstock with stable spreads
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">CRITICAL MATERIAL RISK</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1.5">None</div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">
            Zero PGMs (Palladium/Platinum/Rhodium)
          </div>
        </div>
      </section>

      {/* Upstream Material Intelligence Table */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Key Bill of Materials &amp; Sourcing Security (Route B)
            </h2>
            <span className="text-xs text-slate-400">Inventory lead times, domestic vendor coverage, and estimated spot pricing</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
            6 Tracked Materials
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/90 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Material Name</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Global Avail.</th>
                <th className="py-3 px-3">Domestic Avail.</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3">Estimated Cost</th>
                <th className="py-3 px-3">Lead Time</th>
                <th className="py-3 px-4">Supplier Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {SUPPLY_CHAIN_MATERIALS.map((mat, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">
                    {mat.material}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px]">
                      {mat.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">
                    {mat.globalAvailability}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className={mat.domesticAvailability === 'High' ? 'text-emerald-400' : mat.domesticAvailability === 'Medium' ? 'text-amber-400' : 'text-rose-400'}>
                      {mat.domesticAvailability}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                      mat.riskLevel === 'Low Risk'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                        : mat.riskLevel === 'Medium Risk'
                        ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                        : 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                    }`}>
                      {mat.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-white">
                    {mat.estimatedCostUnit}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">
                    {mat.leadTimeWeeks} wk{mat.leadTimeWeeks > 1 ? 's' : ''}
                  </td>
                  <td className="py-3 px-4 text-slate-300 text-xs">
                    {mat.supplierStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Strategic Mitigations Card */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Strategic Supply Chain Mitigations</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">1. Captive Benzene Integration</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              Direct pipeline transfer from refinery reformate eliminates external trucking tariffs and mitigates spot price shocks.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold block">2. Dual-Sourcing Reagent C</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              Evaluating domestic hydrazine-sulfate based alternatives to eliminate Chinese import reliance on hydroxylamine sulfate.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block">3. Closed-Loop Solvent Sourcing</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              On-site continuous solvent distillation recovers 88% of ethyl acetate, limiting merchant solvent top-up to minimal makeup quantities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
