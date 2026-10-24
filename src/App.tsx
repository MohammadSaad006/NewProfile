/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import {
  CHAPTERS,
  CameraViewMode,
  CertificationRecord,
  ChapterId,
  CommissionInquiry,
  FinishPresetId,
  KineticWaveMode,
  ShowcaseWork,
  stepChapterIndex,
} from './data/portfolioData';
import { SpatialCanvas } from './components/SpatialCanvas';
import { TopBar } from './components/TopBar';
import { ChapterEditorialPanel } from './components/ChapterEditorialPanel';
import { BottomControlDock } from './components/BottomControlDock';
import { ProjectBlueprintModal } from './components/ProjectBlueprintModal';
import { EcosystemVaultModal } from './components/EcosystemVaultModal';
import { CommissionDrawer } from './components/CommissionDrawer';

export default function App() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('origin');
  const [finishPreset, setFinishPreset] = useState<FinishPresetId>('champagne-gold');
  const [cameraViewMode, setCameraViewMode] = useState<CameraViewMode>('gallery');
  const [kineticWaveMode, setKineticWaveMode] = useState<KineticWaveMode>('harmonic');
  const [explodeFactor, setExplodeFactor] = useState<number>(0);
  const [isZenMode, setIsZenMode] = useState<boolean>(false);

  // Modal & Drawer States
  const [inspectedWork, setInspectedWork] = useState<ShowcaseWork | null>(null);
  const [inspectedCert, setInspectedCert] = useState<CertificationRecord | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [isCommissionOpen, setIsCommissionOpen] = useState<boolean>(false);
  const [commissionPrefill, setCommissionPrefill] = useState<string | undefined>(undefined);
  const [inquiries, setInquiries] = useState<CommissionInquiry[]>([]);

  const handleStepChapter = useCallback((delta: number) => {
    setActiveChapter((prev) => {
      const idx = CHAPTERS.findIndex((c) => c.id === prev);
      const nextIdx = stepChapterIndex(idx === -1 ? 0 : idx, delta, CHAPTERS.length);
      return CHAPTERS[nextIdx].id;
    });
  }, []);

  // Expose active chapter state on document.body for deterministic inspection
  useEffect(() => {
    document.body.setAttribute('data-active-chapter', activeChapter);
    document.body.setAttribute('data-zen-mode', String(isZenMode));
    document.body.setAttribute('data-kinetic-wave', kineticWaveMode);
  }, [activeChapter, isZenMode, kineticWaveMode]);

  // Global keyboard shortcuts (1-5 chapters, Left/Right arrows, H for Cinema Mode, Escape for modals)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (e.key === 'Escape') {
        setInspectedWork(null);
        setInspectedCert(null);
        setIsVaultOpen(false);
        setIsCommissionOpen(false);
        return;
      }

      if (isInput) return;

      if (e.key === 'ArrowRight') {
        handleStepChapter(1);
      } else if (e.key === 'ArrowLeft') {
        handleStepChapter(-1);
      } else if (e.key === 'h' || e.key === 'H') {
        setIsZenMode((prev) => !prev);
      } else if (e.key >= '1' && e.key <= '5') {
        const idx = Number(e.key) - 1;
        if (CHAPTERS[idx]) {
          setActiveChapter(CHAPTERS[idx].id);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleStepChapter]);

  const handleOpenCommission = useCallback((prefill?: string) => {
    setCommissionPrefill(prefill);
    setIsCommissionOpen(true);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#060609] text-[#F4F1EA]">
      {/* 1. Full-Viewport 3D Spatial WebGL Scene */}
      <SpatialCanvas
        activeChapter={activeChapter}
        onSelectChapter={setActiveChapter}
        finishPreset={finishPreset}
        cameraViewMode={cameraViewMode}
        kineticWaveMode={kineticWaveMode}
        explodeFactor={explodeFactor}
        onStepChapter={handleStepChapter}
      />

      {/* 2. Top Navigation Bar (Strict 3-Zone Top Bar Contract) */}
      <TopBar
        activeChapter={activeChapter}
        onSelectChapter={setActiveChapter}
        onOpenCommission={() => handleOpenCommission()}
      />

      {/* 3. Main Non-Occluding Architectural Editorial Overlay */}
      <main>
        <ChapterEditorialPanel
          activeChapter={activeChapter}
          isZenMode={isZenMode}
          onInspectWork={(work) => {
            setInspectedCert(null);
            setInspectedWork(work);
          }}
          onInspectCert={(cert) => {
            setInspectedWork(null);
            setInspectedCert(cert);
          }}
          onOpenVault={() => setIsVaultOpen(true)}
          onOpenCommission={() => handleOpenCommission()}
        />
      </main>

      {/* 4. Unified Collapsible Bottom Control Dock */}
      <BottomControlDock
        activeChapter={activeChapter}
        onSelectChapter={setActiveChapter}
        onStepChapter={handleStepChapter}
        explodeFactor={explodeFactor}
        onChangeExplodeFactor={setExplodeFactor}
        finishPreset={finishPreset}
        onChangeFinishPreset={setFinishPreset}
        cameraViewMode={cameraViewMode}
        onChangeCameraViewMode={setCameraViewMode}
        kineticWaveMode={kineticWaveMode}
        onChangeKineticWaveMode={setKineticWaveMode}
        isZenMode={isZenMode}
        onToggleZenMode={() => setIsZenMode((prev) => !prev)}
        onOpenVault={() => setIsVaultOpen(true)}
      />

      {/* 5. Architectural Project & Credential Inspection Modal */}
      <ProjectBlueprintModal
        work={inspectedWork}
        certificate={inspectedCert}
        onClose={() => {
          setInspectedWork(null);
          setInspectedCert(null);
        }}
        onOpenCommission={(subject) => handleOpenCommission(subject)}
      />

      {/* 6. Complete 1,214+ Works & 19 Ecosystems Vault Modal */}
      <EcosystemVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onSelectCert={(cert) => {
          setInspectedWork(null);
          setInspectedCert(cert);
        }}
      />

      {/* 7. Royal Commission & Direct Contact Drawer */}
      <CommissionDrawer
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
        prefillSubject={commissionPrefill}
        inquiries={inquiries}
        onAddInquiry={(inq) => setInquiries((prev) => [inq, ...prev])}
      />
    </div>
  );
}
