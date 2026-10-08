import React, { useState } from 'react';
import { TOP_OPPORTUNITIES } from '../../data/mockData';
import { ArrowUpRight, Search, Filter, ShieldCheck, ChevronRight } from 'lucide-react';
import { OpportunityItem } from '../../types/chemistry';

interface CommandCenterPageProps {
  onSelectOpportunity: (opp: OpportunityItem) => void;
  onNavigate: (tab: string) => void;
}

export const CommandCenterPage: React.FC<CommandCenterPageProps> = ({
  onSelectOpportunity,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortField, setSortField] = useState<'forgeScore' | 'sustainabilityScore' | 'stepsCount'>('forgeScore');

  const categories = ['All', 'Pharmaceutical Intermediate', 'Specialty Chemical', 'Polymer Additive', 'Advanced Material', 'Agrochemical Intermediate'];

  const filteredOpportunities = TOP_OPPORTUNITIES
    .filter(item => {
      const matchesSearch = item.moleculeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.feedstockId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sortField === 'stepsCount') return a.stepsCount - b.stepsCount;
      return (b[sortField] || 0) - (a[sortField] || 0);
    });

  // Pipeline funnel numbers
  const pipeline = [
    { stage: 'Discovered', count: 24, percentage: '100%', color: 'bg-cyan-500' },
    { stage: 'Screened', count: 18, percentage: '75%', color: 'bg-sky-500' },
    { stage: 'Shortlisted', count: 12, percentage: '50%', color: 'bg-indigo-500' },
    { stage: 'Validation', count: 7, percentage: '29%', color: 'bg-emerald-500' },
    { stage: 'Approved for Pilot', count: 2, percentage: '8%', color: 'bg-teal-400' },
  ];

  // Feedstock distribution
  const feedstocksDist = [
    { name: 'Benzene', share: 31, color: 'bg-cyan-500' },
    { name: 'Phenol', share: 24, color: 'bg-sky-400' },
    { name: 'Toluene', share: 19, color: 'bg-indigo-400' },
    { name: 'Xylene', share: 15, color: 'bg-purple-400' },
    { name: 'Hexane', share: 7, color: 'bg-amber-400' },
    { name: 'Other', share: 4, color: 'bg-slate-400' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>EXECUTIVE R&D PORTFOLIO MONITOR</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Molecule Forge Command Center
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Explore refinery-derived chemical opportunities and prioritize routes for validation.
        </p>
      </div>

      {/* Top 6 KPI Cards */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">Feedstocks Analyzed</div>
          <div className="text-2xl font-bold font-mono text-white mt-1.5 tabular-nums">07</div>
          <div className="text-[10px] text-slate-400 mt-1">CCR & PyGas Streams</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">Product Opportunities</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1.5 tabular-nums">24</div>
          <div className="text-[10px] text-slate-400 mt-1">High-margin derivatives</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">Candidate Routes</div>
          <div className="text-2xl font-bold font-mono text-white mt-1.5 tabular-nums">68</div>
          <div className="text-[10px] text-slate-400 mt-1">Retrosynthetic models</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">High-Priority Routes</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1.5 tabular-nums">12</div>
          <div className="text-[10px] text-slate-400 mt-1">Forge Score &gt; 80</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">Average Forge Score</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1.5 tabular-nums">82.4</div>
          <div className="text-[10px] text-slate-400 mt-1">Across top candidates</div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">Requiring Validation</div>
          <div className="text-2xl font-bold font-mono text-sky-400 mt-1.5 tabular-nums">09</div>
          <div className="text-[10px] text-slate-400 mt-1">Ready for screening</div>
        </div>
      </section>

      {/* Analytics Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart 1: Opportunity Pipeline Funnel */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Opportunity Pipeline
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Stage Funnel</span>
            </div>

            <div className="space-y-3">
              {pipeline.map((item) => (
                <div key={item.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{item.stage}</span>
                    <span className="font-mono text-white font-medium tabular-nums">{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${(item.count / 24) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>2 Ready for Pilot Demonstration</span>
            <span className="text-cyan-400">8.3% Conversion</span>
          </div>
        </div>

        {/* Chart 2: Feedstock Opportunity Distribution */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Feedstock Distribution
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Aromatics Share</span>
            </div>

            {/* Segmented Distribution Bar */}
            <div className="h-4 w-full bg-slate-800 rounded-lg flex overflow-hidden mb-4">
              {feedstocksDist.map(f => (
                <div
                  key={f.name}
                  style={{ width: `${f.share}%` }}
                  className={`${f.color} h-full transition-all`}
                  title={`${f.name}: ${f.share}%`}
                ></div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {feedstocksDist.map(f => (
                <div key={f.name} className="flex items-center justify-between p-2 rounded bg-slate-950/40 border border-slate-800/50">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${f.color}`}></span>
                    <span className="text-slate-300">{f.name}</span>
                  </div>
                  <span className="font-mono text-slate-200 tabular-nums">{f.share}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
            Benzene & Phenol account for 55% of all identified high-value opportunities.
          </div>
        </div>

        {/* Chart 3: Route Quality Donut / Confidence */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Route Quality
              </h3>
              <span className="text-[10px] font-mono text-slate-400">68 Total Routes</span>
            </div>

            {/* Donut representation */}
            <div className="flex items-center justify-center my-3">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* High Confidence: 42 / 68 = 61.8% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.5"
                    strokeDasharray="61.8, 100"
                    strokeDashoffset="0"
                  />
                  {/* Medium Confidence: 19 / 68 = 27.9% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="3.5"
                    strokeDasharray="27.9, 100"
                    strokeDashoffset="-61.8"
                  />
                  {/* Low Confidence: 7 / 68 = 10.3% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3.5"
                    strokeDasharray="10.3, 100"
                    strokeDashoffset="-89.7"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xl font-bold font-mono text-white">68</span>
                  <span className="block text-[9px] font-mono text-slate-400">ROUTES</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  High Confidence
                </span>
                <span className="text-white font-medium">42 (62%)</span>
              </div>
              <div className="flex items-center justify-between text-sky-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  Medium Confidence
                </span>
                <span className="text-white font-medium">19 (28%)</span>
              </div>
              <div className="flex items-center justify-between text-amber-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Low Confidence
                </span>
                <span className="text-white font-medium">07 (10%)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
            Routes with literature or verified plant kinetic validation.
          </div>
        </div>
      </section>

      {/* Top Opportunities Table */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-white">Top Chemical Opportunities</h2>
            <p className="text-xs text-slate-400">Ranked by commercial potential and synthesized Forge Score</p>
          </div>

          {/* Controls: Search and Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search molecule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-cyan-500 w-44"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-hidden focus:border-cyan-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-[11px] font-mono text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Molecule</th>
                <th className="py-3 px-3">Feedstock</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Steps</th>
                <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => setSortField('forgeScore')}>
                  Forge Score ↕
                </th>
                <th className="py-3 px-3">Market Potential</th>
                <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => setSortField('sustainabilityScore')}>
                  Sustainability ↕
                </th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredOpportunities.map((opp) => (
                <tr key={opp.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{opp.moleculeName}</div>
                    <div className="text-[10px] font-mono text-slate-400">{opp.formula}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300 capitalize">
                    {opp.feedstockId}
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {opp.category}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">
                    {opp.stepsCount} steps
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-sm text-cyan-400">
                      {opp.forgeScore}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">/100</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">
                    {opp.targetPriceINR}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 font-mono">
                      <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${opp.sustainabilityScore}%` }}
                        ></div>
                      </div>
                      <span className="text-slate-300 text-[11px]">{opp.sustainabilityScore}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                      opp.status === 'Approved for Pilot'
                        ? 'bg-teal-950/60 text-teal-300 border-teal-500/40'
                        : opp.status === 'Validation'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        : opp.status === 'Shortlisted'
                        ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {opp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        onSelectOpportunity(opp);
                        onNavigate('routes');
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium rounded bg-slate-800 hover:bg-cyan-700 text-slate-200 hover:text-white transition-colors"
                    >
                      View Routes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
