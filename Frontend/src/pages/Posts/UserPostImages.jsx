import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Footer from "../../components/Footer";

function UserPostImages() {
  const { userId } = useParams(); // get userId from URL
  const [userPosts, setUserPosts] = useState([]);

  const getUserPost = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/posts/user/${userId}`,
        { headers: { Authorization: `Beare ${token}` }, withCredentials: true }
      );
      setUserPosts(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    getUserPost();
  }, [userId]);

  // DELETE handler
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`http://localhost:4000/api/v1/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      alert("Post deleted successfully!");

      // remove deleted post from the state
      setUserPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting post");
      console.log(error);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5flex gap-5 p-5 pt-[80px] pl-[33vh]">
      {userPosts.map((userPost) => (
        <div key={userPost._id} className="flex flex-col gap-3 items-center">
          <img src={userPost.image} className="w-full h-[48vh] object-cover" />
          <p>{userPost.imageName}</p>
          <p>{userPost.description}</p>
          <div className="flex gap-5">
            <NavLink
              to={`/update/${userPost._id}`}
              className="border rounded-sm px-3 py-1 text-yellow-500 hover:bg-yellow-500 hover:text-white font-bold transition duration-200"
            >
              Update post
            </NavLink>
            <button
              onClick={() => handleDelete(userPost._id)}
              className="border rounded-sm px-3 py-1 text-red-500 hover:bg-red-500 hover:text-white font-bold transition duration-200 cursor-pointer"
            >
              Delete
            </button>
            <NavLink
              to={"/"}
              className="border rounded-sm px-3 py-1 text-green-500 hover:bg-green-500 hover:text-white font-bold transition duration-200"
            >
              Go to Home
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPostImages;
