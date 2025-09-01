import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-950 text-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-emerald-500">About</span> Me
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-2 rounded"></div>
        </h2>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="md:w-1/3 flex justify-center">
            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-emerald-500 transition shadow-lg">
              <Image
                src="/icon.svg"
                alt="XiniDev Logo"
                width={200}
                height={200}
                className="rounded-md drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              />
              {/* Optional emerald glow ring */}
              <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/40 animate-pulse pointer-events-none"></div>
            </div>
          </div>

          {/* Text */}
          <div className="md:w-2/3 space-y-6 text-lg leading-relaxed">
            <p>
              Hey there! I&apos;m <span className="text-emerald-400">Xini</span>.  
              I&apos;m deeply passionate about{" "}
              <span className="text-emerald-400">coding, AI</span>, and{" "}
              <span className="text-emerald-400">game development</span>.  
              There&apos;s nothing more exciting to me than turning my wildest 
              imaginations into reality with code. I studied{" "}
              <span className="text-emerald-400">Computer Science</span> at the 
              University of Warwick, where I got to work on a variety of projects 
              with some amazing people.
            </p>
            <p>
              Beyond coding, I&apos;m really into{" "}
              <span className="text-emerald-400">games, art, and world-building</span> —  
              these interests constantly spark new ideas and keep me inspired.  
              I&apos;m always eager to learn new things and dive into the latest 
              <span className="text-emerald-400"> tech and design trends</span>.
            </p>
            <p>
              If you&apos;re excited about creating something awesome,{" "}
              <span className="text-emerald-400">let&apos;s team up</span> and make it happen!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
