import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
function DetailsBlog(){
    const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/read/post/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post details:", err));
  }, [id]);

  if (!post) {
    return <p className="text-center py-10">Loading post details </p>;
  }

    return (
         <div className="min-h-screen bg-gray-50">
      <Header />
       {/* divtaan flex sii comantigaan hoos tiisa  */}
       <div className="max-w-7xl mx-auto py-10 px-6">
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Main Content */}
        <div className="md:col-span-2">
          {/* Sawirka weyn */}
          <img
            src={`http://localhost:7000/AlImages/${post.image}`}
            alt="Blog main"
            className="w-full h-[300px] object-cover rounded-lg mb-6"
          />

          {/* Article content */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              <span className="text-red-500 font-semibold">Lifestyle</span> • Admin • Feb 19, 2025
            </p>
            <h1 className="text-3xl font-bold mb-4">
             {post.title}
            </h1>
            <p className="text-gray-600 leading-relaxed">{post.description}
              Did you come here for something in particular or just general Riker-bashing?
              And blowing into maximum warp speed, you appeared for an instant to be in two
              places at once. We have a saboteur aboard. We know you’re dealing in stolen ore.
              But I wanna talk about the assassination attempt on Lieutenant Worf. Could
              someone survive inside a transporter buffer for 75 years? Fate. It protects
              fools, little children, and ships named “Enterprise.”
            </p>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-8">
          {/* Blog Categories */}
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Blog Categories</h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-gray-700 hover:text-red-500 cursor-pointer">
                <span>Lifestyle</span> <span className="text-sm text-gray-500">(1)</span>
              </li>
              <li className="flex justify-between items-center text-gray-700 hover:text-red-500 cursor-pointer">
                <span>Social Media</span> <span className="text-sm text-gray-500">(1)</span>
              </li>
              <li className="flex justify-between items-center text-gray-700 hover:text-red-500 cursor-pointer">
                <span>Company News</span> <span className="text-sm text-gray-500">(1)</span>
              </li>
              <li className="flex justify-between items-center text-gray-700 hover:text-red-500 cursor-pointer">
                <span>Electronics</span> <span className="text-sm text-gray-500">(1)</span>
              </li>
            </ul>
          </div>

          {/* Latest Blogs */}
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Blogs</h2>
            <div className="space-y-5">
              {/* Blog 1 */}
              <div className="flex items-center gap-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqfapnDEBg7qijQNEBJu171EGbZ0g03YTPaw&s"
                  alt="Blog"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold text-sm hover:text-red-500 cursor-pointer">
                    Lotus Electronics – New Store Launch
                  </h3>
                  <p className="text-xs text-gray-500">Feb 20, 2025</p>
                </div>
              </div>

              {/* Blog 2 */}
              <div className="flex items-center gap-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyDzFwO2giOr7CG5W9rn8YvP-WxINclwg0w&s"
                  alt="Blog"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold text-sm hover:text-red-500 cursor-pointer">
                    Wine Tasting Event Highlights
                  </h3>
                  <p className="text-xs text-gray-500">Feb 15, 2025</p>
                </div>
              </div>

              {/* Blog 3 */}
              <div className="flex items-center gap-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqMGF4KpUTLNS1O0z7sWbF6y438m8TSIgNuA&s"
                  alt="Blog"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold text-sm hover:text-red-500 cursor-pointer">
                    10 French Wine Regions to Visit
                  </h3>
                  <p className="text-xs text-gray-500">Feb 10, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Sidebar */}
      </div>
      </div>
    </div>
    )
}
export default DetailsBlog