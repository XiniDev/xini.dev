import Navigation from "./_components/navigation";
import Hero from "./_components/hero";
import About from "./_components/about";
import Projects from "./_components/projects";
import Contact from "./_components/contact";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}
