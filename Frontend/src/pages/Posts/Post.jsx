import axios from "axios";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
    return <div className="text-center mt-10 text-3xl">No post available.</div>;
  }

  return (
    <div>
      <div className="w-full flex md:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-x-10 gap-y-5 md:gap-y-10 p-3.5 md:p-5 2xl:mt-2 2xl:mb-2">
        {posts.map((post) => (
          <div
            key={post._id}
            className="w-[170px] lg:w-[290px] flex flex-col gap-2 bg-white shadow-md rounded-2xl p-3"
          >
            <img
              src={post.image}
              alt={post.imageName}
              className="w-full lg:h-[208px] object-cover rounded-xl cursor-pointer"
              onClick={() => navigate(`/postDetail/${post._id}`)}
            />
            <div className="text-center">
              <p className="text-sm md:text-lg font-bold mt-1 mb-1.5">
                {post.imageName}
              </p>
              <button
                onClick={() => handleUserClick(post)}
                className="flex flex-col md:flex-row justify-center gap-1 mx-auto text-sm"
              >
                Posted by :
                <span className="text-blue-500 hover:text-blue-700 cursor-pointer font-semibold transition duration-200">
                  {post.user.firstName} {post.user.lastName}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
