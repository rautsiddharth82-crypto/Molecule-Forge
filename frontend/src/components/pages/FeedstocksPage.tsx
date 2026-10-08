import React, { useState } from 'react';
import { FEEDSTOCKS } from '../../data/mockData';
import { Feedstock } from '../../types/chemistry';
import { ChemicalStructureSvg } from '../common/ChemicalStructureSvg';
import { Layers, ChevronRight, AlertTriangle, ShieldCheck, ArrowRight, GitBranch } from 'lucide-react';

interface FeedstocksPageProps {
  onNavigate: (tab: string) => void;
  onSelectFeedstockForRoutes: (feedstockId: string) => void;
}

export const FeedstocksPage: React.FC<FeedstocksPageProps> = ({
  onNavigate,
  onSelectFeedstockForRoutes,
}) => {
  const [selectedFeedstock, setSelectedFeedstock] = useState<Feedstock>(FEEDSTOCKS[0]);
  const [expandedTreeFamily, setExpandedTreeFamily] = useState<string | null>(FEEDSTOCKS[0].downstreamTree[0]?.family || null);

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>REFINERY INTEGRATION & ASSET PROFILING</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Feedstock Intelligence
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Characterize core refinery streams and model multi-tier downstream derivative trees.
        </p>
      </div>

      {/* Feedstock Cards Ribbon (5 primary feedstocks) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {FEEDSTOCKS.map((feed) => {
          const isSelected = selectedFeedstock.id === feed.id;
          return (
            <div
              key={feed.id}
              onClick={() => {
                setSelectedFeedstock(feed);
                setExpandedTreeFamily(feed.downstreamTree[0]?.family || null);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    Available
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    Score: {feed.opportunityScore}
                  </span>
                </div>

                <div className="h-16 flex items-center justify-center my-1">
                  <ChemicalStructureSvg moleculeKey={feed.formula} width={90} height={60} />
                </div>

                <h3 className="text-base font-bold text-white tracking-tight mt-1">
                  {feed.name}
                </h3>
                <div className="text-xs font-mono text-slate-400">
                  Formula: {feed.formula}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Purity:</span>
                  <span className="text-white font-medium">{feed.purity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Downstream Opps:</span>
                  <span className="text-cyan-400 font-medium">{feed.downstreamOpportunitiesCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Active Feedstock Detailed Intelligence View */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <ChemicalStructureSvg moleculeKey={selectedFeedstock.formula} width={100} height={80} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{selectedFeedstock.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  CAS {selectedFeedstock.casNumber}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Refinery Origin: {selectedFeedstock.refineryStream}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectFeedstockForRoutes(selectedFeedstock.id);
                onNavigate('routes');
              }}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <span>Explore {selectedFeedstock.name} Routes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Specifications & Parameters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[10px]">CHEMICAL PURITY</div>
            <div className="text-white text-base font-bold mt-0.5">{selectedFeedstock.purity}</div>
            <div className="text-slate-400 text-[10px] mt-0.5">ASTM D4734 Grade</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[10px]">BOILING POINT &amp; DENSITY</div>
            <div className="text-white text-base font-bold mt-0.5">{selectedFeedstock.boilingPoint}</div>
            <div className="text-slate-400 text-[10px] mt-0.5">{selectedFeedstock.density}</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[10px]">DOMESTIC LOGISTICS</div>
            <div className="text-emerald-400 text-base font-bold mt-0.5">{selectedFeedstock.domesticAvailability}</div>
            <div className="text-slate-400 text-[10px] mt-0.5">Pipeline / Rail Tank Car</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[10px]">OPPORTUNITY SCORE</div>
            <div className="text-cyan-400 text-base font-bold mt-0.5">{selectedFeedstock.opportunityScore} / 100</div>
            <div className="text-slate-400 text-[10px] mt-0.5">High Potential Class</div>
          </div>
        </div>

        {/* Description & Transformation Families */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
                Chemical Identity &amp; Reactivity Profile
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/80">
                {selectedFeedstock.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
                Potential Transformation Families
              </h3>
              <div className="space-y-1.5">
                {selectedFeedstock.transformationFamilies.map((fam, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>{fam}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Process Safety &amp; EHS Boundaries</span>
              </h3>
              <div className="space-y-1.5">
                {selectedFeedstock.safetyNotes.map((note, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Downstream Opportunity Tree */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span>Downstream Opportunity Tree</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Click family to explore branches</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
              {/* Root Node */}
              <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800/80 text-xs font-mono text-cyan-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="font-bold">ROOT FEEDSTOCK: {selectedFeedstock.name} ({selectedFeedstock.formula})</span>
                </div>
                <span>99.8% Refinery Purity</span>
              </div>

              {/* Branches */}
              <div className="space-y-2.5 pl-3 border-l-2 border-slate-800">
                {selectedFeedstock.downstreamTree.map((branch, idx) => {
                  const isExpanded = expandedTreeFamily === branch.family;
                  return (
                    <div key={idx} className="space-y-2">
                      <div
                        onClick={() => setExpandedTreeFamily(isExpanded ? null : branch.family)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between text-xs ${
                          isExpanded
                            ? 'bg-slate-900 border-cyan-500/60 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ChevronRight className={`w-3.5 h-3.5 text-cyan-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                          <span className="font-semibold">{branch.family}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {branch.intermediates.length} Intermediates · {branch.endProducts.length} Targets
                        </span>
                      </div>

                      {isExpanded && (
                        <div className="pl-6 space-y-2 text-xs font-mono">
                          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                                KEY SYNTHESIS INTERMEDIATES:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {branch.intermediates.map(item => (
                                  <span key={item} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-800/80">
                              <span className="text-[10px] text-emerald-400 uppercase tracking-wider block mb-1">
                                COMMERCIAL END-PRODUCTS &amp; DERIVATIVES:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {branch.endProducts.map(item => (
                                  <span key={item} className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px]">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
