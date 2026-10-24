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
  dialSurface: THREE.MeshStandardMaterial;
  floorMaterial: THREE.MeshStandardMaterial;
  updateFinishPreset: (presetId: FinishPresetId) => void;
  dispose: () => void;
}

export function createAtelierMaterials(
  textures: ProceduralTextureSet,
  isSoftwareGl: boolean,
): AtelierSceneMaterials {
  const initial = FINISH_PRESETS[0];

  // 1. Anisotropic Brushed Luxury Gold / Metal (roughness: 0.18, metalness: 0.94)
  const primaryMetal = new THREE.MeshPhysicalMaterial({
    color: initial.primaryMetalHex,
    metalness: 0.92,
    roughness: 0.18,
    bumpMap: textures.brushedBump,
    bumpScale: 0.008,
    clearcoat: 0.35,
    clearcoatRoughness: 0.15,
    anisotropy: isSoftwareGl ? 0 : 0.75,
    anisotropyRotation: Math.PI / 4,
  });

  // 2. Secondary Satin Bronze / Titanium (roughness: 0.45, metalness: 0.82 — >= 0.25 roughness delta)
  const secondaryMetal = new THREE.MeshStandardMaterial({
    color: initial.secondaryMetalHex,
    metalness: 0.82,
    roughness: 0.46,
    bumpMap: textures.brushedBump,
    bumpScale: 0.012,
  });

  // 3. Honed Nero Obsidian Architectural Stone (roughness: 0.76, metalness: 0.12)
  const honedObsidian = new THREE.MeshStandardMaterial({
    color: initial.obsidianHex,
    metalness: 0.12,
    roughness: 0.76,
    bumpMap: textures.brushedBump,
    bumpScale: 0.015,
  });

  // 4. Matte Structural Carbon (roughness: 0.88, metalness: 0.08)
  const matteCarbon = new THREE.MeshStandardMaterial({
    color: 0x14141c,
    metalness: 0.08,
    roughness: 0.88,
  });

  // 5. Optical Sapphire Crystal (software-WebGL safe transmission fallback)
  const opticalCrystal = new THREE.MeshPhysicalMaterial({
    color: initial.crystalTintHex,
    metalness: 0.05,
    roughness: 0.08,
    transmission: isSoftwareGl ? 0 : 0.92,
    transparent: true,
    opacity: isSoftwareGl ? 0.48 : 1.0,
    ior: 1.76,
    thickness: 1.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });

  // 6. Subtle Warm Filament Accent
  const emissiveGold = new THREE.MeshStandardMaterial({
    color: initial.primaryMetalHex,
    emissive: initial.primaryMetalHex,
    emissiveIntensity: 0.45,
    roughness: 0.25,
    metalness: 0.8,
  });

  // 7. Horological Engraved Dial Surface
  const dialSurface = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: textures.dialAlbedo,
    roughness: 0.35,
    metalness: 0.65,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  // 8. Grand Atrium Floor Material
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: textures.marbleAlbedo,
    roughness: 0.62,
    metalness: 0.18,
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
    dialSurface.dispose();
    floorMaterial.dispose();
  };

  return {
    primaryMetal,
    secondaryMetal,
    honedObsidian,
    matteCarbon,
    opticalCrystal,
    emissiveGold,
    dialSurface,
    floorMaterial,
    updateFinishPreset,
    dispose,
  };
}

/**
 * Helper to create a beveled hexagonal plate via ExtrudeGeometry
 */
function createBeveledHexGeometry(radius: number, depth: number, holeRadius: number = 0): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  if (holeRadius > 0) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, false);
    shape.holes.push(hole);
  }

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.035,
  });
  geo.center();
  return geo;
}

/**
 * Helper to create a lathe-turned horological chalice / manifold profile
 */
