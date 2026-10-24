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
import { ArrowUpRight, Compass, ExternalLink, Eye, Layers, Mail, ShieldCheck, Sparkles } from 'lucide-react';

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
    <>
      {/* LEFT COSMIC TELEMETRY HUD: Compact, Zero-Scrollbar, Floating Observatory Wing */}
      <aside
        aria-label={`${chapter.title} Editorial Overview`}
        className="fixed top-auto bottom-32 left-3 right-3 md:top-20 md:bottom-auto md:left-6 md:right-auto md:w-[375px] z-20 pointer-events-none"
      >
        <div className="pointer-events-auto relative overflow-hidden rounded-2xl bg-[#060814]/90 border border-sky-400/25 shadow-[0_0_45px_rgba(56,189,248,0.10)] p-5 space-y-4">
          {/* Top Multi-Color Galaxy Gradient Accent Line */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-purple-500 to-amber-400"
          />

          {/* Sector & Kicker Header */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono-tabular text-sky-400">
              <span>{chapter.caliber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400">{chapter.monumentPartCount} Orbital Parts</span>
            </div>
            <p className="text-xs font-medium text-purple-300/90">{chapter.kicker}</p>
            <h1 className="font-display text-3xl sm:text-[34px] font-semibold text-white tracking-tight leading-[1.1]">
              {chapter.title}
            </h1>
            <p className="text-xs sm:text-[13px] font-medium text-slate-200 leading-snug pt-0.5">
              {chapter.subtitle}
            </p>
          </div>

          {/* Concise Cosmic Bio / Sector Description */}
          <p className="hidden sm:block text-xs text-slate-300/90 leading-relaxed">
            {chapter.description}
          </p>

          {/* 3 Tabular Cosmic Telemetry Counters */}
          <div className="grid grid-cols-3 gap-2 pt-3 pb-3 border-y border-white/10">
            {chapter.keyMetrics.map((metric, idx) => {
              const valueColor =
                idx === 0
                  ? 'text-amber-400'
                  : idx === 1
                    ? 'text-sky-400'
                    : 'text-purple-400';
              return (
                <div key={metric.label} className="space-y-0.5">
                  <div className={`font-mono-tabular text-base font-bold ${valueColor}`}>
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-semibold text-white leading-tight">
                    {metric.label}
                  </div>
                  <div className="hidden sm:block text-[10px] text-slate-400 leading-tight">
                    {metric.context}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Primary Actions inside Left HUD */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenVault}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-[#030308] bg-gradient-to-r from-amber-400 via-amber-300 to-sky-300 hover:brightness-110 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore All 1,214+ Creations</span>
            </button>
            <button
              type="button"
              onClick={onOpenCommission}
              className="py-2.5 px-3.5 text-xs font-semibold text-white bg-[#101426] hover:bg-[#181E36] border border-sky-400/30 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              Direct Contact
            </button>
          </div>

          {/* Monument Hardware Footnote */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1.5 truncate">
              <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">{chapter.monumentName}</span>
            </span>
            <button
              type="button"
              onClick={onOpenCommission}
              className="inline-flex items-center gap-1 text-amber-400 hover:underline shrink-0 ml-2 cursor-pointer"
            >
              <Mail className="w-3 h-3" />
              <span>Hire / Collaborate</span>
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT ORBITAL INSPECTOR DECK: Floating Zero-Scrollbar Cards Leaving Center 3D Galaxy Open */}
      <aside
        aria-label={`${chapter.title} Interactive Modules`}
        className="hidden lg:flex fixed top-20 right-6 w-[350px] z-20 flex-col gap-3 pointer-events-none"
      >
        {activeChapter === 'origin' && (
          <div className="pointer-events-auto relative overflow-hidden rounded-2xl bg-[#060814]/90 border border-purple-400/25 p-5 space-y-3.5 shadow-[0_0_40px_rgba(168,85,247,0.10)]">
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400"
            />
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-purple-300">
              <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>COMMANDER PROFILE</span>
              <span aria-hidden="true">·</span>
              <span>19 ECOSYSTEMS</span>
            </div>
            <h2 className="font-display text-2xl font-semibold text-white">
              01. The Alchemist’s Universe
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              From engineering the FLYNAX full-stack language and ECO AI cognitive architecture to sculpting 90+ Blender 3D assets, 95+ Unreal & Unity games, and 86+ ESP32 & Webots robotics simulations.
            </p>

            {/* Mini Cosmic Domain Pill-Free Breakdown */}
            <div className="space-y-2 pt-1 border-t border-white/10">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-sky-300 font-medium">Systems & Open-Source</span>
                <span className="font-mono-tabular text-white font-semibold">686+ Builds</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-purple-300 font-medium">3D & Game Engines</span>
                <span className="font-mono-tabular text-white font-semibold">278+ Worlds</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-amber-300 font-medium">Hardware, IoT & AI Labs</span>
                <span className="font-mono-tabular text-white font-semibold">250+ Circuits</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-medium text-sky-400">
              <a
                href="https://github.com/MohammadSaad006"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                <span>GitHub (@MohammadSaad006)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a
                href="https://www.linkedin.com/in/mohammad-saad-mohammad-farooque-791a45328/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:underline"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {(activeChapter === 'systems' || activeChapter === 'deployments' || activeChapter === 'ventures') && (
          <div className="pointer-events-auto rounded-2xl bg-[#060814]/90 border border-sky-400/25 p-4 space-y-2.5 shadow-[0_0_40px_rgba(56,189,248,0.10)]">
            <div className="flex items-center justify-between text-xs font-mono-tabular text-sky-400 pb-1 border-b border-white/10">
              <span>SECTOR MODULES ({chapterWorks.length})</span>
              <span>SELECT TO INSPECT</span>
            </div>
            <div className="space-y-2">
              {chapterWorks.map((work) => (
                <div
                  key={work.id}
                  className="p-3 rounded-xl bg-[#0D1122] hover:bg-[#131930] border border-white/10 hover:border-sky-400/50 transition-all space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono-tabular text-slate-400">
                    <span className="text-amber-400">{work.index}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{work.category}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-lg font-semibold text-white truncate">
                      {work.title}
                    </h2>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {(work.liveUrl || work.githubUrl) && (
                        <a
                          href={work.liveUrl ?? work.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-sky-400 hover:underline whitespace-nowrap"
                        >
                          <span>{work.liveUrl ? 'Live' : 'GitHub'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => onInspectWork(work)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#030308] bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect {work.title}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300/90 line-clamp-2 leading-relaxed">
                    {work.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeChapter === 'arsenal' && (
          <div className="pointer-events-auto rounded-2xl bg-[#060814]/90 border border-purple-400/25 p-4 space-y-3 shadow-[0_0_40px_rgba(168,85,247,0.10)]">
            <div className="flex items-center justify-between text-xs font-mono-tabular text-purple-300 border-b border-white/10 pb-1.5">
              <span>6 MASTERY PILLARS</span>
              <button
                type="button"
                onClick={onOpenVault}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                Open Full Matrix
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {EXPERTISE_DOMAINS.map((dom) => (
                <div
                  key={dom.id}
                  className="p-2.5 rounded-xl bg-[#0D1122] border border-white/10 space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white truncate">
                      {dom.index}. {dom.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-snug">
                    {dom.skills.slice(0, 5).join(' · ')}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-1 border-t border-white/10">
              <div className="text-[11px] font-semibold text-sky-300">
                Verified Technical Certifications
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {CERTIFICATIONS.slice(0, 4).map((cert) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => onInspectCert(cert)}
                    className="text-left p-2 rounded-lg bg-[#0D1122] hover:bg-[#151C36] border border-white/10 hover:border-amber-400/50 transition-colors cursor-pointer space-y-0.5"
                  >
                    <div className="flex items-center gap-1 text-[10px] font-mono-tabular text-amber-400">
                      <ShieldCheck className="w-3 h-3 shrink-0" />
                      <span>{cert.index}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-white truncate">
                      {cert.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
