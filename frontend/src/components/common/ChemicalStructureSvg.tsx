import React from 'react';

interface ChemicalStructureSvgProps {
  moleculeKey: string;
  className?: string;
  width?: number;
  height?: number;
  interactive?: boolean;
}

export const ChemicalStructureSvg: React.FC<ChemicalStructureSvgProps> = ({
  moleculeKey,
  className = '',
  width = 180,
  height = 140,
  interactive = false
}) => {
  // Render clean, vector chemical line structures with clear bonds & atom labels
  switch (moleculeKey.toLowerCase()) {
    case 'benzene':
    case 'c6h6':
      return (
        <svg
          viewBox="0 0 160 140"
          width={width}
          height={height}
          className={`${className} ${interactive ? 'transition-transform duration-200 hover:scale-105' : ''}`}
        >
          {/* Benzene Ring */}
          <polygon
            points="80,25 125,50 125,100 80,125 35,100 35,50"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Inner conjugated ring or alternating double bonds */}
          <circle
            cx="80"
            cy="75"
            r="30"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeDasharray="4 4"
            opacity="0.85"
          />
          <text x="80" y="80" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="IBM Plex Mono">
            C₆H₆
          </text>
        </svg>
      );

    case 'phenol':
    case 'c6h6o':
      return (
        <svg
          viewBox="0 0 160 150"
          width={width}
          height={height}
          className={`${className} ${interactive ? 'transition-transform duration-200 hover:scale-105' : ''}`}
        >
          {/* Top OH group */}
          <line x1="80" y1="48" x2="80" y2="22" stroke="#F43F5E" strokeWidth="3" />
          <text x="80" y="16" textAnchor="middle" fill="#F43F5E" fontSize="13" fontWeight="bold" fontFamily="IBM Plex Mono">
            OH
          </text>
          {/* Ring */}
          <polygon
            points="80,48 120,71 120,117 80,140 40,117 40,71"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="94" r="26" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        </svg>
      );

    case 'chlorobenzene':
    case 'c6h5cl':
      return (
        <svg
          viewBox="0 0 160 150"
          width={width}
          height={height}
          className={`${className}`}
        >
          <line x1="80" y1="48" x2="80" y2="24" stroke="#10B981" strokeWidth="3" />
          <text x="80" y="18" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="bold" fontFamily="IBM Plex Mono">
            Cl
          </text>
          <polygon
            points="80,48 120,71 120,117 80,140 40,117 40,71"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="94" r="26" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        </svg>
      );

    case 'toluene':
    case 'c7h8':
      return (
        <svg
          viewBox="0 0 160 150"
          width={width}
          height={height}
          className={`${className}`}
        >
          {/* Methyl group */}
          <line x1="80" y1="48" x2="80" y2="22" stroke="#E2E8F0" strokeWidth="3" />
          <text x="80" y="16" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="600" fontFamily="IBM Plex Mono">
            CH₃
          </text>
          <polygon
            points="80,48 120,71 120,117 80,140 40,117 40,71"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="94" r="26" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        </svg>
      );

    case 'xylene':
    case 'c8h10':
      return (
        <svg
          viewBox="0 0 160 160"
          width={width}
          height={height}
          className={`${className}`}
        >
          {/* Top CH3 */}
          <line x1="80" y1="44" x2="80" y2="22" stroke="#E2E8F0" strokeWidth="3" />
          <text x="80" y="16" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="600" fontFamily="IBM Plex Mono">
            H₃C
          </text>
          {/* Ring */}
          <polygon
            points="80,44 118,66 118,110 80,132 42,110 42,66"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="88" r="25" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
          {/* Bottom CH3 (para) */}
          <line x1="80" y1="132" x2="80" y2="152" stroke="#E2E8F0" strokeWidth="3" />
          <text x="80" y="162" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="600" fontFamily="IBM Plex Mono">
            CH₃
          </text>
        </svg>
      );

    case 'hexane':
    case 'c6h14':
      return (
        <svg
          viewBox="0 0 180 100"
          width={width}
          height={height}
          className={`${className}`}
        >
          {/* Aliphatic Zig-zag */}
          <polyline
            points="20,60 48,35 76,60 104,35 132,60 160,35"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="60" r="3.5" fill="#38BDF8" />
          <circle cx="160" cy="35" r="3.5" fill="#38BDF8" />
          <text x="90" y="84" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="IBM Plex Mono">
            n-Hexane (C₆H₁₄)
          </text>
        </svg>
      );

    case 'mol-demo-a':
    case 'demo-a':
    case 'target':
    case 'c8h7no2':
    default:
      // Demo Aromatic Intermediate A (4-hydroxy-3-methoxybenzonitrile structure)
      return (
        <svg
          viewBox="0 0 200 170"
          width={width}
          height={height}
          className={`${className} ${interactive ? 'transition-transform duration-200 hover:scale-105' : ''}`}
        >
          {/* Background subtle glow */}
          <circle cx="95" cy="90" r="42" fill="#0EA5E9" fillOpacity="0.06" />

          {/* Central Aromatic Ring */}
          <polygon
            points="95,52 132,73 132,115 95,136 58,115 58,73"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <circle cx="95" cy="94" r="25" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />

          {/* Para-OH group (top) */}
          <line x1="95" y1="52" x2="95" y2="28" stroke="#F43F5E" strokeWidth="3" />
          <text x="95" y="20" textAnchor="middle" fill="#F43F5E" fontSize="12" fontWeight="bold" fontFamily="IBM Plex Mono">
            OH
          </text>

          {/* Ortho-Methoxy group (top-right OCH3) */}
          <line x1="132" y1="73" x2="154" y2="60" stroke="#F59E0B" strokeWidth="3" />
          <text x="168" y="58" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold" fontFamily="IBM Plex Mono">
            O
          </text>
          <line x1="178" y1="56" x2="190" y2="50" stroke="#CBD5E1" strokeWidth="2.5" />
          <text x="195" y="46" textAnchor="start" fill="#CBD5E1" fontSize="10" fontFamily="IBM Plex Mono">
            CH₃
          </text>

          {/* Nitrile group (bottom-left / para position to CN) */}
          <line x1="95" y1="136" x2="95" y2="154" stroke="#A855F7" strokeWidth="3" />
          <text x="95" y="166" textAnchor="middle" fill="#A855F7" fontSize="12" fontWeight="bold" fontFamily="IBM Plex Mono">
            C≡N
          </text>
        </svg>
      );
  }
};