function createLatheSpindleGeometry(scale: number = 1): THREE.LatheGeometry {
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.15 * scale, 0),
    new THREE.Vector2(0.55 * scale, 0.08 * scale),
    new THREE.Vector2(0.32 * scale, 0.25 * scale),
    new THREE.Vector2(0.22 * scale, 0.55 * scale),
    new THREE.Vector2(0.48 * scale, 0.78 * scale),
    new THREE.Vector2(0.18 * scale, 0.95 * scale),
  ];
  return new THREE.LatheGeometry(points, 28);
}

/**
 * Builds the shared stepped architectural plinth (grounded at y = 0) + contact shadow + dial inlay
 */
function buildMonumentPlinth(
  group: THREE.Group,
  explodableParts: ExplodablePart[],
  materials: AtelierSceneMaterials,
  textures: ProceduralTextureSet,
  castShadow: boolean,
): THREE.Mesh {
  // Contact shadow disc at y = 0.015 (disjoint depth, no Z-fighting)
  const shadowGeo = new THREE.PlaneGeometry(5.6, 5.6);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: textures.contactShadow,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.015;
  group.add(shadowMesh);

  // Part 1: Lower Stepped Obsidian Plinth Base (y = 0 to 0.24)
  const baseGeo = new THREE.CylinderGeometry(1.85, 2.05, 0.24, 36);
  const baseMesh = new THREE.Mesh(baseGeo, materials.honedObsidian);
  baseMesh.position.set(0, 0.12, 0);
  baseMesh.receiveShadow = true;
  baseMesh.castShadow = castShadow;
  group.add(baseMesh);

  // Part 2: Brushed Brass Bevel Collar Ring (y = 0.24 to 0.32)
  const collarGeo = new THREE.CylinderGeometry(1.62, 1.76, 0.1, 36);
  const collarMesh = new THREE.Mesh(collarGeo, materials.primaryMetal);
  collarMesh.position.set(0, 0.29, 0);
  collarMesh.receiveShadow = true;
  collarMesh.castShadow = castShadow;
  group.add(collarMesh);
  explodableParts.push({
    mesh: collarMesh,
    basePosition: collarMesh.position.clone(),
    explodeVector: new THREE.Vector3(0, -0.18, 0),
    rotationSpeed: [0, 0.08, 0],
  });

  // Part 3: Upper Obsidian Pedestal Drum (y = 0.34 to 0.68)
  const drumGeo = new THREE.CylinderGeometry(1.42, 1.54, 0.34, 36);
  const drumMesh = new THREE.Mesh(drumGeo, materials.matteCarbon);
  drumMesh.position.set(0, 0.51, 0);
  drumMesh.receiveShadow = true;
  drumMesh.castShadow = castShadow;
  group.add(drumMesh);

  // Part 4: Engraved Horological Chapter Dial Plate (y = 0.69)
  const dialGeo = new THREE.CylinderGeometry(1.38, 1.38, 0.02, 48);
  const dialMesh = new THREE.Mesh(dialGeo, materials.dialSurface);
  dialMesh.position.set(0, 0.69, 0);
  group.add(dialMesh);
  explodableParts.push({
    mesh: dialMesh,
    basePosition: dialMesh.position.clone(),
    explodeVector: new THREE.Vector3(0, 0.22, 0),
    rotationSpeed: [0, -0.15, 0],
  });

  // Part 5: Outer Floating Selection Halo Ring
  const haloGeo = new THREE.TorusGeometry(1.95, 0.022, 16, 64);
  const haloMesh = new THREE.Mesh(haloGeo, materials.emissiveGold);
  haloMesh.rotation.x = Math.PI / 2;
  haloMesh.position.set(0, 0.36, 0);
  group.add(haloMesh);

  return haloMesh;
}

/**
 * Builds all 5 composite 9-12 part 3D monuments and the grand architectural atrium
 */
