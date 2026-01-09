
import { useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import { useState } from 'react';
// import ReactMarkdown from "react-markdown";
import "../../index.css";

import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import "../../markdown.css";
import MDEditor from "@uiw/react-md-editor";






const BlogDetail = () => {  
  const [todayBlogs, setBlogs] = useState({});

  const { id } = useParams();
  useEffect(() => { 
    fetch(`http://localhost:8080/api/blog/getBlogById/${id}`)

    .then(res => res.json())
    .then(data => setBlogs(data))
    .catch(err => console.log(err));
    console.log(todayBlogs);
}, []);

  return (
    <div
  className="bg-gray-900 bg-transparent backdrop-blur-md p-6 rounded-2xl 
             border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] 
             mb-12 max-h-[75vh] overflow-y-auto"
>
  <h3 className="text-2xl font-semibold text-gray-300 mb-2 text-center">
    {todayBlogs.title}
  </h3>

  <span className="text-white font-medium text-md">
    Author: Omkar Gawande
  </span>

  <p className="text-white font-medium mt-1 mb-4 text-md">
    Published At: {todayBlogs.publishedAt}
  </p>

  <p className="text-white font-medium mt-1 mb-4">
    Category: {todayBlogs.category}
  </p>

 <div data-color-mode="dark">
  <MDEditor.Markdown
    source={todayBlogs.content || ""}
    className="markdown-body"
  />
</div>

</div>
  )
}

export default BlogDetail