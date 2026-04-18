import { useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const sidebarItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Posts", path: "/admin/posts" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Comments", path: "/admin/comments", disabled: true },
    { label: "Settings", path: "/admin/settings" },
  ];

  const location = useLocation();
  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/posts": "Posts",
    "/admin/categories": "Categories",
    "/admin/comments": "Comments",
    "/admin/settings": "Settings",
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const title = pageTitles[location.pathname];

  return (
    <header
      className="h-16 bg-gradient-to-br from-[#0f0f14] to-[#2b124f]
 md:ml-64 text-white flex items-center border-b border-white justify-between"
    >
      <div className="md:hidden flex">
        {isMobileMenuOpen ? (
          <FiX
            className="text-[#8245ec] mr-16 cursor-pointer text-3xl z-50 "
            size={28}
            onClick={() => setIsMobileMenuOpen(false)}
          ></FiX>
        ) : (
          <FiMenu
            className="text-[#8245ec] cursor-pointer text-3xl z-50"
            size={28}
            onClick={() => setIsMobileMenuOpen(true)}
          />
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <h1 className="px-8 text-xl font-semibold">{title}</h1>
        <div
          className="w-10 h-10 mr-4 rounded-lg bg-white bg-gradient-to-r 
          from-[#8245ec] 
          to-[#a855f7]
          shadow-[0_0_20px_#8245ec]"
        ></div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="h-screen w-64 bg-[#050414] text-white flex flex-col">
            <div className="p-4 text-xl font-bold border-b border-white text-left">
              Admin Panel
            </div>
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
      )}
    </header>
  );
};

export default Header;
