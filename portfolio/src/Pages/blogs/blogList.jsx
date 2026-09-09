
import React from 'react'
import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MDEditor from "@uiw/react-md-editor";


const BlogList = () => {
  const navigate=useNavigate();
    const handleclik=(id)=>{
      navigate(`/blogs/${id}`);
        alert(`Blog clicked! More details coming soon.${id}`);
        
    }
    const[blogs, setBlogs] = useState([]);
    const[todayBlogs, setTodayBlogs] = useState({});  

    

// const formattedDate = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;


  

     useEffect(() => {

        fetch('http://localhost:8080/public/api/getPublishBlogs')
        .then(res => res.json())
        .then(data => setBlogs(data))
        .catch(err => console.log(err));

        
    }, [])


useEffect(() => {
  const d = new Date();
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  fetch(`http://localhost:8080/public/api/date/${date}`)
    .then(res => res.json())
    .then(data => setTodayBlogs(data[data.length - 1]))
    .catch(err => console.error(err)); 
}, []);


 console.log(blogs);

    if(blogs.length==0&&todayBlogs.length==0){
        return <div className='text-white pt-20 text-center'>Loading...</div>
    }
    console.log(todayBlogs);

  return (
    
   <section id='blogs'
        className='py-24 pb-24 px-[12vw] md:px-[7vw] lg:px[16vw] font-sans'>
        <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white'>Blogs</h2>
            <div className='w-32 h-1 bg-purple-500 mx-auto mt-4'></div>
            <p className='text-gray-400 mt-4 text-lg font-semibold'>
                Read my latest blogs on web development, programming, and technology trends.
            </p>
        </div>
        {todayBlogs && (
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

)}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={()=>handleclik(blog.id)}
              className="bg-gray-600 hover:bg-gray-900 backdrop-blur-md p-6 rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
            >
              <h3 className="text-1xl font-semibold text-gray-300 mb-2">{blog.title}</h3>
              <span className="text-white font-sm text-sm">Author: Omkar Gawande</span>
              <p className="text-white font-sm mt-1 text-sm mb-2 text-sm">published At: {blog.publishedAt}</p>
              <p className='text-white font-sm text-sm mt-1 mb-2 '>Category: {blog.category}</p>
              <p className="text-gray-400">{blog.content.substring(0, 60)}...</p>
            </div>
            ))}
        </div>
    </section>
  )
}

export default BlogList