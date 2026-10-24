import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import {
  CameraViewMode,
  ChapterId,
  FinishPresetId,
  getChapterCameraTransform,
} from '../data/portfolioData';
import { createProceduralTextureSet } from '../three/proceduralTextures';
import {
  AtelierSceneMaterials,
  MonumentInstance,
  buildAtelierWorld,
  createAtelierMaterials,
} from '../three/monuments';

interface SpatialCanvasProps {
  activeChapter: ChapterId;
  onSelectChapter: (chapter: ChapterId) => void;
  finishPreset: FinishPresetId;
  cameraViewMode: CameraViewMode;
  explodeFactor: number;
  onStepChapter: (delta: number) => void;
}

// Pre-allocated math helpers at module scope (Zero GC inside render loop)
const _desiredCamPos = new THREE.Vector3();
const _desiredLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(-1.1, 1.85, 0);
const _partTargetPos = new THREE.Vector3();
const _pointerNdc = new THREE.Vector2();

export const SpatialCanvas: React.FC<SpatialCanvasProps> = ({
  activeChapter,
  onSelectChapter,
  finishPreset,
  cameraViewMode,
  explodeFactor,
  onStepChapter,
}) => {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [webglFallback, setWebglFallback] = useState(false);
  const [hoveredChapter, setHoveredChapter] = useState<ChapterId | null>(null);

  // Store latest props in refs so React HUD updates never tear down the WebGLRenderer
  const stateRef = useRef({
    activeChapter,
    finishPreset,
    cameraViewMode,
    explodeFactor,
    onSelectChapter,
    onStepChapter,
  });

  const materialsRef = useRef<AtelierSceneMaterials | null>(null);

  useEffect(() => {
    stateRef.current = {
      activeChapter,
      finishPreset,
      cameraViewMode,
      explodeFactor,
      onSelectChapter,
      onStepChapter,
    };
    if (materialsRef.current) {
      materialsRef.current.updateFinishPreset(finishPreset);
    }
  }, [activeChapter, finishPreset, cameraViewMode, explodeFactor, onSelectChapter, onStepChapter]);

  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    // 1. Detect software WebGL (SwiftShader / llvmpipe / Basic Render) per threejs skill
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFallback(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountEl.innerHTML = '';
    mountEl.appendChild(renderer.domElement);

    // WebGL Context Loss safety handlers
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFallback(true);
    };
    const handleContextRestored = () => {
      setWebglFallback(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    // 2. Scene, Fog & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060609);
    scene.fog = new THREE.FogExp2(0x060609, 0.018);

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 160);
    const initialTransform = getChapterCameraTransform(
      stateRef.current.activeChapter,
      stateRef.current.cameraViewMode,
      stateRef.current.explodeFactor,
    );
    camera.position.set(...initialTransform.cameraPosition);
    _currentLookAt.set(...initialTransform.lookAtTarget);
    camera.lookAt(_currentLookAt);

    // 3. Studio Environment Map via RoomEnvironment + PMREMGenerator (on every device)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // 4. Balanced 3-Point Warm/Cool Studio Lighting Rig
    // Cool sky / warm ground HemisphereLight fill
    const hemiLight = new THREE.HemisphereLight(0x94a3b8, 0x1e1810, 0.65);
    hemiLight.position.set(0, 25, 0);
    scene.add(hemiLight);

    // Warm Golden Key Light (<= 1 shadow caster)
    const keyLight = new THREE.DirectionalLight(0xfff1d6, 2.4);
    keyLight.position.set(8, 14, 10);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      const d = 14;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 40;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);
    scene.add(keyLight.target);

    // Cool Rim Backlight for silhouette separation
    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.15);
    rimLight.position.set(-10, 8, -12);
    scene.add(rimLight);
    scene.add(rimLight.target);

    // Studio Softboxes (RectAreaLight) when !isSoftwareGl
    if (!isSoftwareGl) {
      RectAreaLightUniformsLib.init();
      const softbox = new THREE.RectAreaLight(0xffeedd, 3.5, 6, 3);
      softbox.position.set(0, 6, 4);
      softbox.lookAt(0, 1.8, 0);
      scene.add(softbox);
    }

    // 5. Procedural Textures, PBR Materials & 5 Monuments
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const textures = createProceduralTextureSet(maxAnisotropy);
    const materials = createAtelierMaterials(textures, isSoftwareGl);
    materials.updateFinishPreset(stateRef.current.finishPreset);
    materialsRef.current = materials;

    const { monuments, constellationMesh, hitProxies } = buildAtelierWorld(
      scene,
      materials,
      textures,
      isSoftwareGl,
    );

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 6. Interactive Orbit Drag, Wheel Navigation & Layer-1 Raycasting
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let pointerDownX = 0;
    let pointerDownY = 0;
    let userYawOffset = 0;
    let userPitchOffset = 0;
    let targetYawOffset = 0;
    let targetPitchOffset = 0;
    let lastRaycastTime = 0;
    let lastWheelTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      pointerDownX = e.clientX;
      pointerDownY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        targetYawOffset = THREE.MathUtils.clamp(targetYawOffset - dx * 0.0055, -1.35, 1.35);
        targetPitchOffset = THREE.MathUtils.clamp(targetPitchOffset + dy * 0.004, -0.45, 0.65);
        return;
      }

      // Throttled hover raycast on Layer 1
      const now = performance.now();
      if (now - lastRaycastTime < 65) return;
      lastRaycastTime = now;

      const rect = renderer.domElement.getBoundingClientRect();
      _pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(_pointerNdc, camera);
      const hits = raycaster.intersectObjects(hitProxies, false);
      if (hits.length > 0) {
        const hitChapter = hits[0].object.userData.chapterId as ChapterId;
        setHoveredChapter(hitChapter);
      } else {
        setHoveredChapter(null);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      const moveDist = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
      if (moveDist < 6) {
        // Click raycast to select monument directly in 3D space
        const rect = renderer.domElement.getBoundingClientRect();
        _pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        _pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(_pointerNdc, camera);
        const hits = raycaster.intersectObjects(hitProxies, false);
        if (hits.length > 0) {
          const hitChapter = hits[0].object.userData.chapterId as ChapterId;
          targetYawOffset = 0;
          targetPitchOffset = 0;
          stateRef.current.onSelectChapter(hitChapter);
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      if (now - lastWheelTime < 650) return;
      if (Math.abs(e.deltaY) > 28) {
        lastWheelTime = now;
        targetYawOffset = 0;
        targetPitchOffset = 0;
        stateRef.current.onStepChapter(e.deltaY > 0 ? 1 : -1);
      }
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domEl.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('resize', onResize);

    // 7. Software-WebGL Safe Render Loop with gl.fenceSync afterDraw()
    let frameId = 0;
    let isDisposed = false;
    const clock = new THREE.Clock();
    let currentExplode = stateRef.current.explodeFactor;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext | null;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isDisposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function updateSceneKinematics(dt: number, elapsed: number) {
      const { activeChapter: currChapter, cameraViewMode: currMode, explodeFactor: targetExplode } = stateRef.current;

      // Smoothly damp explode factor & user orbit offsets
      currentExplode = THREE.MathUtils.damp(currentExplode, targetExplode, 6, dt);
      userYawOffset = THREE.MathUtils.damp(userYawOffset, targetYawOffset, 6, dt);
      userPitchOffset = THREE.MathUtils.damp(userPitchOffset, targetPitchOffset, 6, dt);

      // Compute desired camera position & lookAt target
      const camSpec = getChapterCameraTransform(currChapter, currMode, currentExplode);
      _desiredLookAt.set(...camSpec.lookAtTarget);

      // Apply user drag orbit around the monument target
      const baseDx = camSpec.cameraPosition[0] - camSpec.lookAtTarget[0];
      const baseDy = camSpec.cameraPosition[1] - camSpec.lookAtTarget[1];
      const baseDz = camSpec.cameraPosition[2] - camSpec.lookAtTarget[2];
      const radiusXZ = Math.hypot(baseDx, baseDz);
      const baseAngle = Math.atan2(baseDx, baseDz) + userYawOffset;

      _desiredCamPos.set(
        camSpec.lookAtTarget[0] + Math.sin(baseAngle) * radiusXZ,
        camSpec.lookAtTarget[1] + baseDy + userPitchOffset * 2.2,
        camSpec.lookAtTarget[2] + Math.cos(baseAngle) * radiusXZ,
      );

      camera.position.x = THREE.MathUtils.damp(camera.position.x, _desiredCamPos.x, 4.5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _desiredCamPos.y, 4.5, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _desiredCamPos.z, 4.5, dt);

      _currentLookAt.x = THREE.MathUtils.damp(_currentLookAt.x, _desiredLookAt.x, 5.5, dt);
      _currentLookAt.y = THREE.MathUtils.damp(_currentLookAt.y, _desiredLookAt.y, 5.5, dt);
      _currentLookAt.z = THREE.MathUtils.damp(_currentLookAt.z, _desiredLookAt.z, 5.5, dt);
      camera.lookAt(_currentLookAt);

      // Move keyLight with active monument so shadows stay crisp
      keyLight.position.set(_currentLookAt.x + 7, 13, _currentLookAt.z + 9);
      keyLight.target.position.copy(_currentLookAt);

      // Subtle rotation of constellation shards
      constellationMesh.rotation.y = elapsed * 0.015;

      // Update each monument's kinetic core & exploded parts
      for (let i = 0; i < monuments.length; i++) {
        const mon: MonumentInstance = monuments[i];
        const isCurrent = mon.chapterId === currChapter;
        const monExplode = isCurrent ? currentExplode : 0;

        // Gentle levitation of the kinetic core
        mon.kineticCore.position.y = 2.05 + Math.sin(elapsed * 1.4 + i) * 0.055;
        mon.kineticCore.rotation.y = elapsed * 0.18;

        // Scale selection halo ring slightly when active
        const haloScale = isCurrent ? 1.06 : 0.92;
        mon.haloRing.scale.setScalar(THREE.MathUtils.damp(mon.haloRing.scale.x, haloScale, 6, dt));

        for (let p = 0; p < mon.explodableParts.length; p++) {
          const part = mon.explodableParts[p];
          _partTargetPos
            .copy(part.basePosition)
            .addScaledVector(part.explodeVector, monExplode);
          part.mesh.position.copy(_partTargetPos);

          part.mesh.rotation.x += part.rotationSpeed[0] * dt;
          part.mesh.rotation.y += part.rotationSpeed[1] * dt;
          part.mesh.rotation.z += part.rotationSpeed[2] * dt;
        }
      }
    }

    function tick() {
      if (isDisposed) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      updateSceneKinematics(dt, elapsed);
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    // Render initial frame immediately, then schedule loop
    updateSceneKinematics(0.016, 0);
    renderer.render(scene, camera);
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      domEl.removeEventListener('webglcontextlost', handleContextLost);
      domEl.removeEventListener('webglcontextrestored', handleContextRestored);
      textures.dispose();
      materials.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#060609]">
      {/* Dedicated empty ref container for Three.js WebGLRenderer */}
      <div
        ref={canvasMountRef}
        data-testid="spatial-webgl-canvas"
        data-active-chapter={activeChapter}
        data-hovered-chapter={hoveredChapter ?? 'none'}
        className={`w-full h-full ${hoveredChapter ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
      />

      {/* Graceful Static Architectural Fallback if WebGL context is unavailable */}
      {webglFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#060609] p-8 text-center">
          <div className="max-w-md border border-[#D4AF37]/30 bg-[#0B0B10] p-8 rounded-xl">
            <p className="font-mono-tabular text-xs text-[#D4AF37] mb-2">CAL. MS-01 · ARCHITECTURAL VIEWPORT</p>
            <h2 className="font-display text-2xl font-semibold text-[#F4F1EA] mb-2">
              Mohammad Saad Spatial Atelier
            </h2>
            <p className="text-sm text-[#A1A1AA]">
              Interactive 3D WebGL viewports are paused on this graphics context. All portfolio chapters, engineering specifications, and live deployments remain accessible via the navigation controls.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
