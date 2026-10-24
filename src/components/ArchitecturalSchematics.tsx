import React from 'react';
import { ShowcaseWork } from '../data/portfolioData';

export const ArchitecturalSchematicSVG: React.FC<{
  type: ShowcaseWork['schematicType'] | 'certificate';
  title: string;
  subtitle?: string;
}> = ({ type, title, subtitle }) => {
  return (
    <div className="relative w-full h-48 bg-[#08080D] border border-[#D4AF37]/25 rounded-lg overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 600 240"
        className="w-full h-full object-cover"
        role="img"
        aria-label={`${title} Architectural Blueprint`}
      >
        <defs>
          <radialGradient id={`glow-${type}`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#08080D" stopOpacity="0" />
          </radialGradient>
          <pattern id={`grid-${type}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="rgba(212, 175, 55, 0.08)"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>

        {/* Background Grid & Glow */}
        <rect width="600" height="240" fill={`url(#grid-${type})`} />
        <circle cx="300" cy="120" r="130" fill={`url(#glow-${type})`} />

        {/* Technical Corner Frame Marks */}
        <path d="M 16 32 L 16 16 L 32 16" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.6" />
        <path d="M 584 32 L 584 16 L 568 16" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.6" />
        <path d="M 16 208 L 16 224 L 32 224" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.6" />
        <path d="M 584 208 L 584 224 L 568 224" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.6" />

        {type === 'flynax' && (
          <g stroke="#D4AF37" fill="none">
            <polygon points="300,34 374,77 374,163 300,206 226,163 226,77" strokeWidth="1.6" opacity="0.85" />
            <polygon points="300,56 355,88 355,152 300,184 245,152 245,88" strokeWidth="1" opacity="0.5" />
            <circle cx="300" cy="120" r="34" strokeWidth="1.5" />
            <line x1="140" y1="120" x2="226" y2="120" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="374" y1="120" x2="460" y2="120" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="300" cy="120" r="6" fill="#D4AF37" />
          </g>
        )}

        {type === 'eco-ai' && (
          <g stroke="#D4AF37" fill="none">
            <circle cx="300" cy="120" r="78" strokeWidth="1.2" opacity="0.7" />
            <circle cx="300" cy="120" r="54" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
            <polygon points="300,52 358,154 242,154" strokeWidth="1.4" opacity="0.8" />
            <polygon points="300,188 358,86 242,86" strokeWidth="1.4" opacity="0.8" />
            <circle cx="300" cy="120" r="14" fill="rgba(212,175,55,0.25)" strokeWidth="1.5" />
          </g>
        )}

        {(type === 'solvatax' || type === 'dehorizon') && (
          <g stroke="#D4AF37" fill="none">
            <rect x="210" y="48" width="70" height="144" strokeWidth="1.5" opacity="0.85" />
            <rect x="296" y="72" width="90" height="120" strokeWidth="1.5" opacity="0.85" />
            <line x1="170" y1="192" x2="430" y2="192" strokeWidth="2" />
            <path d="M 185 160 Q 300 30 415 160" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.7" />
            <circle cx="300" cy="95" r="5" fill="#D4AF37" />
          </g>
        )}

        {(type === 'flyos' || type === 'qimtp' || type === 'horror' || type === 'edutech' || type === 'space') && (
          <g stroke="#D4AF37" fill="none">
            <ellipse cx="300" cy="120" rx="110" ry="42" strokeWidth="1.3" opacity="0.75" />
            <ellipse cx="300" cy="120" rx="42" ry="82" strokeWidth="1.3" opacity="0.75" />
            <circle cx="300" cy="120" r="24" strokeWidth="1.8" />
            <circle cx="300" cy="120" r="6" fill="#D4AF37" />
          </g>
        )}

        {type === 'certificate' && (
          <g stroke="#D4AF37" fill="none">
            <rect x="170" y="36" width="260" height="168" rx="6" strokeWidth="1.6" opacity="0.85" />
            <rect x="180" y="46" width="240" height="148" rx="3" strokeWidth="0.8" opacity="0.45" />
            <circle cx="300" cy="105" r="26" strokeWidth="1.5" />
            <polygon points="300,86 306,99 320,101 310,111 312,125 300,118 288,125 290,111 280,101 294,99" fill="rgba(212,175,55,0.35)" />
            <line x1="230" y1="154" x2="370" y2="154" strokeWidth="1" opacity="0.6" />
            <line x1="255" y1="170" x2="345" y2="170" strokeWidth="1" opacity="0.4" />
          </g>
        )}
      </svg>

      {/* Bottom Scrim & Blueprint Caption */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#060609] via-[#060609]/80 to-transparent px-4 py-2.5 flex items-center justify-between">
        <span className="font-mono-tabular text-[11px] text-[#D4AF37]">
          {title}
        </span>
        {subtitle && (
          <span className="font-mono-tabular text-[11px] text-[#A1A1AA]">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
