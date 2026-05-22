import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { publicApi } from "../../utils/api";

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const allBlogs = await publicApi.getPublishedBlogs();
        setBlogs(allBlogs);

        // Use latest blog as featured
        if (allBlogs.length > 0) {
          setFeaturedBlog(allBlogs[0]);
        }
      } catch (err) {
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <section id="blogs" className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans text-center">
        <div className="text-purple-400 text-xl animate-pulse">Loading blogs...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blogs" className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans text-center">
        <p className="text-red-400">{error}</p>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">Blogs</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          Read my latest blogs on web development, programming, and technology.
        </p>
      </div>

      {/* Featured Blog */}
      {featuredBlog && (
        <div className="bg-gray-900 bg-transparent backdrop-blur-md p-6 rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] mb-12 max-h-[75vh] overflow-y-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2 block">
            Latest Post
          </span>
          <h3 className="text-2xl font-semibold text-gray-300 mb-2 text-center">
            {featuredBlog.title}
          </h3>
          <p className="text-white/70 text-sm mt-1 mb-1">
            Author: <span className="text-white font-medium">Omkar Gawande</span>
          </p>
          <p className="text-white/70 text-sm mb-1">
            Published: <span className="text-white font-medium">{formatDate(featuredBlog.publishedAt)}</span>
          </p>
          <p className="text-white/70 text-sm mb-4">
            Category: <span className="text-purple-400 font-medium">{featuredBlog.category}</span>
          </p>
          <div data-color-mode="dark">
            <MDEditor.Markdown source={featuredBlog.content || ""} className="markdown-body" />
          </div>
        </div>
      )}

      {/* Blog Grid */}
      {blogs.length === 0 ? (
        <p className="text-gray-400 text-center">No blogs published yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blogs/${blog.id}`)}
              className="cursor-pointer bg-gray-600 hover:bg-gray-900 backdrop-blur-md p-6 rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] transition-all duration-300"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2 block">
                {blog.category}
              </span>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">{blog.title}</h3>
              <p className="text-white/60 text-sm mb-2">{formatDate(blog.publishedAt)}</p>
              <p className="text-gray-400 text-sm line-clamp-3">
                {blog.content?.substring(0, 120)}...
              </p>
              <span className="text-purple-400 text-sm mt-3 inline-block hover:underline">
                Read more →
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogList;
