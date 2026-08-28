export function About() {
  return (
    <>
      {/* ============ 01 ABOUT ============ */}
      <section id="about" className="panel" aria-label="About">
        <div className="pwrap">
          <div className="about-grid">
            <div className="about-head fx">
              <span className="eyebrow mono">01 / About</span>
              <h2 className="h2">Hey there, I&apos;m Xini.</h2>
              <p>Five facets, one mark. Everything I make runs on the same angle.</p>
            </div>
            <div className="about-cards">
              <div className="acard card fx">
                <span className="chip on"><span>Profile</span></span>
                <p>Deeply passionate about <em className="hi">coding</em>, <em className="hi">AI</em> &amp; <em className="hi">game development</em>.</p>
              </div>
              <div className="acard card fx">
                <span className="chip on"><span>Ethos</span></span>
                <p>Turning my wildest imaginations into <em className="hi">reality with code</em>.</p>
              </div>
              <div className="acard card fx">
                <span className="chip on"><span>Education</span></span>
                <p><em className="hi">BSc Computer Science</em> · Warwick<br /><em className="hi">MSc Artificial Intelligence</em> · St Andrews</p>
              </div>
              <div className="acard card fx">
                <span className="chip on"><span>Beyond</span></span>
                <p>Into <em className="hi">games, art &amp; world-building</em> — always chasing the latest <em className="hi">tech &amp; design</em>.</p>
              </div>
              <a className="acard card fx" href="#contact" data-go="3">
                <span className="chip on"><span>Collab</span></span>
                <p>Excited to create something awesome?</p>
                <span className="go">Let&apos;s team up
                  <svg className="icon stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="flow-divider" aria-hidden="true">
        <div className="divider"><i className="d1" /><i className="d2" /><i className="d3" /><i className="d4" /></div>
      </div>
    </>
  );
}
