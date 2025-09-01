import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const contacts = [
  {
    name: "Email",
    icon: faEnvelope,
    link: "mailto:anxinizlol@gmail.com",
  },
  {
    name: "GitHub",
    icon: faGithub,
    link: "https://github.com/XiniDev",
  },
  {
    name: "Twitter",
    icon: faXTwitter,
    link: "https://x.com/XiniDev",
  },
  {
    name: "LinkedIn",
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/anxini/",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-950 text-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-emerald-500">Contact</span> Me
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-2 rounded"></div>
        </h2>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-8 rounded-xl bg-gray-800 border border-gray-700 hover:border-emerald-500 transition transform hover:-translate-y-2 duration-300"
            >
              {/* Icon */}
              <div className="text-emerald-400 mb-4 transition-transform duration-300 group-hover:scale-110">
                <FontAwesomeIcon icon={contact.icon} className="text-5xl" />
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-white hover:text-emerald-400 transition">
                {contact.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
