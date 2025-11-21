import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function UserPostImages() {
  const { userId } = useParams(); // get userId from URL
  const [userPosts, setUserPosts] = useState([]);

  const getUserPost = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/posts/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
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

  const userFromStorage = localStorage.getItem("user");
  let loggedInUserId = null;

  if (userFromStorage) {
    try {  
      const loggedInUser = JSON.parse(userFromStorage);
      loggedInUserId = loggedInUser?._id || loggedInUser?.id;
    } catch (error) {
      console.log("Error Analysis user:", error);
    }
  }

  return (
    <div className="w-full min-h-[100vh] bg-green-50  items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5 pt-[160px] lg:pt-[85px] md:pl-[32vw] lg:pl-[50vh] mt-[85px] lg:mt-0">
      {userPosts.map((userPost) => (
        <div
          key={userPost._id}
          className="lg:w-[250px] flex flex-col gap-1 items-center bg-white shadow-md rounded-2xl p-3"
        >
          <img
            src={userPost.image}
            className="w-full h-[350px] md:h-[250px] object-cover bject-cover rounded-xl"
          />
          <p>{userPost.imageName}</p>
          <p>{userPost.description}</p>
          {/* Show Update/Delete only if current user is owner */}
          {userPost.user?._id === loggedInUserId && (
            <div className="flex gap-3 mt-3">
              <div className="flex justify-between gap-5">
                <NavLink
                  to={`/update/${userPost._id}`}
                  className="border rounded-sm px-3 py-1 text-yellow-500 hover:bg-yellow-500 hover:text-white font-bold transition duration-200"
                >
                  Update post
                </NavLink>
              </div>
              <button
                onClick={() => handleDelete(userPost._id)}
                className="border rounded-sm px-3 py-1 text-red-500 hover:bg-red-500 hover:text-white font-bold transition duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserPostImages;
