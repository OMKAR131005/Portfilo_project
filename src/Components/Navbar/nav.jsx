// import React, { use } from "react";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaDribbble, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";




import "../../index.css";

const Nav = () => {
  const navigate=useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location= useLocation();

  // const handleClick = (sectionId) => {
  //   setActiveSection(sectionId);
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  
  // perfect scroll with offset
const handleClickMain = (sectionId) => {
  if (location.pathname !== "/") {
    navigate("/", { state: { scrollTo: sectionId } });
  } else {
    handleClick(sectionId);
  }
};

  const handleClick = (sectionId) => {

  setActiveSection(sectionId);

  const section = document.getElementById(sectionId);
  if (!section) return;

  const navbarHeight = 80; // approx height of your navbar
  const sectionTop =
    section.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: sectionTop - navbarHeight,
    behavior: "smooth",
  });
};

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {

  if (location.state?.scrollTo) {
    handleClick(location.state.scrollTo);
  }

}, [] );

  const itemsMenu = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Projects" },
    { id: "contact", label: "Contact" },
    { id: "education", label: "Education" },
    {id:"blogs", label:"Blog"},
    
  ];

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition duration-300 px-[7vw] md:px-[7vw] lg:px-[20vw]
    ${
      isScrolled
        ? "bg-[#050414] bg-opacity-50 backdrop-blur-md shadow-md"
        : "bg-transparent"
    }
  `}
    >
      <div className={"text-white py-5 flex justify-between items-center"}>
        <div className="text-lg  font-semibold cursor-pointer">
          <span className={"text-[#8245ec]"}>&lt;</span>
          <span className={"text-white"}>Omkar</span>
          <span className={"text-[#8245ec]"}>/</span>
          <span className={"text-white"}>Gawande</span>
          <span className={"text-[#8245ec]"}>&gt;</span>
        </div>
        {/* desktop meanu*/}
        <ul className={"hidden md:flex space-x-8 text-grey-300"}>
          {itemsMenu.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:text-[#8245ec] ${
                activeSection === item.id ? "text-[#8245ec]" : ""
              }`}
            >
              <button onClick={() => handleClickMain(item.id)}>{item.label}</button>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex space-x-4">
          <a
            href="https://www.linkedin.com/in/omkar-gawande-3b89b4327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-grey-300 hover:text-[#8245ec]"
          >
            <FaLinkedin size={24} />
          </a>
             <a
            href="https://github.com/OMKAR131005/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-grey-300 hover:text-[#8245ec]"
          >
            <FaGithub size={24} />
          </a>
          {/* <Link
            to="/Login"
            // target="_blank"
            // rel="noopener noreferrer"
            className="text-grey-300 hover:text-[#8245ec]"
          >
            <FaUserShield size={24} />
          </Link> */}
        
        </div>

        {/* mobile menu */}
        <div className="md:hidden flex">
          {isMobileMenuOpen ? (
            <FiX
              className="text-[#8245ec] cursor-pointer text-3xl"
              size={28}
              onClick={() => setIsMobileMenuOpen(false)}
            ></FiX>
          ) : (
            <FiMenu
              className="text-[#8245ec] cursor-pointer text-3xl"
              size={28}
              onClick={() => setIsMobileMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-[#050414] bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden"> 
         <ul className={"flex flex-col items-center space-y-4 py-4 text-gray-300"}>
          {itemsMenu.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:text-white font-bold text-xl ${
                activeSection === item.id ? "text-[#8245ec]" : ""
              }`}
            >
              <button onClick={() => handleClick(item.id)}>{item.label}</button>
            </li>
          ))}
        <div className="flex space-x-4 flex-col space-y-4 ">
          <a
            href="https://www.linkedin.com/in/omkar-gawande-3b89b4327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#8245ec]"
          >
            <FaLinkedin size={24} />
          </a>

          <a
            href="https://github.com/OMKAR131005/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#8245ec]"
          >
            <FaGithub size={24} />
          </a>
          
          {/* <Link
            to="/Login"
            // target="_blank"
            // rel="noopener noreferrer"
            className="text-grey-300 hover:text-[#8245ec]"
          >
            <FaUserShield size={24} />
          </Link> */}
        </div>
        </ul> 
      </div>
      )}
    </nav>
  );
};

export default Nav;
