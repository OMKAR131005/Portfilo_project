import React, { useEffect } from "react";
// import { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
// import React from 'react';
const AddBlog = () => {
    const MODES = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  PUBLISH: "PUBLISH",
  DELETE: "DELETE",
};
  //  const [content, setContent] = useState("");npm
  const [value, setValue] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState(MODES.CREATE);
  const [selectedBlog, setSelectedBlog] = useState(null);

  
  const handleClick = (blog,Mode) => {
    setSelectedBlog(blog);
    setTitle(blog.title);
    setValue(blog.content);
    setCategory(blog.category);
    setMode(Mode); // Change mode to EDIT when a blog is selected
  };
  const afterSuccess = () => {
  // fetchBlogs();
  setTitle("");
  setValue("");
  setCategory("");
  setMode(MODES.CREATE);
  setSelectedBlog(null);
};



// CREATE | EDIT | DELETE | PUBLISH
const handlePrimaryAction = async () => {
  try {
    let response;

    const blogData = {
      title: title,
      content: value,
      category: category,
    };

    if (mode === MODES.CREATE) {
      if (!title || !category || !value) {
        alert("Title, Category and Content are required");
        return;
      }
      response = await fetch("http://localhost:8080/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
    }

    else if (mode === MODES.EDIT) {
      if (!title || !category || !value) {
    alert("Title, Category and Content are required");
    return;
  }

      response = await fetch(
        `http://localhost:8080/api/admin/updateBlog/${selectedBlog.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        }
      );
    }

    else if (mode === MODES.PUBLISH) {
      console.log("Deleting blog with ID:", selectedBlog.id);
      
      response = await fetch(
        `http://localhost:8080/api/admin/publish/${selectedBlog.id}`,
        {
          method: "GET",
        }
      );
    }

    else if (mode === MODES.DELETE) {
      console.log("Deleting blog with ID:", selectedBlog.id);
      
      response = await fetch(
        `http://localhost:8080/api/admin/delete/${selectedBlog.id}`,
        {
          method: "DELETE",
        }
      );
    }

    if (!response || !response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    console.log("Success:", data);

    afterSuccess();
  } catch (error) {
    console.error("Error:", error.message);
  }
};


  // const categories = ["Backend", "Frontend", "React", "DSA", "System Design"];
  const categories = ["TECH", "BACKEND", "FRONTEND", "DSA", "SYSTEM_DESIGN","DSP"];


  // const formattedDate = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/getAllBlog")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-800 bg-transparent p-4 rounded-lg">
      <input
        type="text"
        placeholder="Blog Title"
        className="bg-transparent border border-white p-2 rounded w-full mb-4 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={category}
        
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded w-full mb-4 text-gray-300  border-white"
      >
        <option value="" className="text-black">Select Category</option>

        {categories.map((cat) => (
          <option key={cat} value={cat} className="bg-gray-800 text-white text-md font-medium"> 
            {cat}
          </option>
        ))}
      </select>

      {/* <MDEditor value={value} onChange={setValue} height={300}  readOnly={mode === "DELETE"||"PUBLISH"} /> */}
            <MDEditor
              value={value}
              onChange={setValue}
              height={300}
              readOnly={mode === MODES.DELETE || mode === MODES.PUBLISH}
            />

      <button className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600" onClick={handlePrimaryAction}>{mode}</button>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
           
            className="bg-gray-600 hover:bg-gray-900 backdrop-blur-md p-6 rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
          >
            <h3 className="text-1xl font-semibold text-gray-300 mb-2">
              {blog.title}
            </h3>
            <span className="text-white font-sm text-sm">
              Author: Omkar Gawande
            </span>
            <p className="text-white font-sm mt-1 text-sm mb-2 text-sm">
              published At: {blog.publishedAt}
            </p>
            <p className="text-white font-sm text-sm mt-1 mb-2 ">
              Category: {blog.category}
            </p>
            <p className="text-gray-400">{blog.content.substring(0, 60)}...</p>
            <div className="flex justify-between space-x-2 mt-2">
            <button className="bg-blue-500 text-white px-4 py-2 text-sm  rounded hover:bg-blue-600" onClick={()=>handleClick(blog, MODES.EDIT)}>Edit</button>
            
            <button className="bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600" onClick={() => handleClick(blog, MODES.DELETE)}>Delete</button>
            {
              blog.status!= "PUBLISHED" && <button className="bg-green-500 text-sm text-white px-4 py-2 rounded hover:bg-green-600" onClick={()=>handleClick(blog,MODES.PUBLISH)}>Publish</button>
            }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlog;


