import React, { useState } from 'react';
import { DEMO_ECONOMICS } from '../../data/mockData';
import { Coins, TrendingUp, AlertTriangle, ArrowRight, ShieldCheck, Sliders, CheckCircle2 } from 'lucide-react';

interface EconomicsPageProps {
  onNavigate: (tab: string) => void;
}

export const EconomicsPage: React.FC<EconomicsPageProps> = ({ onNavigate }) => {
  // Dynamic sensitivity simulation parameters
  const [feedstockDelta, setFeedstockDelta] = useState(0); // -20% to +30%
  const [solventRecoveryRate, setSolventRecoveryRate] = useState(65); // 40% to 90%
  const [stepYieldVariance, setStepYieldVariance] = useState(0); // -15% to +15%

  // Baseline cost values
  const baseFeedstock = 96;
  const baseReagents = 118;
  const baseCatalyst = 41;
  const baseSolvent = 72;
  const baseEnergy = 38;
  const baseWaste = 63;

  // Recalculated dynamic costs
  const adjustedFeedstock = Math.round(baseFeedstock * (1 + feedstockDelta / 100));
  // Solvent recovery: 65% is baseline. If recovery goes up to 85%, solvent cost goes down.
  const adjustedSolvent = Math.round(baseSolvent * (1 - (solventRecoveryRate - 65) * 0.015));
  // Yield variance impact on total material throughput requirement
  const yieldFactor = 1 - (stepYieldVariance / 100) * 0.85;
  const adjustedReagents = Math.round(baseReagents * yieldFactor);
  const adjustedEnergy = baseEnergy;
  const adjustedWaste = Math.round(baseWaste * yieldFactor);

  const calculatedTotalCost = adjustedFeedstock + adjustedReagents + baseCatalyst + adjustedSolvent + adjustedEnergy + adjustedWaste;
  const benchmarkPrice = DEMO_ECONOMICS.benchmarkMarketPrice; // ₹680
  const grossMarginINR = benchmarkPrice - calculatedTotalCost;
  const grossMarginPercent = Math.round((grossMarginINR / benchmarkPrice) * 100);

  const costBreakdown = [
    { label: 'Feedstock Cost (Refinery Benzene)', cost: adjustedFeedstock, percentage: Math.round((adjustedFeedstock / calculatedTotalCost) * 100), color: 'bg-cyan-500' },
    { label: 'Reagent Cost (Oximes, HMTA, DMC)', cost: adjustedReagents, percentage: Math.round((adjustedReagents / calculatedTotalCost) * 100), color: 'bg-sky-400' },
    { label: 'Catalyst (TS-1, Cu(OAc)2 recycle)', cost: baseCatalyst, percentage: Math.round((baseCatalyst / calculatedTotalCost) * 100), color: 'bg-emerald-400' },
    { label: 'Solvent Makeup (EtOAc / MeOH)', cost: adjustedSolvent, percentage: Math.round((adjustedSolvent / calculatedTotalCost) * 100), color: 'bg-indigo-400' },
    { label: 'Thermal & Electrical Energy', cost: adjustedEnergy, percentage: Math.round((adjustedEnergy / calculatedTotalCost) * 100), color: 'bg-amber-400' },
    { label: 'Zero-Liquid Discharge Waste Treatment', cost: adjustedWaste, percentage: Math.round((adjustedWaste / calculatedTotalCost) * 100), color: 'bg-rose-400' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Coins className="w-3.5 h-3.5" />
          <span>TECHNO-ECONOMIC ASSESSMENT (TEA)</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Preliminary Techno-Economic Assessment
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Unit manufacturing cost models, OPEX breakdowns, and market gross-margin projections for Route B.
            </p>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            SIMULATED DEMO VALUES
          </span>
        </div>
      </div>

      {/* Main KPI Cost Banner */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            ESTIMATED CASH COST OF PRODUCTION
          </span>
          <div className="my-2">
            <div className="text-4xl font-extrabold font-mono text-white tabular-nums tracking-tight">
              ₹{calculatedTotalCost}
              <span className="text-sm font-sans text-slate-400 font-normal ml-1">/ kg</span>
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Baseline Model: <strong className="text-cyan-400">₹428 / kg</strong> (Route B)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            IMPORTED MARKET BENCHMARK PRICE
          </span>
          <div className="my-2">
            <div className="text-4xl font-extrabold font-mono text-cyan-400 tabular-nums tracking-tight">
              ₹{benchmarkPrice}
              <span className="text-sm font-sans text-slate-400 font-normal ml-1">/ kg</span>
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Landed CFR Import Tariff Price (Pharma Grade)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            PROJECTED GROSS CONTRIBUTION MARGIN
          </span>
          <div className="my-2 flex items-baseline gap-2">
            <div className="text-4xl font-extrabold font-mono text-emerald-400 tabular-nums tracking-tight">
              {grossMarginPercent}%
            </div>
            <span className="text-sm font-mono text-slate-300">
              (+₹{grossMarginINR}/kg)
            </span>
          </div>
          <div className="text-[11px] font-mono text-emerald-400">
            Robust commercial margin cushion (&gt;30%)
          </div>
        </div>
      </section>

      {/* Cost Waterfall Breakdown */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Manufacturing Cost Breakdown (₹{calculatedTotalCost} / kg Total)
            </h3>
            <span className="text-xs text-slate-400">Raw materials represent 50.0% of cash operating requirements</span>
          </div>
        </div>

        {/* Segmented Bar */}
        <div className="h-4 w-full bg-slate-800 rounded-lg flex overflow-hidden">
          {costBreakdown.map((item, idx) => (
            <div
              key={idx}
              style={{ width: `${item.percentage}%` }}
              className={`${item.color} h-full transition-all`}
              title={`${item.label}: ₹${item.cost}/kg (${item.percentage}%)`}
            ></div>
          ))}
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
          {costBreakdown.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-sm ${item.color}`}></span>
                <span className="text-slate-300 text-[11px]">{item.label}</span>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">₹{item.cost}/kg</div>
                <div className="text-slate-400 text-[10px]">{item.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Sensitivity Analysis Controls & Impact Simulator */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Sensitivity Simulation</span>
            </h3>
            <span className="text-xs text-slate-400">
              Stress-test commodity feedstock volatility, solvent loop recovery, and chemical yields
            </span>
          </div>
          <button
            onClick={() => {
              setFeedstockDelta(0);
              setSolventRecoveryRate(65);
              setStepYieldVariance(0);
            }}
            className="text-[11px] font-mono text-cyan-400 hover:underline"
          >
            Reset Sliders
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
          {/* Slider 1: Feedstock Cost */}
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Feedstock Cost Fluctuation</span>
              <span className={`font-bold ${feedstockDelta >= 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {feedstockDelta >= 0 ? `+${feedstockDelta}%` : `${feedstockDelta}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="40"
              value={feedstockDelta}
              onChange={(e) => setFeedstockDelta(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">
              Rule of Thumb: Feedstock +15% → Total cost +8.2%
            </div>
          </div>

          {/* Slider 2: Solvent Recovery */}
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Solvent Recovery Efficiency</span>
              <span className="font-bold text-cyan-400">{solventRecoveryRate}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="90"
              value={solventRecoveryRate}
              onChange={(e) => setSolventRecoveryRate(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">
              Rule of Thumb: Recovery 50% → 80% yields -6.4% OPEX savings
            </div>
          </div>

          {/* Slider 3: Step 3 Yield */}
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Step 3 Reaction Yield Shift</span>
              <span className={`font-bold ${stepYieldVariance >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {stepYieldVariance >= 0 ? `+${stepYieldVariance}%` : `${stepYieldVariance}%`}
              </span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              value={stepYieldVariance}
              onChange={(e) => setStepYieldVariance(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">
              Rule of Thumb: Yield 65% → 78% cuts cost by -11.3%
            </div>
          </div>
        </div>

        {/* Visual Line Chart for Sensitivity */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold">Feedstock Price Sensitivity Curve (₹/kg)</span>
            <span className="text-slate-400 text-[10px]">Product Cost vs Crude Benzene Price</span>
          </div>

          <div className="h-32 w-full flex items-end justify-between pt-6 px-2">
            {[
              { feed: '₹60/kg (-25%)', cost: 388, bar: '45%' },
              { feed: '₹75/kg (-10%)', cost: 408, bar: '55%' },
              { feed: '₹84/kg (Base)', cost: 428, bar: '68%', active: true },
              { feed: '₹95/kg (+15%)', cost: 462, bar: '80%' },
              { feed: '₹110/kg (+30%)', cost: 494, bar: '95%' },
            ].map((p, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <span className={`text-[10px] font-mono ${p.active ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                  ₹{p.cost}
                </span>
                <div className="w-8 sm:w-12 bg-slate-900 rounded-t h-20 relative flex items-end">
                  <div
                    className={`w-full rounded-t transition-all ${
                      p.active ? 'bg-cyan-500' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    style={{ height: p.bar }}
                  ></div>
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1 text-center">
                  {p.feed}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HMEL Specific Refinery Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 flex items-start gap-3">
        <span className="text-cyan-400 text-sm mt-0.5">ℹ</span>
        <p className="leading-relaxed">
          Preliminary estimate only. Actual economics require verified HMEL-specific costs, yields, utility consumption and plant data. Cash costs exclude plant depreciation, class-4 capital expenditure financing, and site overhead allocations.
        </p>
      </div>
    </div>
  );
};
