import React from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
// import { useState } from "react";

const Sidebar = () => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Sidebar.jsx
  const sidebarItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Posts", path: "/admin/posts" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Comments", path: "/admin/comments", disabled: true },
    { label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex">
      <div className={`hidden md:w-64 h-[100%] fixed bg-[#050414]  md:text-white md:flex md:flex-col border-r border-white`}>
        <div className=" sm:p-2 md:p-4 md:text-2xl sm:font-bold sm:border-b sm:border-white">Admin Panel</div>
      <nav className="flex-1 p-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            to={item.disabled ? "#" : item.path}
            className={`block px-2 py-2 rounded mb-1 hover:bg-gray-700 ${
              item.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      </div>
    </div>
  );
};

export default Sidebar;
