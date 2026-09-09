import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { publicApi } from "../../utils/api";
import "../../markdown.css";

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    publicApi
      .getBlogById(id)
      .then(setBlog)
      .catch(() => setError("Blog not found or not yet published."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-400 text-xl animate-pulse">
        Loading...
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-lg">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="text-purple-400 hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="px-[7vw] md:px-[15vw] lg:px-[20vw] py-8 pb-24">
      <button
        onClick={() => navigate(-1)}
        className="text-purple-400 hover:underline mb-6 block"
      >
        ← Back
      </button>

      <div className="bg-gray-900 bg-transparent backdrop-blur-md p-8 rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]">
        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block">
          {blog.category}
        </span>

        <h1 className="text-3xl font-bold text-white mb-4">{blog.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-6 border-b border-white/10 pb-4">
          <span>By <span className="text-white font-medium">Omkar Gawande</span></span>
          <span>Published: <span className="text-white font-medium">{formatDate(blog.publishedAt)}</span></span>
        </div>

        <div data-color-mode="dark">
          <MDEditor.Markdown source={blog.content || ""} className="markdown-body" />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
