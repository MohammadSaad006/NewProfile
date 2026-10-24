export type ChapterId = 'origin' | 'systems' | 'deployments' | 'ventures' | 'arsenal';

export type FinishPresetId = 'champagne-gold' | 'obsidian-titanium' | 'platinum-rose';

export type CameraViewMode = 'gallery' | 'macro' | 'aerial';

export type StatCategory = 'all' | 'systems' | 'engines' | 'hardware' | 'ai';

export interface ChapterSpec {
  id: ChapterId;
  index: string;
  caliber: string;
  navLabel: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  monumentName: string;
  monumentMaterialSpec: string;
  monumentPartCount: number;
  worldPosition: [number, number, number];
  cameraOffset: {
    gallery: [number, number, number];
    macro: [number, number, number];
    aerial: [number, number, number];
  };
  lookAtOffset: [number, number, number];
  keyMetrics: Array<{
    value: string;
    label: string;
    context: string;
  }>;
}

export interface ProjectStatItem {
  id: string;
  label: string;
  count: number;
  category: Exclude<StatCategory, 'all'>;
  unit: string;
  descriptor: string;
}

export interface ShowcaseWork {
  id: string;
  chapterId: ChapterId;
  index: string;
  category: string;
  status: string;
  title: string;
  subtitle: string;
  summary: string;
  architectureNotes: string[];
  metrics: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  actionLabel?: string;
  schematicType: 'flynax' | 'eco-ai' | 'solvatax' | 'dehorizon' | 'flyos' | 'qimtp' | 'horror' | 'edutech' | 'space';
}

export interface ExpertiseDomain {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  skills: string[];
  highlightMetric: string;
}

export interface CertificationRecord {
  id: string;
  index: string;
  title: string;
  issuer: string;
  year: string;
  credentialCode: string;
  domain: string;
  verifiedSkills: string[];
}

export interface FinishPreset {
  id: FinishPresetId;
  label: string;
  shortLabel: string;
  primaryMetalHex: number;
  secondaryMetalHex: number;
  obsidianHex: number;
  crystalTintHex: number;
  accentCss: string;
  swatchHex: string;
}

export interface CommissionInquiry {
  id: string;
  name: string;
  email: string;
  domain: string;
  budgetTier: string;
  message: string;
  createdAt: string;
}

export const FINISH_PRESETS: FinishPreset[] = [
  {
    id: 'champagne-gold',
    label: '24K Champagne Gold & Nero Obsidian',
    shortLabel: 'Champagne Gold',
    primaryMetalHex: 0xd4af37,
    secondaryMetalHex: 0x997a2c,
    obsidianHex: 0x0d0d12,
    crystalTintHex: 0xf5e6c4,
    accentCss: '#D4AF37',
    swatchHex: '#D4AF37',
  },
  {
    id: 'obsidian-titanium',
    label: 'Brushed Grade-5 Titanium & Smoked Quartz',
    shortLabel: 'Obsidian Titanium',
    primaryMetalHex: 0xb8c2cc,
    secondaryMetalHex: 0x64748b,
    obsidianHex: 0x090b10,
    crystalTintHex: 0xcbd5e1,
    accentCss: '#94A3B8',
    swatchHex: '#94A3B8',
  },
  {
    id: 'platinum-rose',
    label: 'Haute Horlogerie Rose Gold & Platinum',
    shortLabel: 'Rose Gold',
    primaryMetalHex: 0xe09f7d,
    secondaryMetalHex: 0xc87d55,
    obsidianHex: 0x120d10,
    crystalTintHex: 0xfcd5ce,
    accentCss: '#E09F7D',
    swatchHex: '#E09F7D',
  },
];

