import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

import Home from './Components/Home/Home.jsx';
import BlogDetailMain from './Components/Home/BlogDetailMain.jsx';
import LoginMain from './Components/Home/LoginMain.jsx';
import AdminLayout from './Components/Admin/AdminLayout.jsx';
import Dashboard from './Components/Admin/Dashboard.jsx';
import AddBlog from './Components/Admin/AddBlog.jsx';
import ProtectedRoute from './Components/Auth/ProtectedRoute.jsx';
import Xxx from './Components/NotPath/Xxx.jsx';
import Intro from "./Components/NotPath/Intro.jsx";
import IntroGate from "./Components/NotPath/IntroGate.jsx";

const router = createBrowserRouter([
  {
    element: <IntroGate/>, // 👈 ADD THIS
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetailMain />,
      },
      {
        path: "/Login",
        element: <LoginMain />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "posts", element: <AddBlog /> },
        ],
      },
      {
        path: "*",
        element: <Xxx />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
