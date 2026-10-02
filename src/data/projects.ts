export type Project = {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  repo?: string;
  url?: string;
  image?: { src: string; alt: string };
  featured?: 1 | 2 | 3;
  hidden?: boolean;
  updated?: string;
};

export const projects: Project[] = [
  {
    slug: 'gloam',
    name: 'Gloam',
    summary:
      'Self-hosted 3D virtual tabletop for D&D 5e, with shadow-casting light, per-creature line of sight and all 339 SRD spells automated.',
    tags: ['React Three Fiber', 'Colyseus', 'MCP server'],
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
    tags: ['AI agents', 'legacy databases', 'PII redaction'],
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
    tags: ['Marketplace', 'secure video'],
    url: 'https://voetutor.com',
    image: {
      src: 'voetutor',
      alt: 'The VOETutor home page: the headline “Premium private tutoring, tailored for you”, a tutor search box, subject filters and a Vault of Excellence banner.',
    },
    featured: 3,
  },
  {
    slug: 'saltancy-website',
    name: 'Saltancy Website',
    summary: 'Landing page for Saltancy, my consultancy for end-to-end technical consultancy and custom software development.',
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
      'Secure REST API for per-user notes with CRUD operations and advanced filtering, built on MongoDB and Mongoose following OWASP principles.',
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
      'Model-based Dyna-DDQN reinforcement learning agent that improves learning quality and sample efficiency on the LeadingOnes (1+1) RLS benchmark for Dynamic Algorithm Configuration.',
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
    summary: 'Uninformed, informed and bidirectional search algorithms for flight-route problems on an N×N polar grid.',
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
    summary: 'Two-week game jam demo built with Codethulu for the Warwick Game Dev Society, using Three.js and WebGL.',
    tags: ['Three.js', 'WebGL'],
    repo: 'BlueTentProductions/overthrow-synthetica',
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
