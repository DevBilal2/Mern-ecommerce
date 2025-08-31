import React from "react";
import blog1 from "../../assets/blog1.webp";
import blog2 from "../../assets/blog2.webp";

const BlogSection = () => {
  const blogArray = [
    {
      image: blog2,
      title: "Achieving excellence through thought customized solutions",
      description:
        "We are excited to hear from you! Whether you’re looking for strategic insights, customized solu...",
      date: "2025-02-01",
    },
    {
      image: blog1,
      title: "Achieving excellence through thought customized solutions",
      description:
        "We are excited to hear from you! Whether you’re looking for strategic insights, customized solu...",
      date: "2025-02-01",
    },
    {
      image: blog2,
      title: "Achieving excellence through thought customized solutions",
      description:
        "We are excited to hear from you! Whether you’re looking for strategic insights, customized solu...",
      date: "2025-02-01",
    },
    {
      image: blog1,
      title: "Achieving excellence through thought customized solutions",
      description:
        "We are excited to hear from you! Whether you’re looking for strategic insights, customized solu...",
      date: "2025-02-01",
    },
  ];

  return (
    <div className="mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">From the Blog</h1>

      {/* Blog Container - Scrollable on Small Screens */}
      <div className="scrollbar-hidden flex space-x-4 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4  gap-4">
        {blogArray.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col gap-3 overflow-hidden p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition 
            min-w-[80%] sm:min-w-[45%] md:min-w-0 w-full"
          >
            {/* Blog Image */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:rotate-1"
              />
              {/* Date Badge */}
              <p className="absolute top-2 right-2 px-3 py-1 text-xs rounded-md text-white bg-red-600">
                {item.date}
              </p>
            </div>

            {/* Blog Content */}
            <h2 className="cursor-pointer font-bold text-lg hover:text-red-600">
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm">{item.description}</p>

            {/* Read More */}
            <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
              Read more &gt;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
