import * as THREE from 'three';
import { CHAPTERS, ChapterId, FINISH_PRESETS, FinishPresetId } from '../data/portfolioData';
import { ProceduralTextureSet } from './proceduralTextures';

export interface ExplodablePart {
  mesh: THREE.Object3D;
  basePosition: THREE.Vector3;
  explodeVector: THREE.Vector3;
  rotationSpeed: [number, number, number];
}

export interface MonumentInstance {
  chapterId: ChapterId;
  rootGroup: THREE.Group;
  kineticCore: THREE.Group;
  explodableParts: ExplodablePart[];
  hitProxy: THREE.Mesh;
  haloRing: THREE.Mesh;
}

export interface AtelierSceneMaterials {
  primaryMetal: THREE.MeshPhysicalMaterial;
  secondaryMetal: THREE.MeshStandardMaterial;
  honedObsidian: THREE.MeshStandardMaterial;
  matteCarbon: THREE.MeshStandardMaterial;
  opticalCrystal: THREE.MeshPhysicalMaterial;
  emissiveGold: THREE.MeshStandardMaterial;
  emissiveCyan: THREE.MeshStandardMaterial;
  emissiveViolet: THREE.MeshStandardMaterial;
  dialSurface: THREE.MeshStandardMaterial;
  updateFinishPreset: (presetId: FinishPresetId) => void;
  dispose: () => void;
}

export function createAtelierMaterials(
  textures: ProceduralTextureSet,
  isSoftwareGl: boolean,
): AtelierSceneMaterials {
  const initial = FINISH_PRESETS[0];

  // 1. Anisotropic Brushed Solar Gold / Primary Cosmic Alloy (roughness: 0.16, metalness: 0.92)
  const primaryMetal = new THREE.MeshPhysicalMaterial({
    color: initial.primaryMetalHex,
    metalness: 0.92,
    roughness: 0.16,
    bumpMap: textures.brushedBump,
    bumpScale: 0.006,
    clearcoat: 0.4,
    clearcoatRoughness: 0.12,
    anisotropy: isSoftwareGl ? 0 : 0.75,
    anisotropyRotation: Math.PI / 4,
  });

  // 2. Secondary Celestial Alloy (roughness: 0.44, metalness: 0.85 — >= 0.25 roughness delta)
  const secondaryMetal = new THREE.MeshStandardMaterial({
    color: initial.secondaryMetalHex,
    metalness: 0.85,
    roughness: 0.44,
    bumpMap: textures.brushedBump,
    bumpScale: 0.01,
  });

  // 3. Deep Space Honed Obsidian (roughness: 0.72, metalness: 0.18)
  const honedObsidian = new THREE.MeshStandardMaterial({
    color: initial.obsidianHex,
    metalness: 0.18,
    roughness: 0.72,
    bumpMap: textures.brushedBump,
    bumpScale: 0.012,
  });

  // 4. Matte Structural Aerospace Carbon (roughness: 0.86, metalness: 0.1)
  const matteCarbon = new THREE.MeshStandardMaterial({
    color: 0x0f1322,
    metalness: 0.1,
    roughness: 0.86,
  });

  // 5. Optical Starlight Crystal (software-WebGL safe transmission fallback)
  const opticalCrystal = new THREE.MeshPhysicalMaterial({
    color: initial.crystalTintHex,
    metalness: 0.05,
    roughness: 0.06,
    transmission: isSoftwareGl ? 0 : 0.92,
    transparent: true,
    opacity: isSoftwareGl ? 0.55 : 1.0,
    ior: 1.76,
    thickness: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  });

  // 6. Glowing Solar Core Material
  const emissiveGold = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.85,
    roughness: 0.2,
    metalness: 0.5,
  });

  // 7. Glowing Pulsar Cyan Material
  const emissiveCyan = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.9,
    roughness: 0.18,
    metalness: 0.4,
  });

  // 8. Glowing Supernova Violet Material
  const emissiveViolet = new THREE.MeshStandardMaterial({
    color: 0xc084fc,
    emissive: 0x9333ea,
    emissiveIntensity: 0.85,
    roughness: 0.2,
    metalness: 0.4,
  });

  // 9. Celestial Astrolabe Engraved Dial Surface
  const dialSurface = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: textures.dialAlbedo,
    roughness: 0.3,
    metalness: 0.65,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  const updateFinishPreset = (presetId: FinishPresetId) => {
    const preset = FINISH_PRESETS.find((p) => p.id === presetId) ?? FINISH_PRESETS[0];
    primaryMetal.color.setHex(preset.primaryMetalHex);
    secondaryMetal.color.setHex(preset.secondaryMetalHex);
    honedObsidian.color.setHex(preset.obsidianHex);
    opticalCrystal.color.setHex(preset.crystalTintHex);
    emissiveGold.color.setHex(preset.primaryMetalHex);
    emissiveGold.emissive.setHex(preset.primaryMetalHex);
  };

  const dispose = () => {
    primaryMetal.dispose();
    secondaryMetal.dispose();
    honedObsidian.dispose();
    matteCarbon.dispose();
    opticalCrystal.dispose();
    emissiveGold.dispose();
    emissiveCyan.dispose();
    emissiveViolet.dispose();
    dialSurface.dispose();
  };

  return {
    primaryMetal,
    secondaryMetal,
    honedObsidian,
    matteCarbon,
    opticalCrystal,
    emissiveGold,
    emissiveCyan,
    emissiveViolet,
    dialSurface,
    updateFinishPreset,
    dispose,
  };
}