export function buildAtelierWorld(
  scene: THREE.Scene,
  materials: AtelierSceneMaterials,
  textures: ProceduralTextureSet,
  isSoftwareGl: boolean,
): {
  monuments: MonumentInstance[];
  constellationMesh: THREE.InstancedMesh;
  hitProxies: THREE.Mesh[];
} {
  const castShadow = !isSoftwareGl;

  // 1. Grand Architectural Floor & Concentric Brass Walkway Rings
  const floorGeo = new THREE.PlaneGeometry(160, 160);
  const floorMesh = new THREE.Mesh(floorGeo, materials.floorMaterial);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = 0;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  // Architectural pathway connecting all 5 monuments (offset by y = 0.02 to prevent Z-fighting)
  const pathPoints = CHAPTERS.map((c) => new THREE.Vector3(c.worldPosition[0], 0.025, c.worldPosition[2]));
  const pathCurve = new THREE.CatmullRomCurve3(pathPoints);
  const conduitGeo = new THREE.TubeGeometry(pathCurve, 96, 0.045, 8, false);
  const conduitMesh = new THREE.Mesh(conduitGeo, materials.primaryMetal);
  scene.add(conduitMesh);

  // 2. InstancedMesh of 120 Precision Monolith Shards representing 1,214+ Projects
  const shardGeo = new THREE.OctahedronGeometry(0.16, 0);
  shardGeo.scale(0.65, 2.4, 0.65);
  const shardCount = 120;
  const constellationMesh = new THREE.InstancedMesh(shardGeo, materials.secondaryMetal, shardCount);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  for (let i = 0; i < shardCount; i++) {
    const chapterAnchor = CHAPTERS[i % CHAPTERS.length].worldPosition;
    const localIdx = Math.floor(i / CHAPTERS.length);
    const angle = (localIdx / (shardCount / CHAPTERS.length)) * Math.PI * 2 + i * 0.21;
    const radius = 3.4 + (i % 5) * 0.95;
    const height = 1.1 + ((i * 37) % 38) * 0.09;

    dummy.position.set(
      chapterAnchor[0] + Math.cos(angle) * radius,
      height,
      chapterAnchor[2] + Math.sin(angle) * radius,
    );
    dummy.rotation.set(Math.sin(i) * 0.25, angle, Math.cos(i) * 0.2);
    // ±15% scale variation per directive
    const s = 0.85 + ((i * 13) % 30) / 100;
    dummy.scale.set(s, s * (0.9 + (i % 3) * 0.25), s);
    dummy.updateMatrix();
    constellationMesh.setMatrixAt(i, dummy.matrix);

    // Subtle per-instance tint variation
    const tint = i % 3 === 0 ? 0xd4af37 : i % 3 === 1 ? 0x997a2c : 0xe5d4a1;
    color.setHex(tint);
    constellationMesh.setColorAt(i, color);
  }
  constellationMesh.instanceMatrix.needsUpdate = true;
  if (constellationMesh.instanceColor) constellationMesh.instanceColor.needsUpdate = true;
  constellationMesh.computeBoundingSphere();
  scene.add(constellationMesh);

  // 3. Build the 5 Chapter Monuments (each 9–11 distinct parts across Primary, Secondary, Accent scales)
  const monuments: MonumentInstance[] = [];
  const hitProxies: THREE.Mesh[] = [];

  CHAPTERS.forEach((chapter) => {
    const rootGroup = new THREE.Group();
    rootGroup.position.set(chapter.worldPosition[0], chapter.worldPosition[1], chapter.worldPosition[2]);
    scene.add(rootGroup);

    const explodableParts: ExplodablePart[] = [];
    const haloRing = buildMonumentPlinth(rootGroup, explodableParts, materials, textures, castShadow);

    const kineticCore = new THREE.Group();
    kineticCore.position.set(0, 2.05, 0);
    rootGroup.add(kineticCore);

    if (chapter.id === 'origin') {
      // MONUMENT I: The Sovereign Astrolabe (11 total parts)
      // Primary Silhouette: Lathe-turned Horological Spindle Cradle
      const spindleMesh = new THREE.Mesh(createLatheSpindleGeometry(0.95), materials.secondaryMetal);
      spindleMesh.position.set(0, -1.35, 0);
      spindleMesh.castShadow = castShadow;
      kineticCore.add(spindleMesh);
      explodableParts.push({
        mesh: spindleMesh,
        basePosition: spindleMesh.position.clone(),
        explodeVector: new THREE.Vector3(0, -0.45, 0),
        rotationSpeed: [0, 0.2, 0],
      });

      // Secondary Read: 3 Concentric Gimbal Astrolabe Rings
      const outerGimbal = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.055, 20, 64), materials.primaryMetal);
      outerGimbal.castShadow = castShadow;
      kineticCore.add(outerGimbal);
      explodableParts.push({
        mesh: outerGimbal,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0, 0.65, 0.55),
        rotationSpeed: [0.35, 0.5, 0],
      });

      const midGimbal = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.045, 20, 56), materials.honedObsidian);
      midGimbal.rotation.y = Math.PI / 3;
      midGimbal.castShadow = castShadow;
      kineticCore.add(midGimbal);
      explodableParts.push({
        mesh: midGimbal,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0.65, 0.25, -0.45),
        rotationSpeed: [-0.45, 0.3, 0.25],
      });

      const innerGimbal = new THREE.Mesh(createBeveledHexGeometry(0.68, 0.07, 0.52), materials.primaryMetal);
      innerGimbal.rotation.x = Math.PI / 4;
      kineticCore.add(innerGimbal);
      explodableParts.push({
        mesh: innerGimbal,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(-0.6, 0.35, 0.4),
        rotationSpeed: [0.25, -0.6, 0.3],
      });

      // Accent Detail: Central Optical Sapphire Polyhedron & Equatorial Finials
      const crystalCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), materials.opticalCrystal);
      kineticCore.add(crystalCore);
      explodableParts.push({
        mesh: crystalCore,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0, 1.05, 0),
        rotationSpeed: [0.6, 0.8, 0.2],
      });

      const innerFilament = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18, 0), materials.emissiveGold);
      kineticCore.add(innerFilament);
      explodableParts.push({
        mesh: innerFilament,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0, 1.35, 0),
        rotationSpeed: [-0.8, -0.7, 0.4],
      });
    } else if (chapter.id === 'systems') {
      // MONUMENT II: FLYNAX & ECO AI Compiler Core (10 parts)
      // Stacked Beveled Hexagonal Logic Plates (ExtrudeGeometry) + Lathe Cooling Core + Data Conduits
      for (let layer = 0; layer < 4; layer++) {
        const radius = 1.05 - layer * 0.14;
        const hexPlate = new THREE.Mesh(
          createBeveledHexGeometry(radius, 0.09, radius * 0.58),
          layer % 2 === 0 ? materials.primaryMetal : materials.honedObsidian,
        );
        hexPlate.rotation.x = Math.PI / 2;
        hexPlate.position.set(0, -0.55 + layer * 0.38, 0);
        hexPlate.castShadow = castShadow;
        kineticCore.add(hexPlate);
        explodableParts.push({
          mesh: hexPlate,
          basePosition: hexPlate.position.clone(),
          explodeVector: new THREE.Vector3(0, (layer - 1.5) * 0.55, (layer % 2 === 0 ? 1 : -1) * 0.45),
          rotationSpeed: [0, (layer % 2 === 0 ? 1 : -1) * 0.45, 0],
        });
      }

      // Central ECO AI Cognitive Crystal Column
      const ecoCore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.46, 0), materials.opticalCrystal);
      ecoCore.position.set(0, 0.15, 0);
      kineticCore.add(ecoCore);
      explodableParts.push({
        mesh: ecoCore,
        basePosition: ecoCore.position.clone(),
        explodeVector: new THREE.Vector3(0, 1.1, 0),
        rotationSpeed: [0.4, 0.7, -0.3],
      });

      // Helical Tube Data Conduit
      const helixPts: THREE.Vector3[] = [];
      for (let t = 0; t <= 32; t++) {
        const a = (t / 32) * Math.PI * 4;
        helixPts.push(new THREE.Vector3(Math.cos(a) * 0.85, -0.65 + (t / 32) * 1.4, Math.sin(a) * 0.85));
      }
      const helixTube = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(helixPts), 64, 0.028, 8, false),
        materials.secondaryMetal,
      );
      kineticCore.add(helixTube);
      explodableParts.push({
        mesh: helixTube,
        basePosition: new THREE.Vector3(0, 0, 0),
        explodeVector: new THREE.Vector3(0.65, 0.3, 0.65),
        rotationSpeed: [0, -0.35, 0],
      });
    } else if (chapter.id === 'deployments') {
      // MONUMENT III: Twin Architectural Production Monoliths (Solvatax & De Horizon Travels)
      // Tower A: Solvatax Obsidian & Gold Skyscraper Monolith
      const towerAGeo = new THREE.BoxGeometry(0.56, 1.75, 0.56);
      const towerA = new THREE.Mesh(towerAGeo, materials.honedObsidian);
      towerA.position.set(-0.48, -0.18, -0.15);
      towerA.castShadow = castShadow;
      kineticCore.add(towerA);
      explodableParts.push({
        mesh: towerA,
        basePosition: towerA.position.clone(),
        explodeVector: new THREE.Vector3(-0.7, 0.35, -0.35),
        rotationSpeed: [0, 0.08, 0],
      });

      // Tower B: De Horizon Travels Crystal & Brass Pavilion Tower
      const towerBGeo = new THREE.BoxGeometry(0.52, 1.45, 0.52);
      const towerB = new THREE.Mesh(towerBGeo, materials.opticalCrystal);
      towerB.position.set(0.48, -0.33, 0.2);
      kineticCore.add(towerB);
      explodableParts.push({
        mesh: towerB,
        basePosition: towerB.position.clone(),
        explodeVector: new THREE.Vector3(0.7, 0.45, 0.35),
        rotationSpeed: [0, -0.08, 0],
      });

      // 3 Architectural Brass Structural Exoskeleton Frames
      for (let f = 0; f < 3; f++) {
        const frame = new THREE.Mesh(createBeveledHexGeometry(0.95 - f * 0.12, 0.05, 0.82 - f * 0.12), materials.primaryMetal);
        frame.rotation.x = Math.PI / 2;
        frame.position.set(0, -0.6 + f * 0.55, 0);
        kineticCore.add(frame);
        explodableParts.push({
          mesh: frame,
          basePosition: frame.position.clone(),
          explodeVector: new THREE.Vector3(0, (f - 1) * 0.65, 0.5),
          rotationSpeed: [0, 0.25 * (f % 2 === 0 ? 1 : -1), 0],
        });
      }

      // Orbital Aviation / Global Commerce Arc
      const orbitRing = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.032, 16, 64), materials.emissiveGold);
      orbitRing.rotation.set(Math.PI / 3, Math.PI / 6, 0);
      kineticCore.add(orbitRing);
      explodableParts.push({
        mesh: orbitRing,
        basePosition: new THREE.Vector3(0, 0.1, 0),
        explodeVector: new THREE.Vector3(0, 0.95, 0),
        rotationSpeed: [0.3, 0.5, 0.15],
      });
    } else if (chapter.id === 'ventures') {
      // MONUMENT IV: QIMTP Cryptographic Vault & Space R&D Telemetry Gyro
      // Spun Parabolic Dish (LatheGeometry)
      const dishPoints = [
        new THREE.Vector2(0.05, 0),
        new THREE.Vector2(0.35, 0.08),
        new THREE.Vector2(0.72, 0.26),
        new THREE.Vector2(0.95, 0.52),
      ];
      const dishGeo = new THREE.LatheGeometry(dishPoints, 32);
      const dishMesh = new THREE.Mesh(dishGeo, materials.primaryMetal);
      dishMesh.position.set(0, -0.75, 0);
      dishMesh.castShadow = castShadow;
      kineticCore.add(dishMesh);
      explodableParts.push({
        mesh: dishMesh,
        basePosition: dishMesh.position.clone(),
        explodeVector: new THREE.Vector3(0, -0.55, 0),
        rotationSpeed: [0, 0.35, 0],
      });

      // Quantum Shield Interlocking Octagonal Rings
      for (let r = 0; r < 3; r++) {
        const shieldRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.95 - r * 0.18, 0.04, 16, 48),
          r === 1 ? materials.honedObsidian : materials.secondaryMetal,
        );
        shieldRing.rotation.set((r * Math.PI) / 3, (r * Math.PI) / 4, 0);
        shieldRing.position.set(0, 0.15, 0);
        kineticCore.add(shieldRing);
        explodableParts.push({
          mesh: shieldRing,
          basePosition: shieldRing.position.clone(),
          explodeVector: new THREE.Vector3((r - 1) * 0.7, 0.4 + r * 0.25, (r % 2 === 0 ? 1 : -1) * 0.5),
          rotationSpeed: [0.45 * (r + 1) * 0.5, -0.35, 0.25],
        });
      }

      // Central Quantum Singularity Core
      const quantumCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38, 1), materials.opticalCrystal);
      quantumCore.position.set(0, 0.15, 0);
      kineticCore.add(quantumCore);
      explodableParts.push({
        mesh: quantumCore,
        basePosition: quantumCore.position.clone(),
        explodeVector: new THREE.Vector3(0, 1.15, 0),
        rotationSpeed: [-0.5, 0.7, 0.3],
      });
    } else {
      // MONUMENT V: The Six-Pillar Horological Synthesis Column (Arsenal & Credentials)
      // Central Fluted Column Core
      const columnCore = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 1.65, 12), materials.honedObsidian);
      columnCore.position.set(0, -0.25, 0);
      columnCore.castShadow = castShadow;
      kineticCore.add(columnCore);
      explodableParts.push({
        mesh: columnCore,
        basePosition: columnCore.position.clone(),
        explodeVector: new THREE.Vector3(0, -0.35, 0),
        rotationSpeed: [0, 0.15, 0],
      });

      // 6 Radial Articulated Mastery Pillars & Credential Plates
      for (let p = 0; p < 6; p++) {
        const angle = (p / 6) * Math.PI * 2;
        const rx = Math.cos(angle) * 0.82;
        const rz = Math.sin(angle) * 0.82;

        const pillarArm = new THREE.Mesh(
          new THREE.BoxGeometry(0.24, 0.92, 0.08),
          p % 2 === 0 ? materials.primaryMetal : materials.secondaryMetal,
        );
        pillarArm.position.set(rx, -0.1 + (p % 2) * 0.18, rz);
        pillarArm.rotation.y = -angle + Math.PI / 2;
        pillarArm.castShadow = castShadow;
        kineticCore.add(pillarArm);
        explodableParts.push({
          mesh: pillarArm,
          basePosition: pillarArm.position.clone(),
          explodeVector: new THREE.Vector3(rx * 1.15, 0.35 + (p % 3) * 0.2, rz * 1.15),
          rotationSpeed: [0, 0, 0],
        });
      }

      // Crown Gear Assembly & Apex Crystal
      const crownHex = new THREE.Mesh(createBeveledHexGeometry(0.76, 0.1, 0.45), materials.primaryMetal);
      crownHex.rotation.x = Math.PI / 2;
      crownHex.position.set(0, 0.65, 0);
      kineticCore.add(crownHex);
      explodableParts.push({
        mesh: crownHex,
        basePosition: crownHex.position.clone(),
        explodeVector: new THREE.Vector3(0, 0.95, 0),
        rotationSpeed: [0, -0.4, 0],
      });

      const apexCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.34, 0), materials.opticalCrystal);
      apexCrystal.position.set(0, 0.98, 0);
      kineticCore.add(apexCrystal);
      explodableParts.push({
        mesh: apexCrystal,
        basePosition: apexCrystal.position.clone(),
        explodeVector: new THREE.Vector3(0, 1.45, 0),
        rotationSpeed: [0.3, 0.85, 0],
      });
    }

    // Simplified invisible proxy collision box on Layer 1 for high-performance raycasting
    const hitProxyGeo = new THREE.CylinderGeometry(1.9, 1.9, 3.6, 12);
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
    constellationMesh,
    hitProxies,
  };
}