export const CHAPTERS: ChapterSpec[] = [
  {
    id: 'origin',
    index: '01',
    caliber: 'CAL. MS-01 · ASTROLABE',
    navLabel: 'Origin',
    kicker: '01. Creative Technologist & Systems Alchemist',
    title: 'Mohammad Saad',
    subtitle: 'Architecting custom languages, proprietary AI architectures, spatial games, and embedded hardware.',
    description:
      'I am Mohammad Saad (Mohammad Saad Mohammad Farooque) — a systems developer, game creator, and hardware engineer dedicated to turning ambitious technical concepts into tangible, awe-inspiring digital and physical artifacts.',
    monumentName: 'The Sovereign Astrolabe & 120-Shard Constellation',
    monumentMaterialSpec: 'Anisotropic Brushed 24K Gold · Honed Obsidian · Optical Sapphire Core',
    monumentPartCount: 11,
    worldPosition: [0, 0, 0],
    cameraOffset: {
      gallery: [-2.8, 3.1, 7.8],
      macro: [-0.8, 2.3, 4.2],
      aerial: [0, 8.5, 6.5],
    },
    lookAtOffset: [-1.1, 1.85, 0],
    keyMetrics: [
      {
        value: '1,214+',
        label: 'Verified Builds & Artifacts',
        context: 'Across 19 software, 3D & hardware ecosystems',
      },
      {
        value: '300+',
        label: 'GitHub Repositories',
        context: 'Open-source engines, compilers & tools',
      },
      {
        value: '11',
        label: 'Systems & App Languages',
        context: 'Rust, C++, C#, C, Python, JS, SQL, Java, Ruby',
      },
    ],
  },
  {
    id: 'systems',
    index: '02',
    caliber: 'CAL. MS-02 · COMPILER CORE',
    navLabel: 'Systems',
    kicker: '02. Proprietary Languages & Cognitive Engines',
    title: 'Flagship Systems Architecture',
    subtitle: 'Foundational computing paradigms engineered from first principles for deterministic efficiency.',
    description:
      'Rather than relying solely on off-the-shelf abstractions, Mohammad Saad designs custom full-stack programming languages and beyond-neural cognitive architectures built for extreme execution efficiency.',
    monumentName: 'FLYNAX & ECO AI Dual-Helix Quantum Lattice',
    monumentMaterialSpec: 'Beveled Hexagonal Brass Logic Rings · Lathe Titanium Manifolds · Crystal Polyhedron',
    monumentPartCount: 10,
    worldPosition: [14, 0, -4],
    cameraOffset: {
      gallery: [-2.6, 3.0, 7.6],
      macro: [-0.6, 2.2, 4.1],
      aerial: [0, 8.2, 6.2],
    },
    lookAtOffset: [-1.0, 1.85, 0],
    keyMetrics: [
      {
        value: 'FLYNAX',
        label: 'Custom Full-Stack Language',
        context: 'High-level abstractions to machine optimization',
      },
      {
        value: 'ECO AI',
        label: 'Proprietary AI Architecture',
        context: 'Post-neural cognitive processing engine',
      },
      {
        value: 'Zero-GC',
        label: 'Deterministic Execution',
        context: 'Engineered for low-latency runtime throughput',
      },
    ],
  },
  {
    id: 'deployments',
    index: '03',
    caliber: 'CAL. MS-03 · MONOLITH TOWERS',
    navLabel: 'Deployments',
    kicker: '03. Production Platforms & Native Releases',
    title: 'Live Commercial Deployments',
    subtitle: 'High-trust enterprise platforms in fintech, international travel, and native mobile ecosystems.',
    description:
      'From regulatory taxation advisory platforms to international Hajj, Umrah, and luxury holiday booking portals, every production deployment is engineered for conversion, precision, and enduring reliability.',
    monumentName: 'Twin Architectural Monoliths & Orbital Conduits',
    monumentMaterialSpec: 'Stepped Travertine Plinth · Smoked Architectural Glass · Brushed Bronze Frames',
    monumentPartCount: 9,
    worldPosition: [26, 0, 2],
    cameraOffset: {
      gallery: [-2.7, 3.2, 7.8],
      macro: [-0.7, 2.3, 4.3],
      aerial: [0, 8.6, 6.4],
    },
    lookAtOffset: [-1.05, 1.85, 0],
    keyMetrics: [
      {
        value: 'Solvatax',
        label: 'Fintech & Taxation Platform',
        context: 'Live production financial advisory portal',
      },
      {
        value: 'De Horizon',
        label: 'International Travel & Booking',
        context: 'Full-stack e-commerce & Umrah packages',
      },
      {
        value: '6+ Live',
        label: 'Production & Native Releases',
        context: 'Web platforms + downloadable Android builds',
      },
    ],
  },
  {
    id: 'ventures',
    index: '04',
    caliber: 'CAL. MS-04 · ORBITAL VAULT',
    navLabel: 'Ventures',
    kicker: '04. Frontier Research & Active Productions',
    title: 'Current R&D Ventures',
    subtitle: 'Operating systems from scratch, quantum-resistant mail protocols, AAA horror, and orbital mechanics.',
    description:
      'An active laboratory of five frontier initiatives spanning kernel-level OS engineering (FLYOS), post-quantum mail cryptography (QIMTP), next-gen AAA psychological horror, gamified ed-tech, and orbital space research.',
    monumentName: 'QIMTP Cryptographic Vault & Orbital Telemetry Gyro',
    monumentMaterialSpec: 'Spun Parabolic Dish · Quantum Shield Rings · Deep-Space Obsidian Core',
    monumentPartCount: 10,
    worldPosition: [38, 0, -3],
    cameraOffset: {
      gallery: [-2.7, 3.1, 7.7],
      macro: [-0.7, 2.2, 4.1],
      aerial: [0, 8.4, 6.2],
    },
    lookAtOffset: [-1.05, 1.85, 0],
    keyMetrics: [
      {
        value: 'FLYOS',
        label: 'Custom Operating System',
        context: 'Lightweight kernel optimized for FLYNAX',
      },
      {
        value: 'QIMTP',
        label: 'Quantum Mail Protocol',
        context: 'Post-quantum cryptographic transfer standard',
      },
      {
        value: 'AAA + Space',
        label: 'Simulation & Game Engines',
        context: 'Unreal/Unity horror, Edu-Tech & orbital R&D',
      },
    ],
  },
  {
    id: 'arsenal',
    index: '05',
    caliber: 'CAL. MS-05 · HEXAGONAL COLUMN',
    navLabel: 'Arsenal',
    kicker: '05. Multi-Disciplinary Engineering Mastery',
    title: 'Technical Arsenal & Credentials',
    subtitle: 'Six interconnected engineering pillars backed by 1,214+ completed projects and verified certifications.',
    description:
      'Bridging low-level systems programming (C, C++, Rust), six major 3D/2D game engines (Unreal, Unity, CryEngine, Godot), embedded robotics (ESP32, Arduino, Webots), and modern cloud-native full-stack architecture.',
    monumentName: 'The Six-Pillar Horological Synthesis Column',
    monumentMaterialSpec: 'Six Articulated Brass Arms · Precision Gear Crown · Engraved Credential Plates',
    monumentPartCount: 10,
    worldPosition: [50, 0, 1],
    cameraOffset: {
      gallery: [-2.7, 3.1, 7.9],
      macro: [-0.7, 2.3, 4.2],
      aerial: [0, 8.5, 6.4],
    },
    lookAtOffset: [-1.05, 1.85, 0],
    keyMetrics: [
      {
        value: '6 Engines',
        label: '3D & 2D Game Architecture',
        context: 'Unreal, Unity, CryEngine, Godot, COCO, Construct',
      },
      {
        value: '172+',
        label: 'Hardware & Robotics Sims',
        context: 'Arduino UNO, ESP32, Wokwi, Webots, Cisco',
      },
      {
        value: '6 Verified',
        label: 'Technical Certifications',
        context: 'Python, C#, Systems & Engineering Credentials',
      },
    ],
  },
];

