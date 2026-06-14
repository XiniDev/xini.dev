"use client";

import { VolumetricProvider } from "@/components/volumetric/context";
import { CanvasMount } from "@/components/volumetric/canvas-mount";
import { HudFrame } from "@/components/volumetric/hud-frame";
import { Scene } from "@/components/volumetric/scene";
import { HeroScene } from "@/components/scenes/hero";
import { AboutScene } from "@/components/scenes/about";
import { ProjectsScene } from "@/components/scenes/projects";
import { ContactScene } from "@/components/scenes/contact";

export default function Home() {
  return (
    <VolumetricProvider>
      <CanvasMount />
      <HudFrame />
      <main className="relative z-10">
        <Scene id="hero" budgetVh={150}>
          <HeroScene />
        </Scene>
        <Scene id="about" budgetVh={300} className="scene-flow-narrow">
          {({ progress }) => <AboutScene progress={progress} />}
        </Scene>
        <Scene id="projects" budgetVh={500} className="scene-flow-touch">
          {({ progress }) => <ProjectsScene progress={progress} />}
        </Scene>
        <Scene id="contact" budgetVh={200} className="scene-flow-narrow">
          <ContactScene />
        </Scene>
      </main>
    </VolumetricProvider>
  );
}
