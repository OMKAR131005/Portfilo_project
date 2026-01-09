import React from "react";

const Dashboard = () => {
  // dashboardData.js
  const dashboardCards = [
    {
      title: "Total Blogs",
      value: 124,
      description: "Published blogs",
    },
    {
      title: "Users Visited",
      value: 5_432,
      description: "Unique visitors",
    },
    {
      title: "Comments",
      value: 342,
      description: "Total comments",
    },
    {
      title: "Likes",
      value: 1_245,
      description: "Total likes",
    },
  ];

  // blogsData.js
  const blogs = [
    {
      id: 1,
      title: "Understanding React Hooks",
      category: "React",
    },
    {
      id: 2,
      title: "Spring Boot REST API Guide",
      category: "Backend",
    },
    {
      id: 3,
      title: "Tailwind CSS Best Practices",
      category: "CSS",
    },
  ];

  return (
    <>
      <div className="flex-wrap grid  mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className=" bg-[#050414] border border-gray-700 border-2 text-white rounded-lg shadow p-6 flex flex-col items-center shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-3xl font-bold mb-1">
              {card.value.toLocaleString()}
            </p>
            <p className="text-gray-400">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#050414] border border-gray-700 border-2 text-white rounded-lg shadow p-6">
        <table className="w-full border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-300 border border-gray-700">
            <tr>
              <th className="text-left px-4 py-3 text-lg font-semibold text-black">
                Blog Title
              </th>
              <th className="text-left px-4 py-3 text-lg font-semibold text-black ">
                Category
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-t bg-gray-300 transition">
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                  {blog.title}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                  {blog.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button className="mt-4 bg-gradient-to-r from-[#8245ec] to-[#a855f7] text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            Add blog
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
