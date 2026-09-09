import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Education", id: "education" },
    { name: "Blog", id: "blogs" },
    { name: "Contact", id: "contact" },
  ];

  const socials = [
    {
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/omkar-gawande-3b89b4327",
    },
    {
      icon: <FaGithub />,
      link: "https://github.com/OMKAR131005",
    },
  ];

  return (
    <footer className="text-white py-8 px-[12vw] md:px-[7vw] lg:px-[20vw] border-t border-white/10">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <h2 className="text-xl font-semibold">
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-white">Omkar</span>
          <span className="text-[#8245ec]">/</span>
          <span className="text-white">Gawande</span>
          <span className="text-[#8245ec]">&gt;</span>
        </h2>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="text-gray-400 hover:text-[#8245ec] text-sm sm:text-base transition-colors duration-200"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex justify-center gap-5 mt-6">
          {socials.map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:text-[#8245ec] transition-all duration-200 hover:scale-110"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Omkar Gawande. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;