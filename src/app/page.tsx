import { Hud, FlowHead } from "@/components/facet/hud";
import { Home } from "@/components/facet/home";
import { About } from "@/components/facet/about";
import { Projects } from "@/components/facet/projects";
import { Contact, SiteFooter } from "@/components/facet/contact";
import FacetEngine from "@/components/facet/engine";

export default function Page() {
  return (
    <>
      <Hud />
      <FlowHead />
      <div id="viewport">
        <div id="world">
          <i className="wstroke" aria-hidden="true" />
          <i className="wstroke" aria-hidden="true" />
          <i className="wstroke" aria-hidden="true" />
          <i className="wstroke" aria-hidden="true" />
          <i className="wstroke" aria-hidden="true" />
          <i className="wstroke" aria-hidden="true" />
          <Home />
          <About />
          <Projects />
          <Contact />
        </div>
      </div>
      <div id="spacer" aria-hidden="true"></div>
      <SiteFooter />
      <FacetEngine />
    </>
  );
}
