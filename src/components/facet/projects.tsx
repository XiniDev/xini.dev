/* eslint-disable @next/next/no-img-element */

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
            <span className="strip-ghost" aria-hidden="true" id="ghost">WEB</span>

            <div className="bay-group">
              <div className="bay-head fx">
                <span className="chip on"><span>Bay 01 / Web</span></span>
                <i className="rule" aria-hidden="true"></i>
              </div>
              <div className="bay-grid">

                <a className="pcard card fx" href="https://www.saltancy.com" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/saltancy-web.webp" alt="Saltancy website screenshot" loading="lazy" />
                    <span className="chip on"><span>Web</span></span>
                    <span className="live"><span><b>●</b>Live</span></span>
                  </div>
                  <div className="body">
                    <h3>Saltancy Website</h3>
                    <p>Saltancy is my consultancy company providing end-to-end technical consultancy and custom software development — full-stack web apps, cross-platform mobile, scalable backends, cloud deployment and API integrations. This is Saltancy&apos;s landing page.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

                <a className="pcard card fx" href="https://voetutor.com" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/voe.webp" alt="Vault of Excellence screenshot" loading="lazy" />
                    <span className="chip on"><span>Web</span></span>
                    <span className="live"><span><b>●</b>Live</span></span>
                  </div>
                  <div className="body">
                    <h3>Vault of Excellence</h3>
                    <p>A scalable commerce and tutoring platform built on Next.js and Supabase. Educators bridge the gap between content and sales with customizable webpages — curating materials and marketing them through personalized storefronts.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

                <a className="pcard card fx" href="https://www.wsmath.com/" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/wsmath.webp" alt="WSMath screenshot" loading="lazy" />
                    <span className="chip on"><span>Web</span></span>
                  </div>
                  <div className="body">
                    <h3>WSMath</h3>
                    <p>An online portfolio for an international mathematics exam strategist. Built with Next.js and Tailwind CSS — sleek, responsive, SEO-optimized, with a custom CMS behind a Zero Trust login for easy content management.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

                <a className="pcard card fx" href="https://github.com/XiniDev/notes-api" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/notes-api.webp" alt="Notes API screenshot" loading="lazy" />
                    <span className="chip on"><span>Web</span></span>
                  </div>
                  <div className="body">
                    <h3>Notes API</h3>
                    <p>A secure RESTful API for managing user-specific notes with CRUD operations, following OWASP principles. MongoDB with Mongoose for efficient data modeling and querying, with advanced filtering features.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

              </div>
            </div>

            <div className="bay-group">
              <div className="bay-head fx">
                <span className="chip on"><span>Bay 02 / AI</span></span>
                <i className="rule" aria-hidden="true"></i>
              </div>
              <div className="bay-grid">

                <a className="pcard card fx" href="https://github.com/XiniDev/dbridger" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/dbridger.webp" alt="DBridger screenshot" loading="lazy" />
                    <span className="chip on"><span>AI</span></span>
                  </div>
                  <div className="body">
                    <h3>DBridger</h3>
                    <p>A secure PyQt6 desktop gateway connecting legacy databases to Google Gemini — an autonomous agent that navigates relational schemas to answer natural language queries, with local execution, dynamic mapping and automated PII redaction.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

                <a className="pcard card fx" href="https://github.com/XiniDev/LeadingOnesDAC" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/lo-dac.webp" alt="LeadingOnes DAC screenshot" loading="lazy" />
                    <span className="chip on"><span>AI</span></span>
                  </div>
                  <div className="body">
                    <h3>LeadingOnes DAC</h3>
                    <p>An implementation of a Dyna-DDQN model-based deep-RL agent to improve learning quality and sample efficiency in the LeadingOnes (1+1) RLS benchmark in Dynamic Algorithm Configuration (Biedenkapp 2022).</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

                <a className="pcard card fx" href="https://github.com/XiniDev/AI-Search-Algorithms" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/ai-search-algorithms.webp" alt="AI search algorithms screenshot" loading="lazy" />
                    <span className="chip on"><span>AI</span></span>
                  </div>
                  <div className="body">
                    <h3>AI Search Algorithms</h3>
                    <p>Uninformed and informed search algorithms for solving flight-route problems on an NxN polar grid, with bidirectional search too.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

              </div>
            </div>

            <div className="bay-group">
              <div className="bay-head fx">
                <span className="chip on"><span>Bay 03 / Games</span></span>
                <i className="rule" aria-hidden="true"></i>
              </div>
              <div className="bay-grid">

                <a className="pcard card fx" href="https://github.com/XiniDev/NullVector-Processing" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/nullvector.webp" alt="NullVector screenshot" loading="lazy" />
                    <span className="chip on"><span>Games</span></span>
                  </div>
                  <div className="body">
                    <h3>NullVector</h3>
                    <p>A Processing (Java) platformer where you battle enemies and a boss named Zorp using gravity-affected projectiles. Smart AI, bounce damage, boss phases, friendly fire, and a full GUI with health bars and debug tools.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

                <a className="pcard card fx" href="https://github.com/XiniDev/Jungle-Board-Game-Java" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/jungle-board-game.webp" alt="Jungle board game screenshot" loading="lazy" />
                    <span className="chip on"><span>Games</span></span>
                  </div>
                  <div className="body">
                    <h3>Jungle Game &amp; JunGUI</h3>
                    <p>A full implementation of the Jungle board game in Java with a Swing-based GUI. Multiplayer support, legal move highlighting, cultural-inspired UI design, and complete game logic with flexible OOP encapsulation.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

                <a className="pcard card fx" href="https://github.com/BlueTentProductions/overthrow-synthetica" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/overthrow-synthetica.webp" alt="Overthrow Synthetica screenshot" loading="lazy" />
                    <span className="chip on"><span>Games</span></span>
                  </div>
                  <div className="body">
                    <h3>Overthrow Synthetica</h3>
                    <p>A game jam demo created with Codethulu over two weeks for the Warwick Game Dev Society, showcasing advanced game development techniques using ThreeJS and WebGL.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

                <a className="pcard card fx" href="https://github.com/XiniDev/Golden-Gun" target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <img src="/projects/ecs-demo.webp" alt="ECS platformer demo screenshot" loading="lazy" />
                    <span className="chip on"><span>Games</span></span>
                  </div>
                  <div className="body">
                    <h3>ECS Platformer Demo</h3>
                    <p>A platformer demo testing the Entity-Component-System (ECS) architecture. Developed in C++ and SDL2, demonstrating responsive controls and flexible entity management.</p>
                    <span className="view">View Project <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
                  </div>
                </a>

              </div>
            </div>
          </div>

          <div className="strip-foot">
            <span className="strip-count">Specimen <b id="spec">01</b> / 11 · Bay <b id="bayname">Web</b></span>
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
