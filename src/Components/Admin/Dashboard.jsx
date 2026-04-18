import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi, removeToken } from "../../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getAllBlogs()
      .then(setBlogs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const published = blogs.filter((b) => b.status === "PUBLISHED").length;
  const drafts = blogs.filter((b) => b.status === "DRAFT").length;

  const dashboardCards = [
    { title: "Total Blogs", value: blogs.length, description: "All time" },
    { title: "Published", value: published, description: "Live on site" },
    { title: "Drafts", value: drafts, description: "Unpublished" },
    { title: "Categories", value: [...new Set(blogs.map((b) => b.category))].length, description: "Unique tags" },
  ];

  const handleLogout = () => {
    removeToken();
    navigate("/Login");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 border border-red-400/30 px-4 py-1.5 rounded hover:bg-red-900/20 transition"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p className="text-purple-400 animate-pulse">Loading stats...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardCards.map((card) => (
              <div
                key={card.title}
                className="bg-[#050414] border border-gray-700 text-white rounded-xl shadow p-6 flex flex-col items-center"
              >
                <h2 className="text-lg font-semibold mb-1">{card.title}</h2>
                <p className="text-3xl font-bold mb-1">{card.value.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#050414] border border-gray-700 text-white rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Blogs</h2>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-800 text-gray-300">
                  <th className="text-left px-4 py-3">Title</th>
                  <th className="text-left px-4 py-3">Category</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {blogs.slice(0, 5).map((blog) => (
                  <tr key={blog.id} className="border-t border-gray-800 hover:bg-gray-900/50">
                    <td className="px-4 py-3 text-gray-200">{blog.title}</td>
                    <td className="px-4 py-3 text-purple-400">{blog.category}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${blog.status === "PUBLISHED" ? "bg-green-900 text-green-400" : "bg-yellow-900 text-yellow-400"}`}>
                        {blog.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => navigate("/admin/posts")}
              className="mt-4 bg-gradient-to-r from-[#8245ec] to-[#a855f7] text-white py-2 px-4 rounded-lg text-sm hover:opacity-90 transition"
            >
              Manage Posts →
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
