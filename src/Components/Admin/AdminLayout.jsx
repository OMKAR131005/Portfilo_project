import React from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      
        <Sidebar />
   

      {/* Right Section */}
      <div className="flex flex-col flex-1">
        
        {/* Header */}  
          <Header />
        {/* Page Content */}
        <main className="flex-1 px-4 overflow-y-auto md:ml-64 bg-gradient-to-tr from-black via-purple-950 to-gray-900 p-6">

          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;




