// import axios from "axios";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Api/api";

function Post({ postData }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // const res = await axios.get("http://localhost:4000/api/v1/posts");
        const res = await api.get("/posts");
        console.log("Posts response", res);

        if (res.data.data) {
          setPosts(res.data.data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.response?.data?.message);
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
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="lg:text-4xl text-red-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-3xl">{error}</div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center text-3xl font-semibold mt-10 cursor-default">
        No post available.
      </div>
    );
  }

  const filteredPosts = posts.filter((post) =>
    (post.imageName || "")
      .toLowerCase()
      .includes((postData || "").toLowerCase())
  );

  return (
    <div className="w-full flex justify-center items-center">
      {filteredPosts.length === 0 ? (
        <h2 className="text-center text-2xl font-semibold text-red-500 w-full mt-10">
          No image found with this name
        </h2>
      ) : (
        <div className="w-full flex md:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-5 md:gap-x-5 gap-y-5 md:gap-y-8 p-3.5 md:p-4 2xl:mb-2">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="w-[170px] lg:w-[220px] flex items-center flex-col gap-2 bg-white shadow-md/30 rounded-2xl p-3 hover:scale-105 ease-in-out duration-300"
            >
              <img
                src={post.image}
                alt={post.imageName}
                className="h-32  object-cover rounded-xl cursor-pointer"
                onClick={() => navigate(`/postDetail/${post._id}`)}
              />
              <div className="text-center w-full">
                <p className="text-sm md:text-md font-bold mt-1 mb-1.5 text-indigo-900 tracking-wider">
                  {post.imageName}
                </p>
                <button
                  onClick={() => handleUserClick(post)}
                  className="flex flex-col md:flex-row items-center-center justify-between gap-1 mx-auto text-[10px] tracking-wider text-fuchsia-900 font-semibold"
                >
                  Posted by :
                  <span className="text-red-5 hover:text-red-600 cursor-pointer font-semibold transition duration-200 underline underline-offset-2">
                    {post.user.firstName} {post.user.lastName}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
