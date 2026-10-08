import React from 'react';
import { DEMO_ROUTES } from '../../data/mockData';
import { RadarChart } from '../common/RadarChart';
import { GitCompare, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

interface RouteComparisonPageProps {
  onNavigate: (tab: string) => void;
}

export const RouteComparisonPage: React.FC<RouteComparisonPageProps> = ({ onNavigate }) => {
  const [routeA, routeB, routeC] = DEMO_ROUTES;

  const comparisonRows = [
    { label: 'Technical Feasibility', a: 84, b: 76, c: 71, unit: '/100', higherBetter: true },
    { label: 'Economic Potential', a: 88, b: 79, c: 73, unit: '/100', higherBetter: true },
    { label: 'Green Chemistry', a: 67, b: 91, c: 78, unit: '/100', higherBetter: true, highlightBest: 'b' },
    { label: 'Raw-Material Availability', a: 62, b: 75, c: 92, unit: '/100', higherBetter: true, highlightBest: 'c' },
    { label: 'Scale-Up Suitability', a: 78, b: 82, c: 80, unit: '/100', higherBetter: true, highlightBest: 'b' },
    { label: 'Data Confidence', a: 86, b: 74, c: 69, unit: '/100', higherBetter: true, highlightBest: 'a' },
    { label: 'Number of Steps', a: '3 steps', b: '4 steps', c: '4 steps', unit: '', isText: true, highlightBest: 'a' },
    { label: 'Estimated Overall Yield', a: '71.2%', b: '64.8%', c: '59.4%', unit: '', isText: true, highlightBest: 'a' },
    { label: 'E-Factor (Waste/Product)', a: '16.4', b: '8.4', c: '12.8', unit: 'kg/kg', isText: true, highlightBest: 'b' },
    { label: 'Process Mass Intensity (PMI)', a: '22.8', b: '14.7', c: '18.2', unit: 'kg/kg', isText: true, highlightBest: 'b' },
    { label: 'Solvent Burden Score', a: 61, b: 85, c: 72, unit: '/100', higherBetter: true, highlightBest: 'b' },
    { label: 'Energy Intensity Index', a: 75, b: 54, c: 68, unit: '/100', higherBetter: false, highlightBest: 'b' },
    { label: 'Combined Forge Score', a: 77, b: 81, c: 78, unit: '/100', isTotal: true, highlightBest: 'b' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <GitCompare className="w-3.5 h-3.5" />
          <span>MULTI-ATTRIBUTE TRADE-OFF AUDIT</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Route Comparison
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Rigorous side-by-side screening comparing feasibility, economics, green chemistry, and supply security.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('forge-score')}
              className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Adjust Forge Score Weights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix Table */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Retrosynthetic Candidate Pathways Matrix
            </h2>
            <span className="text-xs text-slate-400">Target: Demo Aromatic Intermediate A (Benzene Source)</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            SIMULATED BENCHMARK VALUES
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-300 font-mono text-[11px]">
                <th className="py-4 px-4 w-1/4">Evaluation Attribute</th>
                <th className="py-4 px-4 w-1/4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-400">Route A — Shortest</span>
                    <span className="text-slate-400 font-normal">3 Steps</span>
                  </div>
                </th>
                <th className="py-4 px-4 w-1/4 bg-emerald-950/20 border-x border-emerald-500/30 relative">
                  <div className="absolute -top-0.5 left-0 right-0 h-1 bg-emerald-400"></div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300">Route B — Balanced</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                </th>
                <th className="py-4 px-4 w-1/4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">Route C — Availability</span>
                    <span className="text-slate-400 font-normal">4 Steps</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    row.isTotal ? 'bg-slate-950/80 font-bold border-t-2 border-slate-700' : ''
                  }`}
                >
                  <td className={`py-3 px-4 text-slate-300 ${row.isTotal ? 'text-white font-semibold' : ''}`}>
                    {row.label}
                  </td>

                  {/* Route A Cell */}
                  <td className="py-3 px-4 font-mono text-slate-200">
                    <div className="flex items-center justify-between">
                      <span className={row.highlightBest === 'a' ? 'text-sky-300 font-bold' : ''}>
                        {row.a} {row.unit}
                      </span>
                    </div>
                  </td>

                  {/* Route B Cell (Highlighted) */}
                  <td className="py-3 px-4 font-mono bg-emerald-950/15 border-x border-emerald-500/20 text-slate-100">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${row.isTotal ? 'text-emerald-400 text-sm font-bold' : 'text-emerald-300'}`}>
                        {row.b} {row.unit}
                      </span>
                      {row.highlightBest === 'b' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                  </td>

                  {/* Route C Cell */}
                  <td className="py-3 px-4 font-mono text-slate-200">
                    <div className="flex items-center justify-between">
                      <span className={row.highlightBest === 'c' ? 'text-amber-300 font-bold' : ''}>
                        {row.c} {row.unit}
                      </span>
                      {row.highlightBest === 'c' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Visual Radar Comparison & Explainability Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Radar Chart Visual (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Multi-Attribute Polygon Radar
            </h3>
            <span className="text-[10px] font-mono text-slate-400">6 Strategic Dimensions</span>
          </div>

          <RadarChart className="my-2" />

          <p className="text-[11px] text-slate-400 text-center font-mono mt-2">
            Route B exhibits the most symmetric polygon area, balancing superior green metrics without crippling availability.
          </p>
        </div>

        {/* Explainability & Uncertainty Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Why Route B? Card */}
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-6 space-y-4 shadow-lg shadow-emerald-950/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Why Route B?
              </h3>
            </div>

            <blockquote className="p-3.5 rounded-lg bg-slate-950 border-l-4 border-emerald-400 text-xs text-slate-200 leading-relaxed font-mono">
              "Route B is recommended for initial validation because it uses one additional transformation but provides a stronger sustainability profile, acceptable technical confidence, practical raw-material availability and better scale-up characteristics."
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">
                  ✓ High Environmental Score (91/100)
                </span>
                <p className="text-slate-400">
                  E-factor cut in half (8.4 vs 16.4 in Route A). Zero hazardous cyanide or toxic heavy metal wastewater streams.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">
                  ✓ Superior Scale-Up Safety (82/100)
                </span>
                <p className="text-slate-400">
                  Operates under mild atmospheric pressure (&lt;1.2 bar) and moderate temperatures (&lt;90 °C) without autoclave pressure ratings.
                </p>
              </div>
            </div>

            {/* Main Uncertainty Callout */}
            <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-bold block font-mono">
                  KEY SCIENTIFIC UNCERTAINTY
                </strong>
                <p className="mt-0.5 text-slate-300 font-mono">
                  "Main uncertainty: Step 3 predicted yield requires laboratory validation."
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  The continuous condensation step has strong academic kinetic precedent, but requires bench-scale verification of mother liquor recycling.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => onNavigate('validation')}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Proceed to Laboratory Validation Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
