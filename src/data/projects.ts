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
      alt: 'The VOETutor home page: the headline “Premium private tutoring, tailored for you”, a tutor search box and subject filters.',
    },
    featured: 3,
  },
];

export const featured = projects
  .filter((p): p is Project & { featured: 1 | 2 | 3 } => p.featured !== undefined)
  .sort((a, b) => a.featured - b.featured);
