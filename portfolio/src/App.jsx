import React from 'react'
import './index.css'
// import Nav from './Components/Navbar/nav.jsx'
// import About from './Components/About/about.jsx'
// import Skill from './Components/Skill/Skill.jsx'
// import Education from './Components/Education/Education.jsx'
// import BlogList from './Pages/blogs/blogList.jsx'
import Home from './Components/Home/Home.jsx'
// import Login from './Components/Login/Login.jsx'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Xxx from './Components/NotPath/Xxx.jsx'
// import BlogDetail from './Pages/blogs/blogDetail.jsx'
// import Nav from './Components/Navbar/nav.jsx';
import BlogDetailMain from './Components/Home/BlogDetailMain.jsx';
import LoginMain from './Components/Home/LoginMain.jsx';
import Sidebar from './Components/Admin/AdminLayout.jsx';
import AdminLayout from './Components/Admin/AdminLayout.jsx';
import Dashboard from './Components/Admin/Dashboard.jsx';
import AddBlog from './Components/Admin/AddBlog.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetailMain/>,
  },
  {
    path: "/Login",
    element: <LoginMain/>,
  },
  {
    path:'/admin',
    element:<AdminLayout/>,
    children:
      [
        {index:true, element:<Dashboard/>},
        {path:'dashboard', element:<div>Dashboard Admin Page</div>},
        {path:'posts', element:<AddBlog/>},
      ]
  },
  {
    path: "*",
    element: <Xxx />,
  },
]);

const App = () => {

  return (
    // <div className="bg-[#050414]">


    //   <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
    //   <div className="relative pt-20">
        <RouterProvider router={router}></RouterProvider>
    //   </div>
    // </div>

  )
}

export default App


