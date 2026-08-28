export function Home() {
  return (
    <>
      {/* ============ 00 HOME ============ */}
      <section id="home" className="panel" aria-label="Home">
        <div className="pwrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow mono rise">Welcome to the circuit</span>
              <h1 className="wordmark rise r2">XINI</h1>
              <p className="tagline rise r3">Designer <em>/</em> Developer <em>/</em> Creator</p>
              <div className="cta-row rise r4">
                <button className="btn btn-solid" data-go="2"><span>View Projects</span></button>
                <button className="btn btn-line" data-go="3"><span>Contact Me</span></button>
              </div>
            </div>
            <div className="mark3d-slot rise r3">
              <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
                <defs>
                  <g id="xm-color">
                    <path d="M2600 2400 1200 0H600l1400 2400Z" fill="#059669" />
                    <path d="M0 1200 600 0h600L600 1200Z" fill="#10b981" />
                    <path d="M0 1200 600 2400h600L600 1200Z" fill="#10b981" />
                    <path d="M2000 0h600l600 1200h-600Z" fill="#10b981" />
                    <path d="M3200 1200 2600 2400h-600l600-1200Z" fill="#10b981" />
                    <path d="M600 2400 2000 0h600L1200 2400Z" fill="#34d399" />
                  </g>
                  <g id="xm-flat">
                    <path d="M2600 2400 1200 0H600l1400 2400Z" />
                    <path d="M0 1200 600 0h600L600 1200Z" />
                    <path d="M0 1200 600 2400h600L600 1200Z" />
                    <path d="M2000 0h600l600 1200h-600Z" />
                    <path d="M3200 1200 2600 2400h-600l600-1200Z" />
                    <path d="M600 2400 2000 0h600L1200 2400Z" />
                  </g>
                </defs>
              </svg>
              <div className="mark3d" aria-hidden="true">
                <div className="mark3d-float">
                  <div className="mark3d-inner">
                    <svg className="msl p1" viewBox="0 0 3200 2400"><use href="#xm-color" /></svg>
                    <svg className="msl core p2" viewBox="0 0 3200 2400"><use href="#xm-flat" /></svg>
                    <svg className="msl core p3" viewBox="0 0 3200 2400"><use href="#xm-flat" /></svg>
                    <svg className="msl p4" viewBox="0 0 3200 2400"><use href="#xm-color" /></svg>
                  </div>
                </div>
                <i className="mshadow"></i>
              </div>
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <i></i><span>Scroll — the lap begins</span><i></i>
          </div>
        </div>
      </section>

      <div className="flow-divider" aria-hidden="true">
        <div className="divider"><i className="d1"></i><i className="d2"></i><i className="d3"></i><i className="d4"></i></div>
      </div>
    </>
  );
}