/**
 * Helper to create a smooth lathe-turned hyper-conductor / telescope dish profile
 */
function createLatheHyperbolicGeometry(scale: number = 1): THREE.LatheGeometry {
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.12 * scale, 0),
    new THREE.Vector2(0.58 * scale, 0.08 * scale),
    new THREE.Vector2(0.34 * scale, 0.28 * scale),
    new THREE.Vector2(0.24 * scale, 0.56 * scale),
    new THREE.Vector2(0.52 * scale, 0.82 * scale),
    new THREE.Vector2(0.22 * scale, 0.98 * scale),
  ];
  return new THREE.LatheGeometry(points, 36);
}

/**
 * Builds the sleek Floating Observatory Platform beneath each cosmic monument (grounded at y = 0)
 */
function buildObservatoryPlatform(
  group: THREE.Group,
  explodableParts: ExplodablePart[],
  materials: AtelierSceneMaterials,
  textures: ProceduralTextureSet,
  castShadow: boolean,
): THREE.Mesh {
  // Nebula radial glow disc beneath the platform
  const nebulaGeo = new THREE.PlaneGeometry(7.2, 7.2);
  const nebulaMat = new THREE.MeshBasicMaterial({
    map: textures.nebulaRingAlbedo,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const nebulaMesh = new THREE.Mesh(nebulaGeo, nebulaMat);
  nebulaMesh.rotation.x = -Math.PI / 2;
  nebulaMesh.position.y = 0.01;
  group.add(nebulaMesh);

  // Soft contact shadow disc at y = 0.02
  const shadowGeo = new THREE.PlaneGeometry(5.0, 5.0);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: textures.contactShadow,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.02;
  group.add(shadowMesh);

  // Part 1: Sleek Tapered Obsidian Observatory Base (smooth 64-segment cylinder)
  const baseGeo = new THREE.CylinderGeometry(1.85, 1.45, 0.26, 64);
  const baseMesh = new THREE.Mesh(baseGeo, materials.honedObsidian);
  baseMesh.position.set(0, 0.13, 0);
  baseMesh.receiveShadow = true;
  baseMesh.castShadow = castShadow;
  group.add(baseMesh);

  // Part 2: Precision Metallic Bevel Ring
  const collarGeo = new THREE.TorusGeometry(1.68, 0.045, 24, 72);
  const collarMesh = new THREE.Mesh(collarGeo, materials.primaryMetal);
  collarMesh.rotation.x = Math.PI / 2;
  collarMesh.position.set(0, 0.28, 0);
  group.add(collarMesh);
  explodableParts.push({
    mesh: collarMesh,
    basePosition: collarMesh.position.clone(),
    explodeVector: new THREE.Vector3(0, -0.22, 0),
    rotationSpeed: [0, 0, 0.15],
  });

  // Part 3: Upper Astronomical Pedestal Drum
  const drumGeo = new THREE.CylinderGeometry(1.48, 1.62, 0.26, 64);
  const drumMesh = new THREE.Mesh(drumGeo, materials.matteCarbon);
  drumMesh.position.set(0, 0.42, 0);
  drumMesh.receiveShadow = true;
  drumMesh.castShadow = castShadow;
  group.add(drumMesh);

  // Part 4: Engraved Celestial Star-Map Dial Plate
  const dialGeo = new THREE.CylinderGeometry(1.44, 1.44, 0.02, 64);
  const dialMesh = new THREE.Mesh(dialGeo, materials.dialSurface);
  dialMesh.position.set(0, 0.56, 0);
  group.add(dialMesh);
  explodableParts.push({
    mesh: dialMesh,
    basePosition: dialMesh.position.clone(),
    explodeVector: new THREE.Vector3(0, 0.18, 0),
    rotationSpeed: [0, -0.18, 0],
  });

  // Part 5: Outer Levitating Starlight Halo Ring
  const haloGeo = new THREE.TorusGeometry(2.15, 0.02, 20, 96);
  const haloMesh = new THREE.Mesh(haloGeo, materials.emissiveCyan);
  haloMesh.rotation.x = Math.PI / 2;
  haloMesh.position.set(0, 0.32, 0);
  group.add(haloMesh);

  return haloMesh;
}

/**
 * Builds the 5-Arm Colorful Spiral Galaxy Vortex + Deep-Space Starfield (Zero-Lag Single-Draw-Call Points)
 * and the 5 Clean Astronomical 3D Monuments
 */
export function buildAtelierWorld(
  scene: THREE.Scene,
  materials: AtelierSceneMaterials,
  textures: ProceduralTextureSet,
  isSoftwareGl: boolean,
): {
  monuments: MonumentInstance[];
  galaxyPoints: THREE.Points;
  deepStarfield: THREE.Points;
  hitProxies: THREE.Mesh[];
} {
  const castShadow = !isSoftwareGl;

  // 1. MULTI-COLOR 5-ARM SPIRAL GALAXY VORTEX (1 Draw Call, Zero Lag)
  const galaxyStarCount = 6500;
  const galaxyGeo = new THREE.BufferGeometry();
  const galPositions = new Float32Array(galaxyStarCount * 3);
  const galColors = new Float32Array(galaxyStarCount * 3);

  const palette = [
    new THREE.Color(0x38bdf8), // Celestial Cyan
    new THREE.Color(0xa855f7), // Andromeda Violet
    new THREE.Color(0xf43f5e), // Nebula Rose
    new THREE.Color(0xf59e0b), // Supernova Gold
    new THREE.Color(0xe0f2fe), // Starlight Ice
  ];
  const coreColor = new THREE.Color(0xfffbeb);
  const tempColor = new THREE.Color();

  const hash = (n: number): number => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
    return x - Math.floor(x);
  };

  const arms = 5;
  for (let i = 0; i < galaxyStarCount; i++) {
    const i3 = i * 3;
    const r1 = hash(i * 7 + 1);
    const r2 = hash(i * 7 + 2) + hash(i * 7 + 3) - 1.0; // Gaussian-like bell distribution [-1, 1]
    const r3 = hash(i * 7 + 4) + hash(i * 7 + 5) - 1.0;
    const r4 = hash(i * 7 + 6) + hash(i * 7 + 7) - 1.0;

    const radius = Math.pow(r1, 1.35) * 24 + 0.8;
    const spinAngle = radius * 0.42;
    const branchAngle = ((i % arms) / arms) * Math.PI * 2;

    const scatter = 0.45 + radius * 0.14;
    const offsetX = r2 * scatter;
    const offsetY = r3 * (scatter * 0.35);
    const offsetZ = r4 * scatter;

    // Centered at local (0, 0, 0) so rotating galaxyPoints spins around its true galactic core
    galPositions[i3] = Math.cos(branchAngle + spinAngle) * radius + offsetX;
    galPositions[i3 + 1] = offsetY;
    galPositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + offsetZ;

    const armColor = palette[i % arms];
    const mixRatio = Math.min(1, radius / 15);
    tempColor.copy(coreColor).lerp(armColor, mixRatio);

    galColors[i3] = tempColor.r;
    galColors[i3 + 1] = tempColor.g;
    galColors[i3 + 2] = tempColor.b;
  }

  galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galPositions, 3));
  galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galColors, 3));

  const galaxyMat = new THREE.PointsMaterial({
    size: 0.36,
    map: textures.starSprite,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat);
  galaxyPoints.position.set(0, 3.2, -13.5);
  galaxyPoints.rotation.x = 0.62;
  galaxyPoints.rotation.z = -0.22;

  // Add a luminous multi-color nebula core glow inside galaxyPoints (rotates with the galaxy)
  const galacticCoreGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(26, 26),
    new THREE.MeshBasicMaterial({
      map: textures.nebulaRingAlbedo,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
  );
  galacticCoreGlow.rotation.x = Math.PI / 2;
  galaxyPoints.add(galacticCoreGlow);

  scene.add(galaxyPoints);

  // 2. DEEP-SPACE SURROUNDING STARFIELD DOME (1 Draw Call, Zero Lag)
  const deepCount = 2400;
  const deepGeo = new THREE.BufferGeometry();
  const deepPos = new Float32Array(deepCount * 3);
  const deepCol = new Float32Array(deepCount * 3);

  for (let i = 0; i < deepCount; i++) {
    const i3 = i * 3;
    const u = hash(i * 5 + 101);
    const v = hash(i * 5 + 202);
    const w = hash(i * 5 + 303);
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const dist = 24 + w * 36;

    deepPos[i3] = dist * Math.sin(phi) * Math.cos(theta);
    deepPos[i3 + 1] = dist * Math.cos(phi) * 0.6 + 3.5;
    deepPos[i3 + 2] = -10 + dist * Math.sin(phi) * Math.sin(theta);

    const starHue = palette[i % palette.length];
    deepCol[i3] = starHue.r * 0.9 + 0.1;
    deepCol[i3 + 1] = starHue.g * 0.9 + 0.1;
    deepCol[i3 + 2] = starHue.b * 0.9 + 0.1;
  }

  deepGeo.setAttribute('position', new THREE.BufferAttribute(deepPos, 3));
  deepGeo.setAttribute('color', new THREE.BufferAttribute(deepCol, 3));

  const deepMat = new THREE.PointsMaterial({
    size: 0.34,
    map: textures.starSprite,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const deepStarfield = new THREE.Points(deepGeo, deepMat);
  scene.add(deepStarfield);

  // 3. Starlight Constellation Conduit linking the 5 Observatory Sectors
  const pathPoints = CHAPTERS.map((c) => new THREE.Vector3(c.worldPosition[0], 0.12, c.worldPosition[2]));
  const pathCurve = new THREE.CatmullRomCurve3(pathPoints);
  const conduitGeo = new THREE.TubeGeometry(pathCurve, 120, 0.03, 12, false);
  const conduitMesh = new THREE.Mesh(conduitGeo, materials.emissiveCyan);
  scene.add(conduitMesh);

  // 4. Build the 5 Ultra-Clean Cosmic & Astronomical 3D Monuments
  const monuments: MonumentInstance[] = [];
  const hitProxies: THREE.Mesh[] = [];

  CHAPTERS.forEach((chapter) => {
    const rootGroup = new THREE.Group();
    rootGroup.position.set(chapter.worldPosition[0], chapter.worldPosition[1], chapter.worldPosition[2]);
    scene.add(rootGroup);

    const explodableParts: ExplodablePart[] = [];
    const haloRing = buildObservatoryPlatform(rootGroup, explodableParts, materials, textures, castShadow);

    const kineticCore = new THREE.Group();
    kineticCore.position.set(0, 2.0, 0);
    rootGroup.add(kineticCore);

    if (chapter.id === 'origin') {
      // SECTOR 01: Celestial Dyson Sphere & Binary Star Orrery (12 smooth precision parts)
      // Primary Silhouette: Lathe-Turned Observatory Pedestal Cradle
      const cradle = new THREE.Mesh(createLatheHyperbolicGeometry(0.92), materials.secondaryMetal);
      cradle.position.set(0, -1.42, 0);
      cradle.castShadow = castShadow;
      kineticCore.add(cradle);
      explodableParts.push({
        mesh: cradle,
        basePosition: cradle.position.clone(),
        explodeVector: new THREE.Vector3(0, -0.4, 0),
        rotationSpeed: [0, 0.2, 0],
      });

      // Central Binary Fusion Star Core (Glowing Solar Sphere + Optical Corona Shell)
      const fusionStar = new THREE.Mesh(new THREE.SphereGeometry(0.38, 48, 48), materials.emissiveGold);
      kineticCore.add(fusionStar);
      explodableParts.push({
        mesh: fusionStar,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0, 1.05, 0),
        rotationSpeed: [0, 0.5, 0],
      });

      const coronaShell = new THREE.Mesh(new THREE.SphereGeometry(0.54, 48, 48), materials.opticalCrystal);
      kineticCore.add(coronaShell);
      explodableParts.push({
        mesh: coronaShell,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0, 1.35, 0),
        rotationSpeed: [0.3, -0.4, 0],
      });

      // 3 Smooth Concentric Dyson Armillary Rings (64-segment high-resolution Torus)
      const ringSpecs = [
        { r: 1.25, tube: 0.042, mat: materials.primaryMetal, rot: [0.3, 0, 0], vel: [0.35, 0.45, 0], exp: [0, 0.5, 0.6] },
        { r: 1.02, tube: 0.036, mat: materials.secondaryMetal, rot: [Math.PI / 3, 0.4, 0], vel: [-0.4, 0.3, 0.25], exp: [0.6, 0.25, -0.4] },
        { r: 0.78, tube: 0.03, mat: materials.emissiveCyan, rot: [-Math.PI / 4, 0, 0.5], vel: [0.25, -0.55, 0.3], exp: [-0.6, 0.35, 0.4] },
      ];
      ringSpecs.forEach((spec) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(spec.r, spec.tube, 28, 96), spec.mat);
        ring.rotation.set(spec.rot[0], spec.rot[1], spec.rot[2]);
        ring.castShadow = castShadow;
        kineticCore.add(ring);
        explodableParts.push({
          mesh: ring,
          basePosition: new THREE.Vector3(0, 0, 0),
          explodeVector: new THREE.Vector3(spec.exp[0], spec.exp[1], spec.exp[2]),
          rotationSpeed: [spec.vel[0], spec.vel[1], spec.vel[2]],
        });
      });

      // 3 Orbiting Exoplanet Moons with miniature rings
      for (let m = 0; m < 3; m++) {
        const moonPivot = new THREE.Group();
        const angle = (m / 3) * Math.PI * 2;
        const dist = 1.48 + m * 0.22;
        moonPivot.position.set(Math.cos(angle) * dist, (m - 1) * 0.32, Math.sin(angle) * dist);

        const planetMat = m === 0 ? materials.emissiveCyan : m === 1 ? materials.emissiveViolet : materials.primaryMetal;
        const planet = new THREE.Mesh(new THREE.SphereGeometry(0.14, 32, 32), planetMat);
        moonPivot.add(planet);

        const miniRing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.012, 16, 48), materials.primaryMetal);
        miniRing.rotation.x = Math.PI / 2.4;
        moonPivot.add(miniRing);

        kineticCore.add(moonPivot);
        explodableParts.push({
          mesh: moonPivot,
          basePosition: moonPivot.position.clone(),
          explodeVector: moonPivot.position.clone().normalize().multiplyScalar(0.85),
          rotationSpeed: [0, 0.8 + m * 0.3, 0],
        });
      }
    } else if (chapter.id === 'systems') {
      // SECTOR 02: FLYNAX & ECO AI Quantum Tokamak & Neural Pulsar Core
      // Central Pulsar Intelligence Sphere + Crystal Containment Lens
      const pulsarCore = new THREE.Mesh(new THREE.SphereGeometry(0.42, 48, 48), materials.emissiveCyan);
      kineticCore.add(pulsarCore);
      explodableParts.push({
        mesh: pulsarCore,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0, 1.1, 0),
        rotationSpeed: [0, 0.6, 0],
      });

      const crystalLens = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.14, 32, 96), materials.opticalCrystal);
      crystalLens.rotation.x = Math.PI / 2;
      kineticCore.add(crystalLens);
      explodableParts.push({
        mesh: crystalLens,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0, 0.65, 0),
        rotationSpeed: [0.15, 0.4, 0],
      });

      // 4 Vertical Tokamak Magnetic Confinement Coils arranged radially
      for (let c = 0; c < 4; c++) {
        const angle = (c / 4) * Math.PI * 2;
        const coil = new THREE.Mesh(
          new THREE.TorusGeometry(0.95, 0.04, 24, 80),
          c % 2 === 0 ? materials.primaryMetal : materials.secondaryMetal,
        );
        coil.rotation.y = angle;
        kineticCore.add(coil);
        explodableParts.push({
          mesh: coil,
          basePosition: new THREE.Vector3(0, 0, 0),
          explodeVector: new THREE.Vector3(Math.cos(angle) * 0.75, 0.25, Math.sin(angle) * 0.75),
          rotationSpeed: [0, 0.25 * (c % 2 === 0 ? 1 : -1), 0],
        });
      }

      // Smooth Double-Helix Plasma Stream (TubeGeometry)
      const helixPts: THREE.Vector3[] = [];
      for (let t = 0; t <= 48; t++) {
        const a = (t / 48) * Math.PI * 4;
        helixPts.push(new THREE.Vector3(Math.cos(a) * 1.12, -0.65 + (t / 48) * 1.3, Math.sin(a) * 1.12));
      }
      const plasmaHelix = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(helixPts), 96, 0.026, 16, false),
        materials.emissiveViolet,
      );
      kineticCore.add(plasmaHelix);
      explodableParts.push({
        mesh: plasmaHelix,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0, -0.45, 0.65),
        rotationSpeed: [0, -0.45, 0],
      });
    } else if (chapter.id === 'deployments') {
      // SECTOR 03: Orbital Ring Station & Twin Starlight Citadels (Solvatax & De Horizon Travels)
      // Spire A: Sleek Fluted Starlight Cylinder Spire
      const spireA = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.34, 1.85, 32), materials.primaryMetal);
      spireA.position.set(-0.42, -0.1, 0);
      spireA.castShadow = castShadow;
      kineticCore.add(spireA);
      explodableParts.push({
        mesh: spireA,
        basePosition: spireA.position.clone(),
        explodeVector: new THREE.Vector3(-0.75, 0.35, 0),
        rotationSpeed: [0, 0.15, 0],
      });

      // Spire B: Crystal & Titanium Twin Spire
      const spireB = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.3, 1.55, 32), materials.opticalCrystal);
      spireB.position.set(0.42, -0.25, 0);
      kineticCore.add(spireB);
      explodableParts.push({
        mesh: spireB,
        basePosition: spireB.position.clone(),
        explodeVector: new THREE.Vector3(0.75, 0.45, 0),
        rotationSpeed: [0, -0.15, 0],
      });

      // Rotating Centrifugal Orbital Station Ring + 2 Glowing Trajectory Arcs
      const stationRing = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.065, 28, 96), materials.secondaryMetal);
      stationRing.rotation.x = Math.PI / 2;
      stationRing.position.set(0, 0.05, 0);
      kineticCore.add(stationRing);
      explodableParts.push({
        mesh: stationRing,
        basePosition: stationRing.position.clone(),
        explodeVector: new THREE.Vector3(0, 0.65, 0),
        rotationSpeed: [0, 0, 0.35],
      });

      const arc1 = new THREE.Mesh(new THREE.TorusGeometry(1.36, 0.022, 20, 96), materials.emissiveCyan);
      arc1.rotation.set(Math.PI / 3, Math.PI / 5, 0);
      kineticCore.add(arc1);
      explodableParts.push({
        mesh: arc1,
        basePosition: new THREE.Vector3(0, 0.05, 0),
        explodeVector: new THREE.Vector3(0, 0.95, 0.45),
        rotationSpeed: [0.3, 0.45, 0],
      });

      const arc2 = new THREE.Mesh(new THREE.TorusGeometry(1.36, 0.022, 20, 96), materials.emissiveGold);
      arc2.rotation.set(-Math.PI / 3, -Math.PI / 5, 0);
      kineticCore.add(arc2);
      explodableParts.push({
        mesh: arc2,
        basePosition: new THREE.Vector3(0, 0.05, 0),
        explodeVector: new THREE.Vector3(0, 1.15, -0.45),
        rotationSpeed: [-0.3, -0.45, 0],
      });
    } else if (chapter.id === 'ventures') {
      // SECTOR 04: Deep-Space Telemetry Array & Quantum Warp Gate (FLYOS, QIMTP, Space R&D)
      // Spun Parabolic Deep-Space Dish (LatheGeometry)
      const dishPoints = [
        new THREE.Vector2(0.05, 0),
        new THREE.Vector2(0.38, 0.08),
        new THREE.Vector2(0.76, 0.25),
        new THREE.Vector2(1.02, 0.52),
      ];
      const dishMesh = new THREE.Mesh(new THREE.LatheGeometry(dishPoints, 48), materials.primaryMetal);
      dishMesh.position.set(0, -0.78, 0);
      dishMesh.castShadow = castShadow;
      kineticCore.add(dishMesh);
      explodableParts.push({
        mesh: dishMesh,
        basePosition: dishMesh.position.clone(),
        explodeVector: new THREE.Vector3(0, -0.55, 0),
        rotationSpeed: [0, 0.3, 0],
      });

      // 3 Interlocking Quantum Warp Gate Rings
      for (let r = 0; r < 3; r++) {
        const mat = r === 0 ? materials.primaryMetal : r === 1 ? materials.emissiveViolet : materials.emissiveCyan;
        const warpRing = new THREE.Mesh(new THREE.TorusGeometry(1.04 - r * 0.18, 0.038, 24, 96), mat);
        warpRing.rotation.set((r * Math.PI) / 3, (r * Math.PI) / 4, 0);
        warpRing.position.set(0, 0.15, 0);
        kineticCore.add(warpRing);
        explodableParts.push({
          mesh: warpRing,
          basePosition: warpRing.position.clone(),
          explodeVector: new THREE.Vector3((r - 1) * 0.65, 0.4 + r * 0.25, (r % 2 === 0 ? 1 : -1) * 0.45),
          rotationSpeed: [0.45 * (r + 1) * 0.5, -0.35, 0.25],
        });
      }

      // Central Wormhole Horizon Sphere
      const wormholeCore = new THREE.Mesh(new THREE.SphereGeometry(0.38, 48, 48), materials.opticalCrystal);
      wormholeCore.position.set(0, 0.15, 0);
      kineticCore.add(wormholeCore);
      explodableParts.push({
        mesh: wormholeCore,
        basePosition: wormholeCore.position.clone(),
        explodeVector: new THREE.Vector3(0, 1.15, 0),
        rotationSpeed: [-0.4, 0.65, 0.2],
      });
    } else {
      // SECTOR 05: Six-Moon Planetary Harmonic Synchronizer (6 Engineering Pillars & Certifications)
      // Central Astronomical Spindle Column
      const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 1.65, 48), materials.honedObsidian);
      spindle.position.set(0, -0.25, 0);
      spindle.castShadow = castShadow;
      kineticCore.add(spindle);
      explodableParts.push({
        mesh: spindle,
        basePosition: spindle.position.clone(),
        explodeVector: new THREE.Vector3(0, -0.35, 0),
        rotationSpeed: [0, 0.2, 0],
      });

      // 6 Orbiting Ringed Exoplanets representing the 6 Engineering Mastery Pillars
      for (let p = 0; p < 6; p++) {
        const angle = (p / 6) * Math.PI * 2;
        const radius = 1.08;
        const px = Math.cos(angle) * radius;
        const pz = Math.sin(angle) * radius;
        const py = -0.25 + (p % 3) * 0.28;

        const planetGroup = new THREE.Group();
        planetGroup.position.set(px, py, pz);

        const mat =
          p % 3 === 0 ? materials.emissiveCyan : p % 3 === 1 ? materials.emissiveGold : materials.emissiveViolet;
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 32), mat);
        planetGroup.add(sphere);

        const saturnRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.015, 16, 48), materials.primaryMetal);
        saturnRing.rotation.x = Math.PI / 2.3;
        planetGroup.add(saturnRing);

        kineticCore.add(planetGroup);
        explodableParts.push({
          mesh: planetGroup,
          basePosition: planetGroup.position.clone(),
          explodeVector: new THREE.Vector3(px * 0.85, 0.35 + (p % 2) * 0.25, pz * 0.85),
          rotationSpeed: [0.2, 0.7, 0],
        });
      }

      // Apex Starlight Crown Sphere
      const apexStar = new THREE.Mesh(new THREE.SphereGeometry(0.32, 48, 48), materials.opticalCrystal);
      apexStar.position.set(0, 0.88, 0);
      kineticCore.add(apexStar);
      explodableParts.push({
        mesh: apexStar,
        basePosition: apexStar.position.clone(),
        explodeVector: new THREE.Vector3(0, 1.35, 0),
        rotationSpeed: [0.3, 0.8, 0],
      });
    }

    // Simplified invisible proxy collision cylinder on Layer 1 for zero-lag raycasting
    const hitProxyGeo = new THREE.CylinderGeometry(2.0, 2.0, 3.8, 16);
    const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitProxy = new THREE.Mesh(hitProxyGeo, hitProxyMat);
    hitProxy.position.set(chapter.worldPosition[0], 1.8, chapter.worldPosition[2]);
    hitProxy.layers.set(1);
    hitProxy.userData = { chapterId: chapter.id };
    scene.add(hitProxy);
    hitProxies.push(hitProxy);

    monuments.push({
      chapterId: chapter.id,
      rootGroup,
      kineticCore,
      explodableParts,
      hitProxy,
      haloRing,
    });
  });

  return {
    monuments,
    galaxyPoints,
    deepStarfield,
    hitProxies,
  };
}
