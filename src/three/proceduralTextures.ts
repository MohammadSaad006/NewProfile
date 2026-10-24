import * as THREE from 'three';

export interface ProceduralTextureSet {
  dialAlbedo: THREE.CanvasTexture;
  starSprite: THREE.CanvasTexture;
  nebulaRingAlbedo: THREE.CanvasTexture;
  brushedBump: THREE.CanvasTexture;
  contactShadow: THREE.CanvasTexture;
  dispose: () => void;
}

export function createProceduralTextureSet(maxAnisotropy: number): ProceduralTextureSet {
  // 1. Celestial Astrolabe / Observatory Dial Albedo Texture (SRGBColorSpace)
  const dialCanvas = document.createElement('canvas');
  dialCanvas.width = 1024;
  dialCanvas.height = 1024;
  const dCtx = dialCanvas.getContext('2d')!;
  dCtx.fillStyle = '#050711';
  dCtx.fillRect(0, 0, 1024, 1024);

  const cx = 512;
  const cy = 512;

  // Radial cosmic glow on the dial
  const dialGlow = dCtx.createRadialGradient(cx, cy, 40, cx, cy, 490);
  dialGlow.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
  dialGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.12)');
  dialGlow.addColorStop(1, 'rgba(5, 7, 17, 0.0)');
  dCtx.fillStyle = dialGlow;
  dCtx.fillRect(0, 0, 1024, 1024);

  // Concentric celestial rings
  const radii = [480, 458, 412, 360, 290, 210, 130];
  radii.forEach((r, idx) => {
    dCtx.beginPath();
    dCtx.arc(cx, cy, r, 0, Math.PI * 2);
    dCtx.strokeStyle =
      idx % 3 === 0
        ? 'rgba(56, 189, 248, 0.65)'
        : idx % 3 === 1
          ? 'rgba(245, 158, 11, 0.55)'
          : 'rgba(168, 85, 247, 0.4)';
    dCtx.lineWidth = idx === 0 ? 3 : 1.5;
    dCtx.stroke();
  });

  // 72 degree tick marks
  for (let i = 0; i < 72; i++) {
    const angle = (i / 72) * Math.PI * 2;
    const isMajor = i % 6 === 0;
    const rOuter = 454;
    const rInner = isMajor ? 422 : 440;
    dCtx.beginPath();
    dCtx.moveTo(cx + Math.cos(angle) * rInner, cy + Math.sin(angle) * rInner);
    dCtx.lineTo(cx + Math.cos(angle) * rOuter, cy + Math.sin(angle) * rOuter);
    dCtx.strokeStyle = isMajor ? 'rgba(245, 158, 11, 0.9)' : 'rgba(56, 189, 248, 0.45)';
    dCtx.lineWidth = isMajor ? 2.5 : 1.2;
    dCtx.stroke();
  }

  // Star-map crosshairs
  dCtx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
  dCtx.lineWidth = 1;
  dCtx.beginPath();
  dCtx.moveTo(cx - 460, cy);
  dCtx.lineTo(cx + 460, cy);
  dCtx.moveTo(cx, cy - 460);
  dCtx.lineTo(cx, cy + 460);
  dCtx.stroke();

  const dialAlbedo = new THREE.CanvasTexture(dialCanvas);
  dialAlbedo.colorSpace = THREE.SRGBColorSpace;
  dialAlbedo.anisotropy = maxAnisotropy;
  dialAlbedo.needsUpdate = true;

  // 2. Soft Radial Star / Nebula Particle Sprite Texture (SRGBColorSpace)
  const starCanvas = document.createElement('canvas');
  starCanvas.width = 64;
  starCanvas.height = 64;
  const sCtx = starCanvas.getContext('2d')!;
  const starGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  starGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  starGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
  starGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.25)');
  starGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  sCtx.fillStyle = starGrad;
  sCtx.fillRect(0, 0, 64, 64);

  const starSprite = new THREE.CanvasTexture(starCanvas);
  starSprite.colorSpace = THREE.SRGBColorSpace;
  starSprite.needsUpdate = true;

  // 3. Colorful Spiral Nebula Horizon Disc Texture (SRGBColorSpace)
  const nebCanvas = document.createElement('canvas');
  nebCanvas.width = 512;
  nebCanvas.height = 512;
  const nCtx = nebCanvas.getContext('2d')!;
  const nebGrad = nCtx.createRadialGradient(256, 256, 10, 256, 256, 250);
  nebGrad.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
  nebGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.22)');
  nebGrad.addColorStop(0.68, 'rgba(244, 63, 94, 0.10)');
  nebGrad.addColorStop(1, 'rgba(3, 3, 8, 0.0)');
  nCtx.fillStyle = nebGrad;
  nCtx.fillRect(0, 0, 512, 512);

  const nebulaRingAlbedo = new THREE.CanvasTexture(nebCanvas);
  nebulaRingAlbedo.colorSpace = THREE.SRGBColorSpace;
  nebulaRingAlbedo.needsUpdate = true;

  // 4. Anisotropic Brushed Metal Bump Map (Linear NoColorSpace)
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 256;
  bumpCanvas.height = 256;
  const bCtx = bumpCanvas.getContext('2d')!;
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, 256, 256);

  for (let y = 0; y < 256; y += 2) {
    const shade = 116 + ((y * 17) % 24);
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

  // 5. Soft Radial Contact Shadow Disc Texture
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const shCtx = shadowCanvas.getContext('2d')!;
  const grad = shCtx.createRadialGradient(128, 128, 12, 128, 128, 124);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.38)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
  shCtx.fillStyle = grad;
  shCtx.fillRect(0, 0, 256, 256);

  const contactShadow = new THREE.CanvasTexture(shadowCanvas);
  contactShadow.colorSpace = THREE.SRGBColorSpace;
  contactShadow.needsUpdate = true;

  return {
    dialAlbedo,
    starSprite,
    nebulaRingAlbedo,
    brushedBump,
    contactShadow,
    dispose: () => {
      dialAlbedo.dispose();
      starSprite.dispose();
      nebulaRingAlbedo.dispose();
      brushedBump.dispose();
      contactShadow.dispose();
    },
  };
}