export const PROJECT_STATISTICS: ProjectStatItem[] = [
  { id: 'github', label: 'GitHub Projects', count: 300, category: 'systems', unit: 'Repositories', descriptor: 'Open-source systems, compilers, full-stack web apps, and experimental libraries' },
  { id: 'unofficial', label: 'Unofficial R&D Builds', count: 250, category: 'systems', unit: 'Prototypes', descriptor: 'Rapid architectural prototypes, internal utilities, and creative coding experiments' },
  { id: 'blender', label: 'Blender 3D Assets', count: 90, category: 'engines', unit: '3D Models', descriptor: 'Hard-surface architectural models, procedural materials, and rigged game props' },
  { id: 'codeorg', label: 'Code.org Creations', count: 90, category: 'systems', unit: 'Apps & Labs', descriptor: 'Interactive algorithmic logic apps and educational game mechanics' },
  { id: 'colab', label: 'Google Colab Notebooks', count: 65, category: 'ai', unit: 'Notebooks', descriptor: 'Machine learning experiments, data pipelines, and cognitive architecture benchmarks' },
  { id: 'p5js', label: 'p5.js Generative Art', count: 51, category: 'engines', unit: 'Simulations', descriptor: 'Interactive generative shaders, particle physics, and mathematical visualizations' },
  { id: 'unreal', label: 'Unreal Engine Projects', count: 50, category: 'engines', unit: '3D Worlds', descriptor: 'Photorealistic environments, Lumen lighting studies, and AAA horror mechanics' },
  { id: 'wokwi', label: 'Wokwi IoT Simulations', count: 49, category: 'hardware', unit: 'Circuits', descriptor: 'ESP32 and microcontroller firmware simulations with real-time sensor telemetry' },
  { id: 'unity', label: 'Unity Engine Games', count: 45, category: 'engines', unit: 'Games', descriptor: 'C# gameplay systems, custom physics controllers, and multi-platform 3D/2D titles' },
  { id: 'cisco', label: 'Cisco Packet Tracer', count: 40, category: 'hardware', unit: 'Topologies', descriptor: 'Enterprise network routing, VLAN architectures, and secure packet switching labs' },
  { id: 'snake-expo', label: 'Snake Expo Builds', count: 40, category: 'systems', unit: 'Mobile Builds', descriptor: 'Cross-platform React Native & Expo interactive mobile prototypes' },
  { id: 'webots', label: 'Webots Robotics', count: 37, category: 'hardware', unit: 'Autonomous Bots', descriptor: 'Autonomous mobile robot kinematics, LIDAR mapping, and PID control loops' },
  { id: 'construct2', label: 'Construct 2 Games', count: 35, category: 'engines', unit: 'Arcade Titles', descriptor: 'Rapid 2D arcade mechanics, state machines, and combat loop prototypes' },
  { id: 'cryengine', label: 'CryEngine Environments', count: 25, category: 'engines', unit: 'Scenes', descriptor: 'High-fidelity foliage, volumetric fog terrains, and real-time shader showcases' },
  { id: 'godot', label: 'Godot Engine Titles', count: 15, category: 'engines', unit: 'Games', descriptor: 'Lightweight node-based 2D/3D indie games and custom GDScript/C# shaders' },
  { id: 'coco', label: 'COCO Engine Projects', count: 12, category: 'engines', unit: 'Interactive Apps', descriptor: 'Cross-platform interactive storytelling and gamified mechanics' },
  { id: 'tinkercad', label: 'Tinkercad 3D & Circuits', count: 9, category: 'hardware', unit: 'Schematics', descriptor: 'Digital logic gates, breadboard prototyping, and 3D enclosure CAD' },
  { id: 'production', label: 'Live Production Systems', count: 6, category: 'systems', unit: 'Enterprise Apps', descriptor: 'Commercial client platforms, custom language toolchains, and native Android apps' },
  { id: 'blender-ext', label: 'Blender Extensions', count: 5, category: 'engines', unit: 'Python Add-ons', descriptor: 'Custom Python automation pipelines and geometry node workflow tools for Blender' },
];

