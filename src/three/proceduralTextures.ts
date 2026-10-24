import * as THREE from 'three';

export interface ProceduralTextureSet {
  dialAlbedo: THREE.CanvasTexture;
  marbleAlbedo: THREE.CanvasTexture;
  brushedBump: THREE.CanvasTexture;
  contactShadow: THREE.CanvasTexture;
  dispose: () => void;
}

export function createProceduralTextureSet(maxAnisotropy: number): ProceduralTextureSet {
  // 1. Precision Horological Astrolabe / Chapter Dial Albedo Texture (SRGBColorSpace)
  const dialCanvas = document.createElement('canvas');
  dialCanvas.width = 1024;
  dialCanvas.height = 1024;
  const dCtx = dialCanvas.getContext('2d')!;
  dCtx.fillStyle = '#09090E';
  dCtx.fillRect(0, 0, 1024, 1024);

  const cx = 512;
  const cy = 512;

  // Subtle concentric rings
  const radii = [480, 460, 410, 360, 290, 210, 130];
  radii.forEach((r, idx) => {
    dCtx.beginPath();
    dCtx.arc(cx, cy, r, 0, Math.PI * 2);
    dCtx.strokeStyle = idx % 2 === 0 ? 'rgba(212, 175, 55, 0.55)' : 'rgba(212, 175, 55, 0.22)';
    dCtx.lineWidth = idx === 0 ? 3 : 1.5;
    dCtx.stroke();
  });

  // 72 degree tick marks & Roman/horological numerals
  for (let i = 0; i < 72; i++) {
    const angle = (i / 72) * Math.PI * 2;
    const isMajor = i % 6 === 0;
    const rOuter = 456;
    const rInner = isMajor ? 426 : 442;
    dCtx.beginPath();
    dCtx.moveTo(cx + Math.cos(angle) * rInner, cy + Math.sin(angle) * rInner);
    dCtx.lineTo(cx + Math.cos(angle) * rOuter, cy + Math.sin(angle) * rOuter);
    dCtx.strokeStyle = isMajor ? 'rgba(212, 175, 55, 0.85)' : 'rgba(212, 175, 55, 0.35)';
    dCtx.lineWidth = isMajor ? 2.5 : 1;
    dCtx.stroke();
  }

  // Fine inner Vernier scale
  for (let i = 0; i < 120; i++) {
    const angle = (i / 120) * Math.PI * 2;
    const rOuter = 356;
    const rInner = i % 10 === 0 ? 336 : 346;
    dCtx.beginPath();
    dCtx.moveTo(cx + Math.cos(angle) * rInner, cy + Math.sin(angle) * rInner);
    dCtx.lineTo(cx + Math.cos(angle) * rOuter, cy + Math.sin(angle) * rOuter);
    dCtx.strokeStyle = 'rgba(244, 241, 234, 0.35)';
    dCtx.lineWidth = 1;
    dCtx.stroke();
  }

  const dialAlbedo = new THREE.CanvasTexture(dialCanvas);
  dialAlbedo.colorSpace = THREE.SRGBColorSpace;
  dialAlbedo.anisotropy = maxAnisotropy;
  dialAlbedo.needsUpdate = true;

  // 2. Honed Nero Marquina Marble Floor Albedo Texture (SRGBColorSpace)
  const marbleCanvas = document.createElement('canvas');
  marbleCanvas.width = 512;
  marbleCanvas.height = 512;
  const mCtx = marbleCanvas.getContext('2d')!;
  mCtx.fillStyle = '#08080C';
  mCtx.fillRect(0, 0, 512, 512);

  // Subtle architectural grid lines & organic mineral veins
  mCtx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
  mCtx.lineWidth = 1;
  mCtx.strokeRect(2, 2, 508, 508);

  for (let v = 0; v < 14; v++) {
    mCtx.beginPath();
    let x = ((v * 73) % 512);
    let y = 0;
    mCtx.moveTo(x, y);
    for (let step = 0; step < 8; step++) {
      x += Math.sin(step * 1.7 + v) * 28;
      y += 64;
      mCtx.lineTo(x, y);
    }
    mCtx.strokeStyle = v % 3 === 0 ? 'rgba(212, 175, 55, 0.06)' : 'rgba(255, 255, 255, 0.03)';
    mCtx.lineWidth = v % 3 === 0 ? 1.5 : 0.8;
    mCtx.stroke();
  }

  const marbleAlbedo = new THREE.CanvasTexture(marbleCanvas);
  marbleAlbedo.colorSpace = THREE.SRGBColorSpace;
  marbleAlbedo.wrapS = THREE.RepeatWrapping;
  marbleAlbedo.wrapT = THREE.RepeatWrapping;
  marbleAlbedo.repeat.set(18, 18);
  marbleAlbedo.anisotropy = maxAnisotropy;
  marbleAlbedo.needsUpdate = true;

  // 3. Anisotropic Brushed Metal & Stone Micro-Grain Bump Map (Linear NoColorSpace)
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 256;
  bumpCanvas.height = 256;
  const bCtx = bumpCanvas.getContext('2d')!;
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, 256, 256);

  for (let y = 0; y < 256; y += 2) {
    const shade = 115 + ((y * 17) % 26);
    bCtx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
    bCtx.fillRect(0, y, 256, 1);
  }

  const brushedBump = new THREE.CanvasTexture(bumpCanvas);
  brushedBump.colorSpace = THREE.NoColorSpace;
  brushedBump.wrapS = THREE.RepeatWrapping;
  brushedBump.wrapT = THREE.RepeatWrapping;
  brushedBump.repeat.set(4, 4);
  brushedBump.anisotropy = maxAnisotropy;
  brushedBump.needsUpdate = true;

  // 4. Soft Radial Contact Shadow Disc Texture
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(128, 128, 12, 128, 128, 124);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.88)');
  grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.42)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 256, 256);

  const contactShadow = new THREE.CanvasTexture(shadowCanvas);
  contactShadow.colorSpace = THREE.SRGBColorSpace;
  contactShadow.needsUpdate = true;

  return {
    dialAlbedo,
    marbleAlbedo,
    brushedBump,
    contactShadow,
    dispose: () => {
      dialAlbedo.dispose();
      marbleAlbedo.dispose();
      brushedBump.dispose();
      contactShadow.dispose();
    },
  };
}
