import React from 'react';
import { ProvenanceLevel } from '../../types/chemistry';
import { CheckCircle2, BookOpen, Cpu, User, Factory, HelpCircle } from 'lucide-react';

interface ProvenanceBadgeProps {
  provenance: ProvenanceLevel;
  className?: string;
  showIcon?: boolean;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  provenance,
  className = '',
  showIcon = true
}) => {
  const getBadgeConfig = () => {
    switch (provenance) {
      case 'VERIFIED DATA':
        return {
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/30',
          bgColor: 'bg-emerald-950/40',
          dotColor: 'bg-emerald-400',
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        };
      case 'LITERATURE-DERIVED':
        return {
          textColor: 'text-sky-300',
          borderColor: 'border-sky-500/30',
          bgColor: 'bg-sky-950/40',
          dotColor: 'bg-sky-400',
          icon: <BookOpen className="w-3 h-3 text-sky-400" />
        };
      case 'MODEL PREDICTION':
        return {
          textColor: 'text-amber-300',
          borderColor: 'border-amber-500/30',
          bgColor: 'bg-amber-950/40',
          dotColor: 'bg-amber-400',
          icon: <Cpu className="w-3 h-3 text-amber-400" />
        };
      case 'INDUSTRIAL ESTIMATE':
        return {
          textColor: 'text-indigo-300',
          borderColor: 'border-indigo-500/30',
          bgColor: 'bg-indigo-950/40',
          dotColor: 'bg-indigo-400',
          icon: <Factory className="w-3 h-3 text-indigo-400" />
        };
      case 'USER ASSUMPTION':
        return {
          textColor: 'text-purple-300',
          borderColor: 'border-purple-500/30',
          bgColor: 'bg-purple-950/40',
          dotColor: 'bg-purple-400',
          icon: <User className="w-3 h-3 text-purple-400" />
        };
      case 'UNKNOWN':
      default:
        return {
          textColor: 'text-slate-400',
          borderColor: 'border-slate-700',
          bgColor: 'bg-slate-900',
          dotColor: 'bg-slate-400',
          icon: <HelpCircle className="w-3 h-3 text-slate-400" />
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase border rounded ${config.bgColor} ${config.borderColor} ${config.textColor} ${className}`}
      title={`Data Provenance: ${provenance}`}
    >
      {showIcon && config.icon}
      <span>{provenance}</span>
    </span>
  );
};
