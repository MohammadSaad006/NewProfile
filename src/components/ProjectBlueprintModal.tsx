import React from 'react';
import { CertificationRecord, ShowcaseWork } from '../data/portfolioData';
import { ArchitecturalSchematicSVG } from './ArchitecturalSchematics';
import { Download, ExternalLink, ShieldCheck, X } from 'lucide-react';

interface ProjectBlueprintModalProps {
  work: ShowcaseWork | null;
  certificate: CertificationRecord | null;
  onClose: () => void;
  onOpenCommission: (prefillSubject?: string) => void;
}

export const ProjectBlueprintModal: React.FC<ProjectBlueprintModalProps> = ({
  work,
  certificate,
  onClose,
  onOpenCommission,
}) => {
  if (!work && !certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={work ? `${work.title} Architectural Specification` : `${certificate?.title} Credential`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#0A0A10] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Action */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          {work ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#D4AF37]">
                <span>{work.index}</span>
                <span aria-hidden="true">·</span>
                <span>{work.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#A1A1AA]">{work.status}</span>
              </div>
              <h2 className="font-display text-3xl font-semibold text-[#F4F1EA]">
                {work.title}
              </h2>
              <p className="text-sm text-[#D4D4D8]">{work.subtitle}</p>
            </div>
          ) : (
            certificate && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#D4AF37]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{certificate.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{certificate.credentialCode}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#A1A1AA]">{certificate.year}</span>
                </div>
                <h2 className="font-display text-3xl font-semibold text-[#F4F1EA]">
                  {certificate.title}
                </h2>
                <p className="text-sm text-[#D4D4D8]">
                  {certificate.issuer} · {certificate.domain}
                </p>
              </div>
            )
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Specification Modal"
            className="p-2 text-[#A1A1AA] hover:text-[#F4F1EA] bg-[#14141F] hover:bg-[#1E1E2E] rounded-lg border border-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Procedural SVG Blueprint or Certificate Plate */}
        {work ? (
          <ArchitecturalSchematicSVG
            type={work.schematicType}
            title={`CALIBRE BLUEPRINT · ${work.title}`}
            subtitle={work.index}
          />
        ) : (
          certificate && (
            <ArchitecturalSchematicSVG
              type="certificate"
              title={`VERIFIED CREDENTIAL · ${certificate.title.toUpperCase()}`}
              subtitle={certificate.credentialCode}
            />
          )
        )}

        {/* Detailed Specifications */}
        {work && (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[#F4F1EA]">
                Executive Overview
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {work.summary}
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-sm font-semibold text-[#F4F1EA]">
                Architectural Engineering Notes
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#D4D4D8]">
                {work.architectureNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono-tabular text-xs text-[#D4AF37] pt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Metrics & Tech Stack (Unboxed Metadata with Separators) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#D4AF37]">
                  Core Capabilities
                </div>
                <div className="text-xs text-[#E4E4E7] leading-relaxed">
                  {work.metrics.join(' · ')}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#D4AF37]">
                  Technology Stack
                </div>
                <div className="text-xs text-[#A1A1AA] leading-relaxed">
                  {work.techStack.join(' · ')}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                {work.liveUrl && (
                  <a
                    href={work.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#060609] bg-[#D4AF37] hover:bg-[#E5C358] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>{work.actionLabel ?? `Visit ${work.title}`}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {work.githubUrl && (
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#060609] bg-[#D4AF37] hover:bg-[#E5C358] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>{work.actionLabel ?? 'View Repository on GitHub'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {work.downloadUrl && (
                  <a
                    href={work.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#F4F1EA] bg-[#161622] hover:bg-[#222234] border border-[#D4AF37]/40 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Download Documents App Build</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  const title = work.title;
                  onClose();
                  onOpenCommission(`Inquiry regarding ${title}`);
                }}
                className="px-4 py-2 text-xs font-semibold text-[#F4F1EA] bg-[#14141F] hover:bg-[#1E1E2E] border border-white/15 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Inquire About {work.title}
              </button>
            </div>
          </>
        )}

        {certificate && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#111119] border border-white/10 space-y-2">
              <div className="text-xs font-semibold text-[#D4AF37]">
                Verified Competencies & Assessment Scope
              </div>
              <p className="text-sm text-[#E4E4E7]">
                {certificate.verifiedSkills.join(' · ')}
              </p>
              <p className="text-xs text-[#A1A1AA] pt-1">
                Awarded to Mohammad Saad Mohammad Farooque upon successful verification of domain proficiency in {certificate.domain}.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#060609] bg-[#D4AF37] hover:bg-[#E5C358] rounded-lg transition-colors cursor-pointer"
              >
                Done Inspecting
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
