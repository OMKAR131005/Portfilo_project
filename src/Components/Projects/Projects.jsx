import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaJava } from "react-icons/fa";
import { SiSpringboot, SiMysql, SiReact, SiMongodb, SiJsonwebtokens, SiDocker } from "react-icons/si";

const techIcons = {
  "Spring Boot": <SiSpringboot className="text-green-400" />,
  "MySQL": <SiMysql className="text-blue-400" />,
  "MongoDB": <SiMongodb className="text-green-500" />,
  "React": <SiReact className="text-cyan-400" />,
  "JWT": <SiJsonwebtokens className="text-yellow-400" />,
  "Docker": <SiDocker className="text-blue-300" />,
  "Java": <FaJava className="text-orange-400" />,
};

const projects = [
  {
    id: 0,
    title: "DevConnect",
    tag: "In Progress",
    tagColor: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
    description:
      "A production-grade developer social media platform — think LinkedIn built for engineers. Features JWT authentication, role-based access, cookie-based token management, and a clean layered architecture.",
    tech: ["Spring Boot", "MySQL", "JWT", "Java"],
    github: "https://github.com/OMKAR131005/CodeAndDevArena",
    live: null,
    featured: true,
  },
  {
    id: 1,
    title: "Portfolio Blog Site",
    tag: "Live",
    tagColor: "text-green-400 border-green-400/40 bg-green-400/10",
    description:
      "A fully deployed full-stack portfolio with an integrated blog CMS. Admin panel to create, publish and manage blogs with JWT-protected endpoints. Rate limiting with Bucket4j, Dockerized backend on Render, React frontend on Vercel.",
    tech: ["Spring Boot", "React", "MySQL", "Docker", "JWT"],
    github: "https://github.com/OMKAR131005/PortfolioBlogSite-backend",
    live: "https://portfilo-project-sage.vercel.app",
    featured: true,
  },
  {
    id: 2,
    title: "Journal App",
    tag: "Completed",
    tagColor: "text-purple-400 border-purple-400/40 bg-purple-400/10",
    description:
      "A journaling backend built during my Spring Boot learning phase. Supports full CRUD operations for journal entries using RESTful APIs, Spring Data JPA, and MongoDB for persistence. Helped explore core Spring concepts like dependency injection and entity mapping.",
    tech: ["Spring Boot", "MongoDB", "Java"],
    github: "https://github.com/OMKAR131005/Journal_App_updated_version",
    live: null,
    featured: false,
  },
];

const Projects = () => {
  const [hovered, setHovered] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleTech, setVisibleTech] = useState({});
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);

            // Stagger tech pills
            projects[index].tech.forEach((_, techIndex) => {
              setTimeout(() => {
                setVisibleTech((prev) => ({
                  ...prev,
                  [`${index}-${techIndex}`]: true,
                }));
              }, techIndex * 80);
            });
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  return (
    <section
      id="work"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">Projects</h2>
        <div className="w-32 h-1 bg-[#8245ec] mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          Things I've built — from learning projects to production-grade systems.
        </p>
      </div>

      {/* Project Cards */}
      <div className="flex flex-col gap-8">
        {projects.map((project, index) => {
          const isVisible = visibleCards.includes(index);
          const isLeft = index % 2 === 0;

          return (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="bg-gray-900 backdrop-blur-md px-6 py-6 rounded-2xl border border-white/10"
              style={{
                borderColor: hovered === project.id ? "#8245ec" : "rgba(255,255,255,0.1)",
                boxShadow:
                  hovered === project.id
                    ? "0 0 32px 2px rgba(130,69,236,0.45)"
                    : "0 0 20px 1px rgba(130,69,236,0.2)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateX(0)"
                  : isLeft
                  ? "translateX(-50px)"
                  : "translateX(50px)",
                transition:
                  "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                {/* Left: content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${project.tagColor}`}>
                      {project.tag}
                    </span>
                    {project.featured && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full border text-[#8245ec] border-[#8245ec]/40 bg-[#8245ec]/10">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech pills — staggered pop-in */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, techIndex) => {
                      const techVisible = visibleTech[`${index}-${techIndex}`];
                      return (
                        <div
                          key={t}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-transparent border-2 border-gray-700 hover:border-[#8245ec] text-gray-300 text-xs transition-colors duration-300"
                          style={{
                            opacity: techVisible ? 1 : 0,
                            transform: techVisible ? "scale(1)" : "scale(0.8)",
                            transition:
                              "opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease",
                          }}
                        >
                          {techIcons[t]}
                          <span>{t}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: links */}
                <div className="flex md:flex-col gap-3 md:items-end justify-start">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 text-gray-300 hover:text-white hover:border-[#8245ec] transition-all duration-200 text-sm"
                  >
                    <FaGithub />
                    GitHub
                  </a>
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:scale-105"
                      style={{
                        background: "linear-gradient(90deg, #8245ec, #a855f7)",
                        boxShadow: "0 0 16px rgba(130,69,236,0.4)",
                      }}
                    >
                      <FaExternalLinkAlt size={12} />
                      Live
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 text-gray-600 text-sm cursor-not-allowed">
                      <FaExternalLinkAlt size={12} />
                      No Live
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
