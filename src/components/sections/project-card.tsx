import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  featured = false,
}: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col h-full overflow-hidden bg-zinc-900/70 backdrop-blur-md border border-emerald-500/15 rounded-2xl transition-all duration-300 hover:border-emerald-400/60 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <div className="relative w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={800}
          height={500}
          draggable={false}
          className={cn(
            "w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 select-none",
            featured ? "h-56 md:h-72" : "h-44 md:h-48"
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-zinc-950/10 to-transparent" />
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3
          className={cn(
            "font-semibold text-white mb-3 tracking-tight",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-zinc-400 leading-relaxed flex-1",
            featured
              ? "text-[15px] md:text-base line-clamp-5"
              : "text-sm line-clamp-3"
          )}
        >
          {description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-emerald-400 font-medium text-sm">
          View Project
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}
