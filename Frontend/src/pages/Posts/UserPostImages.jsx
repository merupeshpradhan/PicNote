// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import api from "../Api/api";
// import api from "../../utils/axiosInstance";

function UserPostImages() {
  const { userId } = useParams(); // get userId from URL
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  const getUserPost = async () => {
    // const token = localStorage.getItem("accessToken");
    try {
      // const res = await api.get(`/posts/user/${userId}`);
      // const res = await axios.get(
      //   `http://localhost:4000/api/v1/posts/user/${userId}`,
      //   { withCredentials: true }
      // );
      const res = await api.get(`/posts/user/${userId}`);

      setUserPosts(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    getUserPost();
  }, [userId]);

  // const userFromStorage = localStorage.getItem("user");
  // let loggedInUserId = null;

  // if (userFromStorage) {
  //   try {
  //     const loggedInUser = JSON.parse(userFromStorage);
  //     loggedInUserId = loggedInUser?._id || loggedInUser?.id;
  //   } catch (error) {
  //     console.log("Error Analysis user:", error);
  //   }
  // }

  return (
    <div className="w-full  items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5 pt-[160px] lg:pt-[85px] md:pl-[32vw] lg:pl-[48vh] mt-[85px] lg:mt-0">
      {userPosts.map((userPost) => (
        <div
          key={userPost._id}
          className="lg:w-[280px] flex flex-col items-center bg-[#cee7b9] shadow-md rounded-2xl p-3"
        >
          <img
            src={userPost.image}
            onClick={() => navigate(`/postDetail/${userPost._id}`)}
            className="h-[350px] md:h-[200px] object-cover rounded-xl cursor-pointer"
          />
          <p className="text-xl font-bold mt-2 text-[#6f53d3]">
            {userPost.imageName}
          </p>
          <div
            onClick={() => navigate(`/postDetail/${userPost._id}`)}
            className="w-full flex flex-col gap-1.5 cursor-pointer"
          >
            <p className="text-[#c5550b] ml-2">
              <span className="w-full text-start text-[#035310] mr-1 underline decoration-dotted underline-offset-4 text-[15px]">
                {" "}
                Image Detials
              </span>
              :-
            </p>
            <div className="flex items-center justify-center gap-2 mt- ml-2">
              <div className="text-[#035310]">
                <FaArrowRight size={13} />
              </div>
              <p className="w-full text-[10px] font-medium truncate tracking-widest">
                {userPost.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPostImages;
