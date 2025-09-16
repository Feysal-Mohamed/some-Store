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

      <div className="max-w-4xl mx-auto py-10 px-4">
        {/* Image */}
        <img
          src={`http://localhost:7000/AlImages/${post.image}`}
          alt={post.title}
          className="w-full h-96 object-cover rounded-2xl shadow-md"
        />

        {/* Content */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          <p className="text-gray-400 text-sm mt-1">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <p className="text-gray-700 mt-6 leading-relaxed">
            {post.description}
          </p>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos harum ducimus incidunt perferendis neque fuga aliquid dolorum magni aperiam ratione, repudiandae hic amet dolorem suscipit voluptatem libero earum nemo pariatur. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste omnis cupiditate tempore consequatur molestiae necessitatibus inventore quae eveniet praesentium repellat. Optio dolorum nemo quidem debitis amet placeat eum officiis eius natus ex. Recusandae, fugiat. Doloremque tempore saepe soluta fugiat iure inventore minus illo obcaecati voluptatem, totam quasi consectetur laudantium a!</p>
        
      </div>
        
    </div>
    )
}
export default DetailsBlog