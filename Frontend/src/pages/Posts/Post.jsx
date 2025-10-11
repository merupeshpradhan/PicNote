import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/posts");
        console.log("Posts response", res);

        if (res.data.data) {
          setPosts(res.data.data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleUserClick = (post) => {
    const logedInUser = localStorage.getItem("user");
    if (!logedInUser) {
      toast.error("Please log in first!");
      return;
    }
    navigate(`/profile/${post.user._id}`);
  }; 

  if (loading) {
    return <div className="text-center mt-10">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!posts.length) {
    return <div className="text-center mt-10">No post available.</div>;
  }

  return (
    <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {posts.map((post) => (
        <div key={post._id} className="flex flex-col items-center gap-2">
          <img
            src={post.image}
            alt={post.imageName}
            className=" h-[48vh] object-cover"
          />
          <p className="text-xl font-semibold">{post.imageName}</p>
          <button onClick={() => handleUserClick(post)} className="flex gap-1">
            Posted by:
            <h1 className="text-blue-500 hover:text-blue-700 cursor-pointer">
              {post.user.userName}
            </h1>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Post;
