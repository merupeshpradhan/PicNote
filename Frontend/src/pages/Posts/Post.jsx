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
        setError(err.response?.data?.message)
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
    return <div className="text-center mt-10 text-3xl">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500 text-3xl">{error}</div>;
  }

  if (!posts.length) {
    return <div className="text-center mt-10 text-3xl">No post available.</div>;
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-10 gap-y-10 p-5">
      {posts.map((post) => (
        <div
          key={post._id}
          className="xL:w-[380px] flex flex-col items-center gap-2 bg-white shadow-md rounded-2xl p-3"
        >
          <img
            src={post.image}
            alt={post.imageName}
            className="w-full h-[350px] object-cover rounded-xl"
          />
          <p className="text-lg font-semibold mt-2">{post.imageName}</p>
          <button onClick={() => handleUserClick(post)} className="flex gap-1">
            Posted by:
            <h1 className="text-blue-500 hover:text-blue-700 cursor-pointer">
              {post.user.userName}
            </h1>
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Post;
