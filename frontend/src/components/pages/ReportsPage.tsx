import React, { useState } from 'react';
import { DECISION_REPORTS } from '../../data/mockData';
import { DecisionReport } from '../../types/chemistry';
import { FileText, Download, Eye, CheckCircle2, X, Printer, ArrowRight, ShieldCheck } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<DecisionReport | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleExportPdf = (report: DecisionReport) => {
    setDownloadToast(`Generating PDF export for "${report.title}"...`);
    setTimeout(() => {
      setDownloadToast(`✓ Exported: ${report.title.slice(0, 30)}...pdf successfully generated.`);
      setTimeout(() => setDownloadToast(null), 3500);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/80 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-mono animate-bounce">
          <Download className="w-4 h-4 text-cyan-400" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <FileText className="w-3.5 h-3.5" />
          <span>FORMAL R&D DOSSIERS & EXECUTIVE BRIEFS</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Decision Reports
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Curated audit memos, technoeconomic evaluations, and stage-gate experimental plans for industrial leadership.
            </p>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
            5 Formal Reports
          </span>
        </div>
      </div>

      {/* Reports Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DECISION_REPORTS.map((report) => (
          <div
            key={report.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                  {report.category}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  report.status === 'Ready for Review'
                    ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800'
                    : report.status === 'Finalized'
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                    : 'bg-amber-950/60 text-amber-300 border-amber-800'
                }`}>
                  {report.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {report.title}
              </h3>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Date: {report.date} · Project: {report.project}
              </div>

              <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                {report.summary}
              </p>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">FEEDSTOCK:</span>
                  <span className="text-slate-200">{report.feedstock}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">FORGE SCORE:</span>
                  <span className="text-emerald-400 font-bold">{report.forgeScore} / 100</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedReport(report)}
                className="flex-1 py-1.5 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors font-mono"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>View</span>
              </button>

              <button
                onClick={() => handleExportPdf(report)}
                className="py-1.5 px-3 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors font-mono"
                title="Export as formatted PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Detailed Report Reader Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  DECISION DOSSIER PREVIEW
                </span>
                <h2 className="text-base font-bold text-white">{selectedReport.title}</h2>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs font-sans">
              {/* Executive Metadata Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">DOCUMENT DATE</span>
                  <span className="text-white font-bold">{selectedReport.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">TARGET DERIVATIVE</span>
                  <span className="text-cyan-300 font-bold truncate block">{selectedReport.targetMolecule}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">REFINERY FEED</span>
                  <span className="text-white font-bold">{selectedReport.feedstock}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">FORGE QUALITY INDEX</span>
                  <span className="text-emerald-400 font-bold">{selectedReport.forgeScore} / 100</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Executive Brief &amp; Context
                </h4>
                <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800 text-sm">
                  {selectedReport.summary}
                </p>
              </div>

              {/* Key Findings */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Key Findings &amp; Recommended Actions
                </h4>
                <div className="space-y-2">
                  {selectedReport.keyFindings.map((finding, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        {finding}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Support Compliance Box */}
              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                <span className="font-mono font-bold block mb-1">GOVERNANCE DISCLAIMER:</span>
                Decision-support prototype. All AI predictions, costs and sustainability values shown in this demonstration are simulated and require expert/laboratory validation.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                Molecule Forge Enterprise R&amp;D Report Engine
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleExportPdf(selectedReport);
                    setSelectedReport(null);
                  }}
                  className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Dossier</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
