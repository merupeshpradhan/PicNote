// import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../Api/api";
// import api from "../../utils/axiosInstance";

function PostOwnerDetails() {
  const { userId } = useParams();
  const [ownerDetails, setOwnerDetails] = useState(null);

  useEffect(() => {
    const getOwnerDetails = async () => {
      // const token = localStorage.getItem("accessToken");
      // console.log(token);
      try {
        // const res = await api.get(`/posts/user/${userId}`);
        // const res = await axios.get(
        //   `http://localhost:4000/api/v1/posts/user/${userId}`,
        //   {
        //     withCredentials: true,
        //   }
        // );
        const res = await api.get(`/posts/user/${userId}`);
        console.log("owner details", res.data.data);

        const post = res.data.data;
        if (post.length > 0) {
          setOwnerDetails(post[0].user);
        }
      } catch (error) {
        console.error("Error fetching owner details:", error);
      }
    };

    getOwnerDetails();
  }, [userId]);

  if (!ownerDetails) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="fixed flex flex-col justify-between bg-[#d8e9d3] w-full h-[21.5vh] rounded-2xl md:rounded-none shadow-lg shadow-indigo-600 z-20 md:w-[30%] lg:w-[20%] md:h-[100vh] pt-[38px] md:pt-[75px]">
      <div className="flex md:flex-col justify-center items-center mt-[3vh] gap-10 md:gap-3">
        <img
          src={ownerDetails.avatar}
          alt={`${ownerDetails.firstName} ${ownerDetails.lastName}`}
          className="w-[20%] md:w-[50%] lg:w-[80%] lg:h-[40vh] rounded-md"
        />
        <div className="flex flex-col gap-1">
          <h1>
            <span className="text-[#035310]"> Name :-</span>{" "}
            <span className="md:text-2xl lg:text-xl text-[#0fac29] font-bold tracking-wider">
              {ownerDetails.firstName} {ownerDetails.lastName}
            </span>
          </h1>
          <p>
            <span className="text-[#035310]"> Email :- </span>
            <span className="text-[12px] text-[#065313] md:text-[14px] tracking-wider">
              {ownerDetails.email}
            </span>
          </p>
          <NavLink
            to={"/"}
            className="border border-green-500 rounded-sm block md:hidden text-[12px] px-4 py-1 text-green-500 hover:bg-green-500 hover:text-white font-bold transition duration-200 mt-0.5"
          >
            Go to Home
          </NavLink>
        </div>
        <NavLink
          to={"/"}
          className="border border-green-500 rounded-sm hidden md:block text-[12px] lg:text-[14px] lg:px-3 mt-[20px] md:mt-[10px] lg:mt-0 py-1 text-green-500 hover:bg-green-500 hover:text-white font-bold transition duration-200"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  );
}

export default PostOwnerDetails;
