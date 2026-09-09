import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { adminApi } from "../../utils/api";

const MODES = { CREATE: "CREATE", EDIT: "EDIT", PUBLISH: "PUBLISH", DELETE: "DELETE" };

// Match backend enum exactly
const CATEGORIES = ["PUBLIC", "TECH", "SPRING_BOOT", "REACT", "DSA", "HISTORY"];

const formatDate = (iso) => {
  if (!iso) return "Draft";
  return new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
};

const AddBlog = () => {
  const [value, setValue] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState(MODES.CREATE);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchBlogs = () => {
    setFetchLoading(true);
    adminApi.getAllBlogs()
      .then(setBlogs)
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setFetchLoading(false));
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleClick = (blog, newMode) => {
    setSelectedBlog(blog);
    setTitle(blog.title);
    setValue(blog.content);
    setCategory(blog.category);
    setMode(newMode);
    setError("");
    setSuccessMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setTitle(""); setValue(""); setCategory("");
    setMode(MODES.CREATE); setSelectedBlog(null);
  };

  const handlePrimaryAction = async () => {
    setError(""); setSuccessMsg("");

    if ((mode === MODES.CREATE || mode === MODES.EDIT) && (!title || !category || !value)) {
      setError("Title, category, and content are required");
      return;
    }

    setLoading(true);
    try {
      const blogData = { title, content: value, category };

      if (mode === MODES.CREATE) await adminApi.createBlog(blogData);
      else if (mode === MODES.EDIT) await adminApi.updateBlog(selectedBlog.id, blogData);
      else if (mode === MODES.PUBLISH) await adminApi.publishBlog(selectedBlog.id);
      else if (mode === MODES.DELETE) await adminApi.deleteBlog(selectedBlog.id);

      const messages = {
        CREATE: "Blog draft created!",
        EDIT: "Blog updated!",
        PUBLISH: "Blog published!",
        DELETE: "Blog deleted!",
      };
      setSuccessMsg(messages[mode]);
      reset();
      fetchBlogs();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const buttonColors = {
    CREATE: "bg-blue-600 hover:bg-blue-700",
    EDIT: "bg-yellow-600 hover:bg-yellow-700",
    PUBLISH: "bg-green-600 hover:bg-green-700",
    DELETE: "bg-red-600 hover:bg-red-700",
  };

  return (
    <div className="p-4 rounded-lg space-y-4">
      {/* Form */}
      <div className="bg-[#050414] border border-gray-700 rounded-xl p-6 space-y-4">
        <h2 className="text-white text-xl font-semibold">
          {mode === MODES.CREATE ? "New Blog" : `${mode}: ${selectedBlog?.title}`}
        </h2>

        {error && (
          <p className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded px-3 py-2">{error}</p>
        )}
        {successMsg && (
          <p className="text-green-400 text-sm bg-green-900/20 border border-green-500/30 rounded px-3 py-2">{successMsg}</p>
        )}

        <input
          type="text"
          placeholder="Blog Title"
          className="bg-transparent border border-white/30 p-3 rounded w-full text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={mode === MODES.DELETE || mode === MODES.PUBLISH}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={mode === MODES.DELETE || mode === MODES.PUBLISH}
          className="w-full p-3 border border-white/30 rounded text-gray-300 bg-[#050414] focus:outline-none focus:border-purple-400"
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
          ))}
        </select>

        <MDEditor
          value={value}
          onChange={setValue}
          height={300}
          readOnly={mode === MODES.DELETE || mode === MODES.PUBLISH}
        />

        <div className="flex gap-3">
          <button
            onClick={handlePrimaryAction}
            disabled={loading}
            className={`${buttonColors[mode]} text-white px-6 py-2 rounded font-medium transition disabled:opacity-50`}
          >
            {loading ? "Processing..." : mode}
          </button>
          {mode !== MODES.CREATE && (
            <button
              onClick={reset}
              className="text-gray-400 hover:text-white px-4 py-2 rounded border border-gray-600 hover:border-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Blog List */}
      <h3 className="text-white text-lg font-semibold mt-6">All Blogs</h3>
      {fetchLoading ? (
        <p className="text-purple-400 animate-pulse">Loading blogs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#050414] border border-gray-700 p-5 rounded-xl text-white space-y-1"
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${blog.status === "PUBLISHED" ? "bg-green-900 text-green-400" : "bg-yellow-900 text-yellow-400"}`}>
                  {blog.status}
                </span>
                <span className="text-xs text-purple-400">{blog.category}</span>
              </div>
              <h3 className="font-semibold text-gray-200 leading-tight">{blog.title}</h3>
              <p className="text-white/50 text-xs">{formatDate(blog.publishedAt)}</p>
              <p className="text-gray-400 text-sm line-clamp-2">{blog.content?.substring(0, 80)}...</p>

              <div className="flex gap-2 mt-3">
                <button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 text-xs rounded transition"
                  onClick={() => handleClick(blog, MODES.EDIT)}
                >Edit</button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs rounded transition"
                  onClick={() => handleClick(blog, MODES.DELETE)}
                >Delete</button>
                {blog.status !== "PUBLISHED" && (
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs rounded transition"
                    onClick={() => handleClick(blog, MODES.PUBLISH)}
                  >Publish</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddBlog;
