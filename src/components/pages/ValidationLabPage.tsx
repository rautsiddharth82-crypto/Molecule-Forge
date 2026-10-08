import React, { useState } from 'react';
import { VALIDATION_TASKS } from '../../data/mockData';
import { ValidationTask, ProvenanceLevel } from '../../types/chemistry';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Download,
  CheckSquare,
  Square,
  Sparkles,
  Info,
  Clock,
  UserCheck
} from 'lucide-react';

interface ValidationLabPageProps {
  onNavigateToReports: () => void;
}

export const ValidationLabPage: React.FC<ValidationLabPageProps> = ({ onNavigateToReports }) => {
  const [tasks, setTasks] = useState<ValidationTask[]>(VALIDATION_TASKS);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Chemistry' | 'Process' | 'Sustainability' | 'Commercial'>('All');
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const categories = ['All', 'Chemistry', 'Process', 'Sustainability', 'Commercial'] as const;

  const filteredTasks = activeCategory === 'All'
    ? tasks
    : tasks.filter(t => t.category === activeCategory);

  const provenanceLegend: { level: ProvenanceLevel; desc: string }[] = [
    { level: 'VERIFIED DATA', desc: 'Direct plant or experimental empirical laboratory data with quantified mass balance.' },
    { level: 'LITERATURE-DERIVED', desc: 'Peer-reviewed academic paper or patented reaction conditions (SciFinder / Reaxys).' },
    { level: 'MODEL PREDICTION', desc: 'AI retrosynthetic model prediction or quantitative structure-property estimation.' },
    { level: 'INDUSTRIAL ESTIMATE', desc: 'Refinery engineering benchmark or general fine-chemical plant heuristics.' },
    { level: 'USER ASSUMPTION', desc: 'Custom project assumption or analyst override parameter.' },
    { level: 'UNKNOWN', desc: 'Data requiring primary empirical determination in initial laboratory campaign.' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>EXPERIMENTAL GATING & LABORATORY CAMPAIGN</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Laboratory Validation Plan
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Gated experimental protocols to confirm chemical conversion, thermal safety, solvent recycle, and commercial specs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReportSuccessModal(true)}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm font-mono"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Generate Validation Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Route & Overall Progress Banner */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 md:p-6 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              ACTIVE SCREENING TARGET
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <h2 className="text-base font-bold text-white">Route B — Balanced Route</h2>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold">
                Forge Score 81
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-slate-400 block">CAMPAIGN COMPLETION</span>
            <span className="text-2xl font-bold font-mono text-cyan-400">
              {completedCount} <span className="text-slate-400 text-sm font-normal">/ {tasks.length} tasks</span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>{progressPercent}% Complete</span>
            <span>{tasks.length - completedCount} Experimental Gates Remaining</span>
          </div>
        </div>
      </section>

      {/* Explainability Center: Why Was This Route Recommended? */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
              EXPLAINABILITY &amp; EVIDENCE AUDIT
            </span>
            <h3 className="text-base font-bold text-white">
              Why Was This Route Recommended?
            </h3>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            Decision Evidence Log
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Positive Factors */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Positive Factors Supporting Route B</span>
            </h4>
            <div className="space-y-2 text-xs font-mono">
              {[
                'Refinery-relevant starting material directly sourced from captive reformate (C6H6, 99.8% purity)',
                '≤4 major transformations complies with practical industrial plant footprint',
                'Lower estimated solvent burden (E-factor 8.4 vs 16.4 in Route A)',
                'No extreme pressure identified (<1.5 bar atmospheric envelope)',
                'Better raw-material domestic availability index (75%)',
                'Strong green chemistry score (91/100) eliminates hazardous cyanide effluent',
              ].map((factor, idx) => (
                <div key={idx} className="p-2.5 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-200 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings & Risk Gates */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Warnings &amp; Critical Validation Gaps</span>
            </h4>
            <div className="space-y-2 text-xs font-mono">
              {[
                'Step 3 yield has limited high-tonnage supporting data (model prediction at 78%)',
                'Purification method requires laboratory confirmation of mother liquor washing',
                'Cost values are preliminary and subject to HMEL refinery energy utility allocations',
                'Market assumptions require verified sign-off from domestic pharmaceutical buyers',
              ].map((warn, idx) => (
                <div key={idx} className="p-2.5 rounded bg-amber-950/20 border border-amber-900/40 text-amber-200 flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">⚠</span>
                  <span>{warn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Provenance Legend */}
        <div className="pt-4 border-t border-slate-800">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
            Data Provenance Legend &amp; Confidence Framework
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {provenanceLegend.map((item) => (
              <div key={item.level} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                <ProvenanceBadge provenance={item.level} />
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive 20-Item Validation Checklist */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              20-Item Stage-Gate Laboratory Checklist
            </h3>
            <span className="text-xs text-slate-400">
              Click checkbox to record experimental completion. Automatically updates validation progress.
            </span>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="divide-y divide-slate-800/60">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="py-3.5 flex items-start gap-3 cursor-pointer hover:bg-slate-800/30 transition-colors rounded px-2 -mx-2 group"
            >
              <button
                className="mt-0.5 text-slate-400 group-hover:text-cyan-400 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTask(task.id);
                }}
              >
                {task.completed ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-600" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-semibold ${task.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                    {task.title}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 border border-slate-800 text-slate-400">
                    {task.category}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    task.priority === 'Critical'
                      ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                      : task.priority === 'High'
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {task.priority}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-1">
                  {task.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] font-mono text-slate-400">
                  <span>Assigned: <strong className="text-slate-300">{task.assignedRole}</strong></span>
                  <span>·</span>
                  <span>Target: <strong className="text-cyan-400">{task.targetMetric}</strong></span>
                  {task.completed && (
                    <span className="text-emerald-400 font-bold ml-auto flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Gate Passed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Generated Report Modal */}
      {showReportSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Validation Plan Generated</h3>
                <span className="text-xs text-slate-400 font-mono">Report ID: VAL-PLN-2026-B02</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Laboratory protocol dossier compiled with {completedCount} verified milestones and {tasks.length - completedCount} pending analytical gates. Formatted for R&D synthesis review.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowReportSuccessModal(false)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setShowReportSuccessModal(false);
                  onNavigateToReports();
                }}
                className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs font-mono flex items-center gap-1.5"
              >
                <span>View in Decision Reports</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