export const SHOWCASE_WORKS: ShowcaseWork[] = [
  {
    id: 'flynax',
    chapterId: 'systems',
    index: 'SYS-01',
    category: 'Custom Programming Language',
    status: 'Open Source · Active Toolchain',
    title: 'FLYNAX',
    subtitle: 'Premier Full-Stack Programming Language & Execution Runtime',
    summary:
      'Mohammad Saad’s flagship full-stack programming language engineered for deterministic efficiency. FLYNAX bridges expressive high-level logical abstractions with deeply optimized machine execution across backend, systems, and web targets.',
    architectureNotes: [
      'Unified lexical analyzer and AST optimizer designed to eliminate redundant memory allocations.',
      'Full-stack syntax ergonomics allowing seamless state and type sharing between server routines and client views.',
      'Native integration target for the upcoming FLYOS lightweight kernel ecosystem.',
    ],
    metrics: ['Full-Stack Unified AST', 'Zero-Boilerplate Concurrency', 'FLYOS Native Target'],
    techStack: ['Rust', 'C++', 'LLVM / Custom Bytecode', 'Lexical Parser', 'Full-Stack Runtime'],
    githubUrl: 'https://github.com/MohammadSaad006/Flynax',
    actionLabel: 'Inspect FLYNAX on GitHub',
    schematicType: 'flynax',
  },
  {
    id: 'eco-ai',
    chapterId: 'systems',
    index: 'SYS-02',
    category: 'Proprietary Cognitive Architecture',
    status: 'Confidential R&D · Paradigm Shift',
    title: 'ECO AI',
    subtitle: 'Beyond-Neural Cognitive Efficiency Architecture',
    summary:
      'ECO AI represents a fundamental departure from conventional parameter-heavy neural networks. Built on a proprietary non-neural cognitive graph architecture, it achieves dramatic reductions in compute overhead while preserving deterministic reasoning.',
    architectureNotes: [
      'Departs from brute-force matrix multiplication in favor of structured cognitive graph synthesis.',
      'Engineered for edge and low-power hardware deployment with minimal thermal and memory footprint.',
      'Deterministic reasoning pathways that avoid stochastic hallucination loops.',
    ],
    metrics: ['Post-Neural Topology', 'Ultra-Low Compute Footprint', 'Deterministic Inference'],
    techStack: ['Python', 'C++', 'Cognitive Graph Engine', 'Data Analysis', 'Google Colab'],
    actionLabel: 'View Architecture Dossier',
    schematicType: 'eco-ai',
  },
  {
    id: 'solvatax',
    chapterId: 'deployments',
    index: 'DEP-01',
    category: 'Fintech & Taxation Platform',
    status: 'Live Commercial Production',
    title: 'Solvatax',
    subtitle: 'Enterprise Tax Advisory & Financial Compliance Platform',
    summary:
      'A comprehensive production platform engineered for professional tax, audit, and accounting advisory services. Built with institutional precision, clear client onboarding workflows, and high-conversion service architecture.',
    architectureNotes: [
      'Structured financial service taxonomy covering corporate taxation, compliance filings, and advisory consultation.',
      'Optimized core web vitals, responsive editorial typography, and frictionless client inquiry routing.',
      'Hardened production deployment with high availability and SSL security.',
    ],
    metrics: ['Live Production Portal', 'Fintech & Tax Compliance', 'High-Conversion UX'],
    techStack: ['React', 'JavaScript', 'HTML5 / CSS3', 'Node.js', 'Vercel Production'],
    liveUrl: 'https://solvatax.com/',
    actionLabel: 'Visit Solvatax.com',
    schematicType: 'solvatax',
  },
  {
    id: 'dehorizon',
    chapterId: 'deployments',
    index: 'DEP-02',
    category: 'Luxury Travel & Booking Platform',
    status: 'Live Commercial Production',
    title: 'De Horizon Travels',
    subtitle: 'Bespoke Hajj, Umrah & International Holiday Booking Portal',
    summary:
      'A luxury travel agency and e-commerce platform specializing in curated Hajj, Umrah, and international holiday packages. Designed for high-end visual storytelling, package comparison, and seamless booking inquiries.',
    architectureNotes: [
      'Dynamic itinerary and package showcase tailored for international pilgrimage and luxury leisure travelers.',
      'Mobile-first booking flow with instant consultation triggers and transparent tier breakdowns.',
      'Engineered for fast global CDN delivery and cross-device accessibility.',
    ],
    metrics: ['Live E-Commerce & Booking', 'Global Itinerary Engine', 'Luxury Hospitality UI'],
    techStack: ['Full-Stack Web', 'JavaScript', 'Responsive UI', 'Booking Workflows', 'Cloud Hosting'],
    liveUrl: 'https://dehorizonholidays.com/',
    actionLabel: 'Visit DeHorizonHolidays.com',
    schematicType: 'dehorizon',
  },
  {
    id: 'native-apps',
    chapterId: 'deployments',
    index: 'DEP-03',
    category: 'Native Application Suite',
    status: 'Direct Release Builds',
    title: 'Feedback & Documents Suite',
    subtitle: 'Production Document Management & Client Feedback Applications',
    summary:
      'Two standalone application releases engineered by Mohammad Saad for streamlined digital document archival and real-time user feedback collection, available as direct verified builds.',
    architectureNotes: [
      'Feedback App: Structured sentiment capture, rating telemetry, and instant synchronization.',
      'Documents App: Secure local and cloud document organization with rapid search indexing.',
      'Packaged and distributed for immediate standalone deployment.',
    ],
    metrics: ['2 Standalone App Releases', 'Firebase & Native Sync', 'Zero-Latency Local UI'],
    techStack: ['Flutter', 'React Native', 'Android Studio', 'Firebase', 'REST APIs'],
    liveUrl: 'https://drive.google.com/uc?export=download&id=1BL_mSo_M-deQss6NiF_U_nEMZssSS4NW',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1Pxg0VM-WhUCCqgxo1paVfyRXZnHFgMPA',
    actionLabel: 'Download Feedback App Build',
    schematicType: 'solvatax',
  },
  {
    id: 'flyos',
    chapterId: 'ventures',
    index: 'VEN-01',
    category: 'System Core · Operating System',
    status: 'In Active Development',
    title: 'FLYOS',
    subtitle: 'Custom Lightweight Operating System Optimized for FLYNAX',
    summary:
      'Creating a custom, lightweight operating system from scratch, engineered specifically to host the FLYNAX runtime ecosystem and deliver deterministic high-performance computing with minimal kernel overhead.',
    architectureNotes: [
      'Microkernel-inspired memory management and deterministic task scheduler written in C, C++, and Rust.',
      'First-class system call interface tailored for FLYNAX bytecode and native binaries.',
      'Minimal boot footprint targeting both bare-metal x86_64/ARM and virtualized developer sandboxes.',
    ],
    metrics: ['Custom Kernel Architecture', 'FLYNAX Native Syscalls', 'Sub-Second Boot Target'],
    techStack: ['C', 'C++', 'Rust', 'x86_64 / ARM Assembly', 'FLYNAX Runtime'],
    schematicType: 'flyos',
  },
  {
    id: 'qimtp',
    chapterId: 'ventures',
    index: 'VEN-02',
    category: 'Quantum Security Protocol',
    status: 'Cryptographic Specification',
    title: 'QIMTP',
    subtitle: 'Quantum-Inspired Mail Transfer Protocol',
    summary:
      'A next-generation mail transfer security standard designed to safeguard digital communication against future quantum decryption threats through lattice-based key encapsulation and zero-trust envelope verification.',
    architectureNotes: [
      'Replaces legacy SMTP plaintext handshake vulnerabilities with quantum-inspired cryptographic transport.',
      'End-to-end envelope attestation ensuring metadata and payload integrity across untrusted relays.',
      'Designed for backward-compatible gateway bridging with enterprise mail infrastructure.',
    ],
    metrics: ['Post-Quantum Envelope Security', 'Zero-Trust Relay Handshake', 'Protocol Specification'],
    techStack: ['Rust', 'Python', 'Cryptography', 'Network Protocols', 'Cisco Topologies'],
    schematicType: 'qimtp',
  },
  {
    id: 'aaa-horror',
    chapterId: 'ventures',
    index: 'VEN-03',
    category: 'Next-Gen Interactive Entertainment',
    status: 'Production Phase',
    title: 'AAA Psychological Horror',
    subtitle: 'Next-Gen Photorealistic Horror Experience with Adaptive AI',
    summary:
      'A high-fidelity psychological horror title built on next-generation 3D engines, combining photorealistic volumetric environments, diegetic spatial audio, and an adaptive stalker AI that learns player habits.',
    architectureNotes: [
      'Dynamic tension director that modulates lighting, acoustic reverberation, and encounter pacing in real time.',
      'Custom Blender hard-surface and organic environment assets paired with PBR procedural weathering.',
      'Behavior-tree and utility-AI hybrid adversary system.',
    ],
    metrics: ['Unreal & Unity Pipeline', 'Adaptive Psychological AI', '90+ Custom Blender Assets'],
    techStack: ['Unreal Engine', 'Unity Engine', 'C++', 'C#', 'Blender 3D'],
    schematicType: 'horror',
  },
  {
    id: 'edutech-space',
    chapterId: 'ventures',
    index: 'VEN-04',
    category: 'EdTech & Orbital Mechanics R&D',
    status: 'Exploration & Development',
    title: 'Edu-Tech Game & Space Research',
    subtitle: 'Gamified Learning Narratives & Orbital Mechanics Simulation',
    summary:
      'Dual frontier initiatives: an immersive educational game transforming complex STEM curricula into interactive narratives, alongside ongoing investigative research into orbital mechanics and space-tech telemetry.',
    architectureNotes: [
      'Interactive physics and orbital trajectory simulations modeling Keplerian orbits and delta-v maneuvers.',
      'Gamified mastery progression that rewards conceptual problem-solving rather than rote memorization.',
      'Integrates Webots robotics and embedded sensor concepts into virtual space-tech labs.',
    ],
    metrics: ['Orbital Trajectory Sim', 'Interactive STEM Narrative', 'Robotics Telemetry'],
    techStack: ['Godot Engine', 'Python', 'Webots', 'p5.js Physics', 'ESP32 Telemetry'],
    schematicType: 'space',
  },
];

