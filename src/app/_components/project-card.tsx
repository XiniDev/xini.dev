import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
}: ProjectCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col justify-between transform transition duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="overflow-hidden rounded-lg mb-4">
        <Image
          src={image}
          alt={title}
          className="w-full h-48 object-cover object-center transform transition duration-500 hover:scale-110"
          width={400}
          height={250}
        />
      </div>

      {/* Title & Description */}
      <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
        {description}
      </p>

      {/* Link with animated underline */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center gap-2 text-emerald-400 font-medium group"
      >
        View Project
        <FontAwesomeIcon icon={faUpRightFromSquare} className="text-sm" />
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full"></span>
      </a>

      {/* Emerald line at bottom */}
      <div className="mt-6 h-1 w-full bg-emerald-600 rounded-full"></div>
    </div>
  );
}
