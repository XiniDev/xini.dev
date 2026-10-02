export type Project = {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  repo?: string;
  url?: string;
  image?: { src: string; alt: string };
  featured?: 1 | 2 | 3;
  credit?: string;
  hidden?: boolean;
  updated?: string;
};

export const projects: Project[] = [
  {
    slug: 'gloam',
    name: 'Gloam',
    summary:
      'Self-hosted 3D virtual tabletop for D&D 5e, with shadow-casting light, per-creature line of sight and all 339 spells from D&D’s open rules, automated.',
    tags: ['TypeScript', 'React Three Fiber', 'Colyseus', 'SQLite', 'MCP'],
    repo: 'XiniDev/Gloam',
    image: {
      src: 'gloam',
      alt: 'Gloam’s 3D tabletop: a stone dungeon map seen at an angle, with goblin and Crypt Warden tokens, health bars and a tool sidebar.',
    },
    featured: 1,
  },
  {
    slug: 'dbridger',
    name: 'DBridger',
    summary: 'Autonomous agent that queries legacy databases in plain English, with PII redaction built in.',
    tags: ['Python', 'PyQt6', 'Gemini', 'SQLite', 'MCP'],
    repo: 'XiniDev/dbridger',
    image: {
      src: 'dbridger',
      alt: 'DBridger’s desktop window: a schema explorer listing tables such as users, orders and shipments, next to an AI agent tab with a plain-English question.',
    },
    featured: 2,
  },
  {
    slug: 'voetutor',
    name: 'VOETutor',
    summary: 'Curated marketplace of vetted IB tutors, with on-demand video lessons and progress tracking.',
    tags: ['Next.js', 'Supabase'],
    url: 'https://voetutor.com',
    credit: 'Built through Saltancy',
    image: {
      src: 'voetutor',
      alt: 'The VOETutor home page: the headline “Find your IB educator. Open the vault.”, a search box and cards for vetted IB tutors with their subjects and hourly rates.',
    },
    featured: 3,
  },
  {
    slug: 'saltancy-website',
    name: 'Saltancy Website',
    summary: 'Landing page for Saltancy, my consultancy for end-to-end technical work and custom software development.',
    tags: [],
    repo: 'XiniDev/saltancy-web',
    url: 'https://www.saltancy.com',
    image: {
      src: 'saltancy-website',
      alt: 'Saltancy’s landing page: the headline “We engineer the structure your product is built to hold.” beside a wireframe cube on a dark background.',
    },
  },
  {
    slug: 'wsmath',
    name: 'WSMath',
    summary:
      'Portfolio for an international mathematics exam strategist, built with Next.js and Tailwind CSS, with a custom CMS behind a Zero Trust login.',
    tags: ['Next.js', 'Tailwind CSS', 'Zero Trust'],
    url: 'https://www.wsmath.com/',
    image: {
      src: 'wsmath',
      alt: 'The WSMath logo over a photo of a man in glasses working at a desk with a laptop and a monitor.',
    },
  },
  {
    slug: 'notes-api',
    name: 'Notes API',
    summary:
      'Secure REST API where each user creates, reads, updates and deletes their own notes, with filtering, built on Node.js, Express and MongoDB following OWASP guidance.',
    tags: ['MongoDB', 'Mongoose', 'OWASP'],
    repo: 'XiniDev/notes-api',
    image: {
      src: 'notes-api',
      alt: 'Illustration for Notes API: a window listing three notes beside the HTTP verbs GET, POST and DELETE.',
    },
  },
  {
    slug: 'leadingones-dac',
    name: 'LeadingOnes DAC',
    summary:
      'MSc dissertation: a model-based deep reinforcement learning agent that learns to tune an optimisation algorithm while it runs, improving learning quality and sample efficiency on a standard benchmark.',
    tags: ['Deep reinforcement learning', 'Dyna-DDQN'],
    repo: 'XiniDev/LeadingOnesDAC',
    image: {
      src: 'leadingones-dac',
      alt: 'Line chart of the best gap (mean ± standard deviation) against k, for n = 50 and n = 100.',
    },
  },
  {
    slug: 'ai-search-algorithms',
    name: 'AI Search Algorithms',
    summary: 'Classic AI search algorithms, from breadth-first and depth-first to A* and SMA*, planning flight routes on a polar grid, each with an optional bidirectional mode.',
    tags: ['Search algorithms'],
    repo: 'XiniDev/AI-Search-Algorithms',
    image: {
      src: 'ai-search-algorithms',
      alt: 'Diagram comparing the paths that BFS, DFS, UCS and A* search take across a grid of nodes.',
    },
  },
  {
    slug: 'nullvector',
    name: 'NullVector',
    summary:
      'Processing (Java) platformer where you fight enemies and a boss named Zorp with gravity-affected projectiles, with boss phases, bounce damage and a full GUI.',
    tags: ['Processing', 'Java'],
    repo: 'XiniDev/NullVector-Processing',
    image: {
      src: 'nullvector',
      alt: 'NullVector gameplay: a pixel-art character on stone platforms facing a spiked boss, with hearts for health and a boss health bar.',
    },
  },
  {
    slug: 'jungle-game',
    name: 'Jungle Game & JunGUI',
    summary: 'Java implementation of the Jungle board game with a Swing GUI, multiplayer support and legal-move highlighting.',
    tags: ['Java', 'Swing'],
    repo: 'XiniDev/Jungle-Board-Game-Java',
    image: {
      src: 'jungle-game',
      alt: 'The JunGUI window: a Jungle board with river squares, traps, dens, and red and blue animal pieces.',
    },
  },
  {
    slug: 'overthrow-synthetica',
    name: 'Overthrow Synthetica',
    summary: 'Two-week, two-person game jam demo for the Warwick Game Dev Society, made with my teammate Codethulu using Three.js and WebGL.',
    tags: ['Three.js', 'WebGL'],
    url: 'https://github.com/BlueTentProductions/overthrow-synthetica',
    updated: '2023-10',
    image: {
      src: 'overthrow-synthetica',
      alt: 'The Overthrow Synthetica title logo in white over pink Japanese characters.',
    },
  },
  {
    slug: 'ecs-platformer-demo',
    name: 'ECS Platformer Demo',
    summary: 'Platformer demo that tests an Entity-Component-System architecture, written in C++ with SDL2.',
    tags: ['C++', 'SDL2', 'ECS'],
    repo: 'XiniDev/ecs-platformer-demo',
    image: {
      src: 'ecs-platformer-demo',
      alt: 'Platformer demo: a dark figure with a rifle firing at a yellow figure on a blue block, with debug hitboxes drawn.',
    },
  },
];

export const featured = projects
  .filter((p): p is Project & { featured: 1 | 2 | 3 } => p.featured !== undefined)
  .sort((a, b) => a.featured - b.featured);