export const EXPERTISE_DOMAINS: ExpertiseDomain[] = [
  {
    id: 'languages',
    index: '01',
    title: 'Programming Languages',
    subtitle: 'Low-level systems memory control to high-level declarative application logic',
    skills: ['C', 'C++', 'C#', 'Rust', 'Python', 'JavaScript', 'Java', 'SQL', 'Ruby', 'HTML5', 'CSS3', 'FLYNAX'],
    highlightMetric: '11+ Core Languages + Creator of FLYNAX',
  },
  {
    id: 'game-engines',
    index: '02',
    title: 'Game Engines & 3D Art',
    subtitle: 'Real-time 3D rendering, physics simulation, shaders, and hard-surface modeling',
    skills: ['Unreal Engine', 'Unity Engine', 'CryEngine', 'Godot Engine', 'Blender 3D', 'COCO Engine', 'Construct 2', 'A-Frame', 'p5.js', '2D/3D Physics'],
    highlightMetric: '272+ Game Engine & Blender 3D Projects',
  },
  {
    id: 'hardware-iot',
    index: '03',
    title: 'Hardware, Robotics & IoT',
    subtitle: 'Microcontroller firmware, autonomous robot kinematics, and network architecture',
    skills: ['Arduino UNO', 'ESP32', 'Webots Robotics', 'Wokwi Simulator', 'Cisco Packet Tracer', 'Tinkercad Circuits'],
    highlightMetric: '175+ Embedded, Robotics & Network Simulations',
  },
  {
    id: 'frontend-mobile',
    index: '04',
    title: 'Frontend, Spatial Web & Mobile',
    subtitle: 'Cross-platform mobile apps, WebGL viewports, and responsive design systems',
    skills: ['React JS', 'React Native', 'Flutter', 'Android Studio', 'Three.js / WebGL', 'Bootstrap', 'Tailwind CSS'],
    highlightMetric: '40+ Expo Mobile Builds & Commercial Web Portals',
  },
  {
    id: 'backend-cloud',
    index: '05',
    title: 'Backend & Cloud Infrastructure',
    subtitle: 'Scalable APIs, real-time databases, package ecosystems, and edge deployment',
    skills: ['Node.js', 'Firebase', 'npm Ecosystem', 'Postman API Testing', 'Vercel Edge', 'Git / GitHub'],
    highlightMetric: '300+ GitHub Repositories & 6 Live Production Systems',
  },
  {
    id: 'ai-data',
    index: '06',
    title: 'AI & Cognitive Data Science',
    subtitle: 'Proprietary cognitive architectures, analytical notebooks, and algorithmic modeling',
    skills: ['ECO AI Architecture', 'Python Data Science', 'Google Colab', 'Statistical Analysis', 'Algorithmic Modeling'],
    highlightMetric: '65+ Colab Research Notebooks & ECO AI Core',
  },
];

