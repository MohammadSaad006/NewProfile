import React from 'react';
import {
  CERTIFICATIONS,
  CHAPTERS,
  ChapterId,
  CertificationRecord,
  EXPERTISE_DOMAINS,
  SHOWCASE_WORKS,
  ShowcaseWork,
} from '../data/portfolioData';
import { ArrowUpRight, Compass, ExternalLink, Eye, Layers, Mail, ShieldCheck } from 'lucide-react';

interface ChapterEditorialPanelProps {
  activeChapter: ChapterId;
  isZenMode: boolean;
  onInspectWork: (work: ShowcaseWork) => void;
  onInspectCert: (cert: CertificationRecord) => void;
  onOpenVault: () => void;
  onOpenCommission: () => void;
}

export const ChapterEditorialPanel: React.FC<ChapterEditorialPanelProps> = ({
  activeChapter,
  isZenMode,
  onInspectWork,
  onInspectCert,
  onOpenVault,
  onOpenCommission,
}) => {
  const chapter = CHAPTERS.find((c) => c.id === activeChapter) ?? CHAPTERS[0];
  const chapterWorks = SHOWCASE_WORKS.filter((w) => w.chapterId === activeChapter);

  if (isZenMode) {
    return null;
  }

  return (
    <aside
      aria-label={`${chapter.title} Editorial Overview`}
      className="fixed top-auto bottom-32 left-3 right-3 max-h-[42vh] md:top-16 md:bottom-24 md:left-6 md:right-auto md:max-h-none md:w-[430px] z-20 flex flex-col justify-between pointer-events-none"
    >
      {/* Scrollable Architectural Spec Sheet Card (Left Column only on desktop; compact bottom sheet on mobile) */}
      <div className="pointer-events-auto max-h-full overflow-y-auto bg-[#09090E]/92 border border-[#D4AF37]/25 rounded-xl p-4 sm:p-5 shadow-2xl space-y-4">
        {/* Calibre & Kicker Header (Zero-Pill Unboxed Metadata) */}
        <div className="space-y-1.5 border-b border-white/10 pb-4">
          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#D4AF37]">
            <span>{chapter.caliber}</span>
            <span aria-hidden="true">·</span>
            <span>{chapter.monumentPartCount} Composite Parts</span>
          </div>
          <p className="text-xs font-medium text-[#A1A1AA]">{chapter.kicker}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F1EA] tracking-tight leading-[1.12]">
            {chapter.title}
          </h1>
          <p className="text-sm font-medium text-[#E4E4E7] leading-snug pt-0.5">
            {chapter.subtitle}
          </p>
        </div>

        {/* Body Copy */}
        <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
          {chapter.description}
        </p>

        {/* Quantitative Metrics Strip (Tabular Numerals, Claim-to-Proof Adjacency) */}
        <div className="grid grid-cols-3 gap-2.5 pt-1 border-t border-b border-white/10 py-3.5">
          {chapter.keyMetrics.map((metric) => (
            <div key={metric.label} className="space-y-0.5">
              <div className="font-mono-tabular text-base sm:text-lg font-semibold text-[#D4AF37]">
                {metric.value}
              </div>
              <div className="text-[11px] font-semibold text-[#F4F1EA] leading-tight">
                {metric.label}
              </div>
              <div className="text-[10px] text-[#A1A1AA] leading-tight">
                {metric.context}
              </div>
            </div>
          ))}
        </div>

        {/* Chapter-Specific Interactive Content */}
        {activeChapter === 'origin' && (
          <div className="space-y-3">
            <div className="text-xs text-[#A1A1AA] flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Mohammad Saad Mohammad Farooque</span>
              <span aria-hidden="true">·</span>
              <span>Creative Technologist</span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#111119] border border-white/10 space-y-2">
              <div className="text-xs font-semibold text-[#F4F1EA]">
                01. The Alchemist’s Philosophy
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                From designing the FLYNAX programming language and ECO AI cognitive architecture to building 90+ Blender 3D assets, 95+ Unreal/Unity titles, and 86+ ESP32/Webots robotics simulations.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-medium text-[#D4AF37]">
                <a
                  href="https://github.com/MohammadSaad006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <span>GitHub (@MohammadSaad006)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="https://www.linkedin.com/in/mohammad-saad-mohammad-farooque-791a45328/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={onOpenVault}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-[#060609] bg-[#D4AF37] hover:bg-[#E5C358] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Explore All 1,214+ Creations
              </button>
              <button
                type="button"
                onClick={onOpenCommission}
                className="py-2.5 px-4 text-xs font-semibold text-[#F4F1EA] bg-[#161622] hover:bg-[#202030] border border-white/15 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Direct Contact
              </button>
            </div>
          </div>
        )}

        {(activeChapter === 'systems' || activeChapter === 'deployments' || activeChapter === 'ventures') && (
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-[#E4E4E7]">
              Select a Work to Inspect Architectural Blueprint
            </div>
            <div className="space-y-2">
              {chapterWorks.map((work) => (
                <div
                  key={work.id}
                  className="p-3.5 rounded-lg bg-[#111119] hover:bg-[#161622] border border-white/10 hover:border-[#D4AF37]/50 transition-colors space-y-1.5"
                >
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-[11px] font-mono-tabular text-[#A1A1AA]">
                    <span className="text-[#D4AF37]">{work.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{work.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{work.status}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-xl font-semibold text-[#F4F1EA]">
                      {work.title}
                    </h2>
                    <div className="flex items-center gap-2 shrink-0">
                      {(work.liveUrl || work.githubUrl) && (
                        <a
                          href={work.liveUrl ?? work.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#D4AF37] hover:underline whitespace-nowrap"
                        >
                          <span>{work.liveUrl ? 'Live Site' : 'GitHub'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => onInspectWork(work)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#060609] bg-[#D4AF37] hover:bg-[#E5C358] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect {work.title}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
                    {work.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeChapter === 'arsenal' && (
          <div className="space-y-3.5">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#E4E4E7]">
                Six Engineering Pillars
              </div>
              <div className="grid grid-cols-1 gap-2">
                {EXPERTISE_DOMAINS.map((dom) => (
                  <div
                    key={dom.id}
                    className="p-3 rounded-lg bg-[#111119] border border-white/10 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#F4F1EA]">
                        {dom.index}. {dom.title}
                      </span>
                      <span className="font-mono-tabular text-[11px] text-[#D4AF37]">
                        {dom.skills.length} Technologies
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                      {dom.skills.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Certifications List */}
            <div className="space-y-2 pt-1 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#E4E4E7]">
                  Verified Technical Certifications
                </span>
                <button
                  type="button"
                  onClick={onOpenVault}
                  className="text-xs font-medium text-[#D4AF37] hover:underline cursor-pointer"
                >
                  Open Full Matrix
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CERTIFICATIONS.slice(0, 4).map((cert) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => onInspectCert(cert)}
                    className="text-left p-2.5 rounded-lg bg-[#111119] hover:bg-[#191926] border border-white/10 hover:border-[#D4AF37]/50 transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center gap-1 text-[10px] font-mono-tabular text-[#D4AF37]">
                      <ShieldCheck className="w-3 h-3 shrink-0" />
                      <span>{cert.index}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#F4F1EA] truncate">
                      {cert.title}
                    </div>
                    <div className="text-[10px] text-[#A1A1AA] truncate">
                      {cert.domain}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Monument 3D Hardware Footnote */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A1A1AA]">
          <span className="inline-flex items-center gap-1.5 truncate">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="truncate">{chapter.monumentName}</span>
          </span>
          <button
            type="button"
            onClick={onOpenCommission}
            className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline shrink-0 ml-2 cursor-pointer"
          >
            <Mail className="w-3 h-3" />
            <span>Hire / Collaborate</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
