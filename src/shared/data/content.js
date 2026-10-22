// Site copy and project data, first ported from the Lattice-era site (src/data/site.ts, projects.ts, github-snapshot.json).
// Copy stays calm and factual; the visuals carry the attitude.
import snapshot from './github-snapshot.json';
import imgVoetutor from './img/voetutor.webp';
import imgGloam from './img/gloam.webp';
import imgSaltancy from './img/saltancy-website.webp';
import imgDbridger from './img/dbridger.webp';

export const site = {
  name: 'Xini',
  role: 'Software Engineer · AI Integration',
  statement: 'Ambitious ideas, ambitious software.',
  spec: 'Developer · Designer · Creator',
  email: 'xini@saltancy.com',
  github: 'https://github.com/XiniDev',
  linkedin: 'https://www.linkedin.com/in/xinidev',
  saltancy: 'https://saltancy.com',
  contactLine: 'I take on client projects through my consultancy, Saltancy.',
};

export const beats = [
  {
    id: 'systems', label: 'Systems', jp: 'システム',
    heading: 'Whole systems, built solo.',
    body: 'I take ambitious ideas all the way to production on my own: real-time 3D, multiplayer backends, data, infrastructure and the interface people actually use.',
    support: ['Full stack', 'Real-time 3D', 'Multiplayer'],
  },
  {
    id: 'ai', label: 'AI', jp: '人工知能',
    heading: 'AI that does real work.',
    body: 'I build AI into products where it earns its place: agents that act on real systems, MCP servers that give models real tools, and local models when the data should stay put.',
    support: ['Agents', 'MCP servers', 'Local models'],
  },
  {
    id: 'security', label: 'Security', jp: '防御',
    heading: 'Secure by default.',
    body: 'I self-host what I build and design for Zero Trust, with OWASP practice and PII redaction there from the first commit.',
    support: ['Self-hosting', 'OWASP', 'Zero Trust'],
  },
];

// Featured slots. Order, count and art are data: swapping a project is an edit here, never a re-model.
export const featured = [
  {
    slug: 'voetutor', name: 'VOETutor', kicker: 'Client work',
    summary: 'Curated marketplace of vetted IB tutors, with on-demand video lessons and progress tracking.',
    tags: ['Next.js', 'Supabase'], url: 'https://voetutor.com', linkLabel: 'voetutor.com',
    credit: 'Built through Saltancy', image: imgVoetutor, accent: '#16a085', year: '2026',
    alt: 'The VOETutor home page: a search box and cards for vetted IB tutors with their subjects and hourly rates.',
  },
  {
    slug: 'gloam', name: 'Gloam', kicker: 'Own product',
    summary: 'Self-hosted 3D virtual tabletop for D&D 5e, with shadow-casting light, per-creature line of sight and all 339 spells from D&D’s open rules, automated.',
    tags: ['TypeScript', 'React Three Fiber', 'Colyseus', 'SQLite', 'MCP'], url: 'https://github.com/XiniDev/Gloam', linkLabel: 'Source on GitHub',
    image: imgGloam, accent: '#e0a33a', year: '2026',
    alt: 'Gloam’s 3D tabletop: a stone dungeon map seen at an angle, with goblin and Crypt Warden tokens and health bars.',
  },
  {
    slug: 'saltancy', name: 'Saltancy', kicker: 'Consultancy',
    summary: 'My consultancy for end-to-end technical work and custom software. Client projects run through it.',
    tags: ['Next.js', 'Tailwind CSS', 'Motion'], url: 'https://saltancy.com', linkLabel: 'saltancy.com',
    image: imgSaltancy, accent: '#f26b1d', year: '2026',
    alt: 'Saltancy’s landing page: a serif headline beside a wireframe cube on a dark background.',
  },
];

// Curated summaries for repos that aren't featured (from the live site).
const curated = {
  'XiniDev/dbridger': { name: 'DBridger', summary: 'Autonomous agent that queries legacy databases in plain English, with PII redaction built in.', image: imgDbridger },
  'XiniDev/getajobman': { name: 'getajobman', summary: 'Job tracker in Next.js and Supabase that reads a posting from its URL and drafts a tailored CV and cover letter with a language model.' },
  'XiniDev/notes-api': { name: 'Notes API', summary: 'Secure REST API where each user creates, reads, updates and deletes their own notes, with filtering, built on Node.js, Express and MongoDB following OWASP guidance.' },
  'XiniDev/LeadingOnesDAC': { name: 'LeadingOnes DAC', summary: 'MSc dissertation: a model-based deep reinforcement learning agent that learns to tune an optimisation algorithm while it runs.' },
  'XiniDev/AI-Search-Algorithms': { name: 'AI Search Algorithms', summary: 'Classic AI search algorithms, from breadth-first and depth-first to A* and SMA*, planning flight routes on a polar grid.' },
  'XiniDev/NullVector-Processing': { name: 'NullVector', summary: 'Processing (Java) platformer with gravity-affected projectiles, boss phases, bounce damage and a full GUI.' },
  'XiniDev/Jungle-Board-Game-Java': { name: 'Jungle Game & JunGUI', summary: 'Java implementation of the Jungle board game with a Swing GUI, multiplayer support and legal-move highlighting.' },
  'XiniDev/ecs-platformer-demo': { name: 'ECS Platformer Demo', summary: 'Platformer demo that tests an Entity-Component-System architecture, written in C++ with SDL2.' },
};
const hiddenRepos = new Set(['xini.dev', 'Gloam', 'saltancy-web']); // featured or the site itself
const extraItems = [
  { key: 'overthrow', name: 'Overthrow Synthetica', description: 'Two-week, two-person game jam demo for the Warwick Game Dev Society, made with Three.js and WebGL.', url: 'https://github.com/BlueTentProductions/overthrow-synthetica', language: 'JavaScript', date: '2023-10-01T00:00:00Z' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const monthYear = (iso) => { const d = new Date(iso); return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };

// recent vs older is judged against the date the GitHub data was fetched
export function moreProjects(now = new Date(snapshot.fetchedAt), legacyMonths = 24, max = 12) {
  const items = [];
  for (const r of snapshot.repos) {
    if (r.fork || hiddenRepos.has(r.name)) continue;
    const c = curated[r.full_name];
    items.push({
      key: r.full_name, name: c?.name ?? r.name, description: c?.summary ?? r.description ?? '',
      url: r.homepage || r.html_url, language: r.language, date: r.pushed_at, archived: r.archived, image: c?.image,
    });
  }
  items.push(...extraItems);
  const cutoff = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - legacyMonths, now.getUTCDate());
  const byNewest = (a, b) => Date.parse(b.date) - Date.parse(a.date) || a.name.localeCompare(b.name);
  const recent = items.filter((i) => !i.archived && Date.parse(i.date) >= cutoff).sort(byNewest);
  const older = items.filter((i) => i.archived || Date.parse(i.date) < cutoff).sort(byNewest);
  return { recent: recent.slice(0, max), older: [...recent.slice(max), ...older] };
}