export const CERTIFICATIONS: CertificationRecord[] = [
  {
    id: 'cert-python',
    index: 'CERT-01',
    title: 'Python Basic Certification',
    issuer: 'HackerRank / Verified Technical Assessment',
    year: '2025',
    credentialCode: 'HR-PY-2025-MS01',
    domain: 'Core Programming & Data Structures',
    verifiedSkills: ['Object-Oriented Python', 'Algorithmic Complexity', 'Data Structures', 'Modular Scripting'],
  },
  {
    id: 'cert-csharp',
    index: 'CERT-02',
    title: 'C# Basic Certification',
    issuer: 'HackerRank / Verified Technical Assessment',
    year: '2025',
    credentialCode: 'HR-CS-2025-MS02',
    domain: 'Game Systems & .NET Architecture',
    verifiedSkills: ['C# Type System', 'Memory & Collections', 'OOP & Interfaces', 'Unity Engine Scripting'],
  },
  {
    id: 'cert-fullstack',
    index: 'CERT-03',
    title: 'Full-Stack Web & Systems Engineering',
    issuer: 'Royal Tech Portfolio Verified Credential',
    year: '2025',
    credentialCode: 'MS-FS-2025-0709A',
    domain: 'Production Web & Cloud Architecture',
    verifiedSkills: ['React & Node.js', 'Production Deployment', 'API Security', 'Database Modeling'],
  },
  {
    id: 'cert-gamedev',
    index: 'CERT-04',
    title: '3D Game Engine & Simulation Mastery',
    issuer: 'Multi-Engine Production Portfolio',
    year: '2025',
    credentialCode: 'MS-GE-2025-0709B',
    domain: 'Unreal, Unity, Godot & Blender Pipeline',
    verifiedSkills: ['PBR Shader Pipelines', 'Real-Time Physics', '3D Asset Topology', 'AI Behavior Trees'],
  },
  {
    id: 'cert-iot',
    index: 'CERT-05',
    title: 'Embedded Systems, IoT & Robotics',
    issuer: 'Hardware & Network Simulation Lab',
    year: '2025',
    credentialCode: 'MS-HW-2025-0709C',
    domain: 'ESP32, Arduino, Webots & Cisco',
    verifiedSkills: ['Microcontroller C/C++', 'Autonomous Robot Kinematics', 'Sensor Telemetry', 'Cisco Routing'],
  },
  {
    id: 'cert-alchemy',
    index: 'CERT-06',
    title: 'Language Design & Cognitive Architecture',
    issuer: 'FLYNAX & ECO AI Foundational Research',
    year: '2025',
    credentialCode: 'MS-RD-2025-0709D',
    domain: 'Compilers, OS Kernel & Post-Quantum Protocols',
    verifiedSkills: ['Lexical & AST Design', 'OS Kernel Primitives', 'QIMTP Security', 'Cognitive Graphs'],
  },
];

