import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function UserPostImages() {
  const { userId } = useParams(); // get userId from URL
  const [userPosts, setUserPosts] = useState([]);

  const getUserPost = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/v1/posts/user/${userId}`
    );
    setUserPosts(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    getUserPost();
  }, [userId]);

  return (
    <div className=" flex gap-5 p-5">
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
            <button className="border rounded-sm px-3 py-1 text-red-500 hover:bg-red-500 hover:text-white font-bold transition duration-200 cursor-pointer">
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
