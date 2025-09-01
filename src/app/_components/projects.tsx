import ProjectCard from "./project-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const projects = [
  {
    title: "NullVector",
    description:
      "NullVector is a Processing (Java) platformer where you battle enemies and a boss named Zorp using gravity-affected projectiles. Features include smart AI, bounce damage, boss phases, friendly fire, and a full GUI with health bars and debug tools.",
    image: "/projects/nullvector.png",
    link: "https://github.com/XiniDev/NullVector-Processing",
  },
  {
    title: "Jungle Game & JunGUI",
    description:
      "A full implementation of the Jungle board game in Java, including a Swing-based GUI (JunGUI). Features multiplayer support, legal move highlighting, cultural-inspired UI design, and complete game logic with flexible OOP encapsulation.",
    image: "/projects/jungle-board-game.png",
    link: "https://github.com/XiniDev/Jungle-Board-Game-Java",
  },
  {
    title: "WSMath",
    description:
      "WS Math is an online portfolio for a professional math tutor specializing in IB, A-levels, and IGCSE curricula. The website showcases the tutor's expertise, teaching philosophy, and success stories.",
    image: "/projects/wsmath-logo.png",
    link: "https://www.wsmath.com/",
  },
  {
    title: "Overthrow Synthetica",
    description:
      "Overthrow Synthetica is a game jam demo created in collaboration with Codethulu over two weeks for the Warwick Game Dev Society. It showcases advanced game development techniques using ThreeJS and WebGL.",
    image: "/projects/overthrow-synthetica.png",
    link: "https://github.com/BlueTentProductions/overthrow-synthetica",
  },
  {
    title: "ECS Platformer Demo",
    description:
      "A platformer demo testing the Entity-Component-System (ECS) architecture. Developed in C++ and SDL2, it demonstrates responsive controls and flexible entity management.",
    image: "/projects/ecs-demo.png",
    link: "https://github.com/XiniDev/Golden-Gun",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12">
          My <span className="text-emerald-500">Projects</span>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-2 rounded"></div>
        </h2>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="https://github.com/XiniDev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-700 transition"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            See All Projects on GitHub
            <FontAwesomeIcon icon={faUpRightFromSquare} className="text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
}
