/* eslint-disable @next/next/no-img-element */

type Project = {
  title: string;
  href: string;
  img: string;
  alt: string;
  blurb: string;
  live?: boolean;
};

const BAYS: { name: string; projects: Project[] }[] = [
  {
    name: "Web",
    projects: [
      {
        title: "Gloam",
        href: "https://github.com/XiniDev/Gloam",
        img: "gloam",
        alt: "Gloam virtual tabletop screenshot",
        blurb: "A self-hosted 3D virtual tabletop for fifth-edition games, built with React Three Fiber and Colyseus. Shadow-casting light, per-creature line of sight, all 339 SRD spells automated, physics dice, and an MCP server for Claude."
      },
      {
        title: "Saltancy Website",
        href: "https://www.saltancy.com",
        img: "saltancy-web",
        alt: "Saltancy website screenshot",
        live: true,
        blurb: "Saltancy is my consultancy company providing end-to-end technical consultancy and custom software development — full-stack web apps, cross-platform mobile, scalable backends, cloud deployment and API integrations. This is Saltancy's landing page."
      },
      {
        title: "Vault of Excellence",
        href: "https://voetutor.com",
        img: "voe",
        alt: "Vault of Excellence screenshot",
        live: true,
        blurb: "A scalable commerce and tutoring platform built on Next.js and Supabase. Educators bridge the gap between content and sales with customizable webpages — curating materials and marketing them through personalized storefronts."
      },
      {
        title: "WSMath",
        href: "https://www.wsmath.com/",
        img: "wsmath",
        alt: "WSMath screenshot",
        blurb: "An online portfolio for an international mathematics exam strategist. Built with Next.js and Tailwind CSS — sleek, responsive, SEO-optimized, with a custom CMS behind a Zero Trust login for easy content management."
      },
      {
        title: "Notes API",
        href: "https://github.com/XiniDev/notes-api",
        img: "notes-api",
        alt: "Notes API screenshot",
        blurb: "A secure RESTful API for managing user-specific notes with CRUD operations, following OWASP principles. MongoDB with Mongoose for efficient data modeling and querying, with advanced filtering features."
      }
    ]
  },
  {
    name: "AI",
    projects: [
      {
        title: "DBridger",
        href: "https://github.com/XiniDev/dbridger",
        img: "dbridger",
        alt: "DBridger screenshot",
        blurb: "A secure PyQt6 desktop gateway connecting legacy databases to Google Gemini — an autonomous agent that navigates relational schemas to answer natural language queries, with local execution, dynamic mapping and automated PII redaction."
      },
      {
        title: "LeadingOnes DAC",
        href: "https://github.com/XiniDev/LeadingOnesDAC",
        img: "lo-dac",
        alt: "LeadingOnes DAC screenshot",
        blurb: "An implementation of a Dyna-DDQN model-based deep-RL agent to improve learning quality and sample efficiency in the LeadingOnes (1+1) RLS benchmark in Dynamic Algorithm Configuration (Biedenkapp 2022)."
      },
      {
        title: "AI Search Algorithms",
        href: "https://github.com/XiniDev/AI-Search-Algorithms",
        img: "ai-search-algorithms",
        alt: "AI search algorithms screenshot",
        blurb: "Uninformed and informed search algorithms for solving flight-route problems on an NxN polar grid, with bidirectional search too."
      }
    ]
  },
  {
    name: "Games",
    projects: [
      {
        title: "NullVector",
        href: "https://github.com/XiniDev/NullVector-Processing",
        img: "nullvector",
        alt: "NullVector screenshot",
        blurb: "A Processing (Java) platformer where you battle enemies and a boss named Zorp using gravity-affected projectiles. Smart AI, bounce damage, boss phases, friendly fire, and a full GUI with health bars and debug tools."
      },
      {
        title: "Jungle Game & JunGUI",
        href: "https://github.com/XiniDev/Jungle-Board-Game-Java",
        img: "jungle-board-game",
        alt: "Jungle board game screenshot",
        blurb: "A full implementation of the Jungle board game in Java with a Swing-based GUI. Multiplayer support, legal move highlighting, cultural-inspired UI design, and complete game logic with flexible OOP encapsulation."
      },
      {
        title: "Overthrow Synthetica",
        href: "https://github.com/BlueTentProductions/overthrow-synthetica",
        img: "overthrow-synthetica",
        alt: "Overthrow Synthetica screenshot",
        blurb: "A game jam demo created with Codethulu over two weeks for the Warwick Game Dev Society, showcasing advanced game development techniques using ThreeJS and WebGL."
      },
      {
        title: "ECS Platformer Demo",
        href: "https://github.com/XiniDev/Golden-Gun",
        img: "ecs-demo",
        alt: "ECS platformer demo screenshot",
        blurb: "A platformer demo testing the Entity-Component-System (ECS) architecture. Developed in C++ and SDL2, demonstrating responsive controls and flexible entity management."
      }
    ]
  }
];

const TOTAL = BAYS.reduce((n, bay) => n + bay.projects.length, 0);

const pad = (n: number) => String(n).padStart(2, "0");

export function Projects() {
  return (
    <>
      {/* ============ 02 PROJECTS ============ */}
      <section id="projects" className="panel" aria-label="Projects">
        <div className="pwrap">
          <div className="proj-head-3d" aria-hidden="true">
            <i></i><span>02 / Selected Work</span><i></i>
          </div>

          <div className="proj-head">
            <div className="fx">
              <span className="eyebrow mono">02 / Projects</span>
              <h2 className="h2">Selected Work</h2>
            </div>
            <a className="btn btn-solid fx" href="https://github.com/XiniDev" target="_blank" rel="noopener noreferrer"><span>See All on GitHub</span></a>
          </div>

          <div className="strip-zone">
            <span className="strip-ghost" aria-hidden="true" id="ghost">{BAYS[0].name.toUpperCase()}</span>

            {BAYS.map((bay, b) => (
              <div className="bay-group" key={bay.name}>
                <div className="bay-head fx">
                  <span className="chip on"><span>{`Bay ${pad(b + 1)} / ${bay.name}`}</span></span>
                  <i className="rule" aria-hidden="true"></i>
                </div>
                <div className="bay-grid">
                  {bay.projects.map((p) => (
                    <a className="pcard card fx" data-bay={bay.name} href={p.href} target="_blank" rel="noopener noreferrer" key={p.href}>
                      <div className="thumb">
                        <img src={`/projects/${p.img}.webp`} alt={p.alt} loading="lazy" />
                        <span className="chip on"><span>{bay.name}</span></span>
                        {p.live && <span className="live"><span><b>●</b>Live</span></span>}
                      </div>
                      <div className="body">
                        <h3>{p.title}</h3>
                        <p>{p.blurb}</p>
                        <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="strip-foot">
            <span className="strip-count">Specimen <b id="spec">01</b> / {pad(TOTAL)} · Bay <b id="bayname">{BAYS[0].name}</b></span>
            <div className="strip-ticks" id="ticks" aria-label="Jump to project"></div>
            <a className="btn btn-line" href="https://github.com/XiniDev" target="_blank" rel="noopener noreferrer"><span>All on GitHub</span></a>
          </div>
        </div>
      </section>

      <div className="flow-divider" aria-hidden="true">
        <div className="divider"><i className="d1"></i><i className="d2"></i><i className="d3"></i><i className="d4"></i></div>
      </div>
    </>
  );
}