/**
 * Pure function: calculates total creations across a list of project statistic items.
 */
export function calculateTotalCreations(stats: ProjectStatItem[] = PROJECT_STATISTICS): number {
  return stats.reduce((sum, item) => sum + item.count, 0);
}

/**
 * Pure function: filters project statistics by category and search query.
 */
export function filterStatisticsByCategory(
  category: StatCategory,
  searchQuery: string = '',
  stats: ProjectStatItem[] = PROJECT_STATISTICS,
): ProjectStatItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return stats.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.label.toLowerCase().includes(normalizedQuery) ||
      item.descriptor.toLowerCase().includes(normalizedQuery) ||
      item.unit.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Pure function: computes the world-space camera position and lookAt target for a given chapter,
 * view mode, and exploded factor.
 */
export function getChapterCameraTransform(
  chapterId: ChapterId,
  viewMode: CameraViewMode = 'gallery',
  explodeFactor: number = 0,
): {
  cameraPosition: [number, number, number];
  lookAtTarget: [number, number, number];
} {
  const chapter = CHAPTERS.find((c) => c.id === chapterId) ?? CHAPTERS[0];
  const clampedExplode = Math.max(0, Math.min(1, explodeFactor));
  const [wx, wy, wz] = chapter.worldPosition;
  const [ox, oy, oz] = chapter.cameraOffset[viewMode];
  const [lx, ly, lz] = chapter.lookAtOffset;

  // Pull camera slightly back when exploded view is active so all separated parts stay framed
  const explodePullback = clampedExplode * 1.15;

  return {
    cameraPosition: [
      Number((wx + ox).toFixed(4)),
      Number((wy + oy + clampedExplode * 0.35).toFixed(4)),
      Number((wz + oz + explodePullback).toFixed(4)),
    ],
    lookAtTarget: [
      Number((wx + lx).toFixed(4)),
      Number((wy + ly + clampedExplode * 0.15).toFixed(4)),
      Number((wz + lz).toFixed(4)),
    ],
  };
}

/**
 * Pure function: steps chapter index with wrap-around.
 */
export function stepChapterIndex(currentIndex: number, delta: number, total: number = CHAPTERS.length): number {
  if (total <= 0) return 0;
  return ((currentIndex + delta) % total + total) % total;
}

/**
 * Pure function: validates a commission / contact inquiry form submission.
 */
export function validateCommissionInquiry(input: {
  name: string;
  email: string;
  domain: string;
  message: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }
  if (!input.domain.trim()) {
    errors.domain = 'Please select a discipline or inquiry category.';
  }
  if (trimmedMessage.length < 10) {
    errors.message = 'Please include a brief project or collaboration note (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
