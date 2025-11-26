import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function UserPostImages() {
  const { userId } = useParams(); // get userId from URL
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

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
    <div className="w-full min-h-[100vh] bg-indigo-50 items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5 pt-[160px] lg:pt-[85px] md:pl-[32vw] lg:pl-[48vh] mt-[85px] lg:mt-0">
      {userPosts.map((userPost) => (
        <div
          key={userPost._id}
          className="lg:w-[280px] flex flex-col items-center bg-white shadow-md rounded-2xl p-3"
        >
          <img
            src={userPost.image}
            onClick={() => navigate(`/postDetail/${userPost._id}`)}
            className="w-full h-[350px] md:h-[200px] object-cover rounded-xl cursor-pointer"
          />
           <p className="text-xl font-bold mt-2">{userPost.imageName}</p>
         <div className="w-full flex flex-col gap-1.5">
          <p className="w-full text-start text-yellow-600 underline decoration-wavy underline-offset-4 text-[14px]">Image Detials</p>
          <p className="w-full text-sm font-medium truncate">
            <span className="text-[12px]">{userPost.description}</span>
          </p>
         </div>
        </div>
      ))}
    </div>
  );
}

export default UserPostImages;
