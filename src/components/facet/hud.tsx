export function Hud() {
  return (
    <div className="hud" aria-hidden="false">
      <i className="tick tl" aria-hidden="true" />
      <i className="tick tr" aria-hidden="true" />
      <i className="tick bl" aria-hidden="true" />
      <i className="tick br" aria-hidden="true" />
      <div className="hbrand">
        <svg viewBox="0 0 3200 2400" aria-label="Xini mark" role="img">
          <path d="M2600 2400 1200 0H600l1400 2400Z" fill="#059669" />
          <path d="M0 1200 600 0h600L600 1200Z" fill="#10b981" />
          <path d="M0 1200 600 2400h600L600 1200Z" fill="#10b981" />
          <path d="M2000 0h600l600 1200h-600Z" fill="#10b981" />
          <path d="M3200 1200 2600 2400h-600l600-1200Z" fill="#10b981" />
          <path d="M600 2400 2000 0h600L1200 2400Z" fill="#34d399" />
        </svg>
        <span>XINI.DEV</span>
      </div>
      <div className="hstop" aria-hidden="true"><b id="hud-n">00</b><span id="hud-stop">Home</span></div>
      <div className="hlap" aria-hidden="true">Lap <b id="hud-lap">000</b>%</div>
      <nav className="hud-nav" aria-label="Sections">
        <button data-go="0" className="on"><span className="lbl">Home</span><i aria-hidden="true" /></button>
        <button data-go="1"><span className="lbl">About</span><i aria-hidden="true" /></button>
        <button data-go="2"><span className="lbl">Projects</span><i aria-hidden="true" /></button>
        <button data-go="3"><span className="lbl">Contact</span><i aria-hidden="true" /></button>
      </nav>
    </div>
  );
}

export function FlowHead() {
  return (
    <header className="flow-head">
      <div className="row">
        <a className="brand" href="#home">
          <svg viewBox="0 0 3200 2400" aria-label="Xini mark" role="img">
            <path d="M2600 2400 1200 0H600l1400 2400Z" fill="#059669" />
            <path d="M0 1200 600 0h600L600 1200Z" fill="#10b981" />
            <path d="M0 1200 600 2400h600L600 1200Z" fill="#10b981" />
            <path d="M2000 0h600l600 1200h-600Z" fill="#10b981" />
            <path d="M3200 1200 2600 2400h-600l600-1200Z" fill="#10b981" />
            <path d="M600 2400 2000 0h600L1200 2400Z" fill="#34d399" />
          </svg>
          <span>XINI.DEV</span>
        </a>
        <nav className="flow-nav" aria-label="Sections">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
