import React, { useState } from 'react';
import { DEMO_SUSTAINABILITY } from '../../data/mockData';
import { Leaf, Droplets, Zap, Recycle, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface SustainabilityPageProps {
  onNavigate: (tab: string) => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ onNavigate }) => {
  const [activeRouteComparison, setActiveRouteComparison] = useState<'b' | 'a' | 'c'>('b');

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
          <Leaf className="w-3.5 h-3.5" />
          <span>ENVIRONMENTAL METRICS & CIRCULAR CHEMISTRY</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Green Chemistry &amp; Process Sustainability
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Rigorous E-factor, mass intensity, and effluent profiling to identify zero-liquid-discharge compliance bottlenecks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
              Evaluated for Route B (Recommended)
            </span>
          </div>
        </div>
      </div>

      {/* Main 6 Metric Cards */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">E-FACTOR</span>
              <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-cyan-300">Estimated</span>
            </div>
            <div className="text-3xl font-bold font-mono text-emerald-400 mt-1.5 tabular-nums">
              8.4
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">kg waste / kg product</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">PMI (MASS INTENSITY)</span>
              <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-cyan-300">Estimated</span>
            </div>
            <div className="text-3xl font-bold font-mono text-white mt-1.5 tabular-nums">
              14.7
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">kg total mass / kg product</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">ATOM ECONOMY</span>
              <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-emerald-300">Indicative</span>
            </div>
            <div className="text-3xl font-bold font-mono text-emerald-400 mt-1.5 tabular-nums">
              72%
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">Theoretical conversion</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">SOLVENT BURDEN</span>
              <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-sky-300">Indicative</span>
            </div>
            <div className="text-xl font-bold font-mono text-white mt-2">
              Low–Mod
            </div>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-2">EtOAc/Water systems</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">ENERGY INTENSITY</span>
              <span className="text-[9px] font-mono px-1 rounded bg-amber-950/60 text-amber-300">Requires Val</span>
            </div>
            <div className="text-xl font-bold font-mono text-white mt-2">
              Moderate
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">&lt;90 °C heating cycle</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">WATER USAGE</span>
              <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-cyan-300">Estimated</span>
            </div>
            <div className="text-3xl font-bold font-mono text-cyan-400 mt-1.5 tabular-nums">
              1.8
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-2">m³ water / ton product</div>
        </div>
      </section>

      {/* Sustainability Comparison Across Routes & Waste Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Sustainability Benchmark Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              E-Factor &amp; PMI Comparison Across Candidate Routes
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Lower is better</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Route B */}
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-emerald-300 font-bold">Route B — Balanced (Recommended)</span>
                <span className="text-emerald-400 font-bold">E-Factor: 8.4 kg/kg</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '38%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Process Mass Intensity (PMI): 14.7</span>
                <span className="text-emerald-400">-49% Waste vs Route A</span>
              </div>
            </div>

            {/* Route A */}
            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sky-300 font-bold">Route A — Shortest Route</span>
                <span className="text-amber-400 font-bold">E-Factor: 16.4 kg/kg</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '74%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Process Mass Intensity (PMI): 22.8</span>
                <span className="text-amber-400">Heavy cyanide / copper salts</span>
              </div>
            </div>

            {/* Route C */}
            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-300 font-bold">Route C — Domestic Bulk</span>
                <span className="text-slate-200 font-bold">E-Factor: 12.8 kg/kg</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-sky-400 h-full rounded-full" style={{ width: '58%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Process Mass Intensity (PMI): 18.2</span>
                <span className="text-slate-400">Spent mineral acid stream</span>
              </div>
            </div>
          </div>
        </div>

        {/* Waste Breakdown Bar Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Waste Stream Breakdown (Route B)
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Total 8.4 kg/kg Product</span>
          </div>

          <div className="space-y-3 pt-1">
            {DEMO_SUSTAINABILITY.wasteBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-medium">{item.category}</span>
                  <span className="font-mono text-white">
                    {item.kgPerKgProduct} kg/kg ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      idx === 0
                        ? 'bg-sky-400'
                        : idx === 1
                        ? 'bg-amber-400'
                        : idx === 2
                        ? 'bg-cyan-400'
                        : idx === 3
                        ? 'bg-purple-400'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            Recoverable solvents (EtOAc / MeOH) constitute 38% of waste and can be recycled up to 88% via fractional vacuum distillation.
          </div>
        </div>
      </section>

      {/* Process Intensity & Operational Demands */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Process Severity &amp; Unit Operations Intensity
            </h3>
            <span className="text-xs text-slate-400">
              Evaluates plant utility strain, pressure hazards, and crystallization separation bottlenecks
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono">
          {DEMO_SUSTAINABILITY.processIntensity.map((p, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 text-[10px]">SEVERITY</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    p.severity === 'Mild' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {p.severity}
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs mt-1">{p.operation}</h4>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-2">{p.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Actionable Improvement Recommendations */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <Recycle className="w-4 h-4 text-emerald-400" />
          <span>Actionable Sustainability Optimization Levers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {DEMO_SUSTAINABILITY.recommendations.map((rec, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-slate-200 leading-relaxed font-sans">{rec}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
