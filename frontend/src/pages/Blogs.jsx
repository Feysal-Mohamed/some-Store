import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    axios
      .get("http://localhost:7000/read/post")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar/Header */}
      <Header />

      {/* Page Title */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">Our Blog</h1>
        <p className="text-gray-600 mt-2">Discover articles, tips, and insights</p>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image from backend */}
              <img
                src={`http://localhost:7000/AlImages/${post.image}`}
                alt={post.title}
                className="w-full h-56 object-cover"
                
              />
            {console.log(post.image)}
              {/* Content */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>
                <p className="text-gray-400 text-xs">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No posts available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
