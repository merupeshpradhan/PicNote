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
          // Sort latest post first
          const sorted = res.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sorted);
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

    // FIRST FETCH
    fetchPost();
  }, []);

  const handleUserClick = (post) => {
    const signInInUser = localStorage.getItem("user");
    if (!signInInUser) {
      toast.error("Please signIn first!", {
        closeButton: true,
      });
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
        <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-x-5 md:gap-x-6 gap-y-5 md:gap-y-8 p-3.5 md:p-4 2xl:mb-2">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="w-[100px] md:w-[178px] lg:w-[220px] flex items-center flex-col gap-1 md:gap-2 bg-[#daebd5] shadow-lg/60 shadow-[#b7c74e] rounded-xl p-1.5 md:p-3 hover:scale-105 ease-in-out duration-300"
            >
              <img
                src={post.image}
                alt={post.imageName}
                className="h-16 md:h-24 lg:h-32 object-cover rounded-xl cursor-pointer"
                onClick={() => navigate(`/postDetail/${post._id}`)}
              />
              <div className="text-center w-full">
                <p className="text-[10px] md:text-[16px] font-normal md:font-bold mt-0 md:mt-0.5 lg:mt-1 mb-1 text-[#6f53d3] tracking-wider">
                  {post.imageName}
                </p>
                <button
                  onClick={() => handleUserClick(post)}
                  className="flex flex-row md:flex-row items-center-center justify-between gap-1 mx-auto text-[8px] md:text-[11px] lg:text-[11px] tracking-wider text-[#8315a5] sm:font-normal md:font-medium"
                >
                  Posted by :
                  <span className="text-red-5 hover:text-red-600 cursor-pointer sm:font-normal md:font-semibold transition duration-200 underline underline-offset-2">
                    {post.user?.firstName || "Unknown User"}
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
