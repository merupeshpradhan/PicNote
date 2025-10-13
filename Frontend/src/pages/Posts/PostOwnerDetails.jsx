import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function PostOwnerDetails() {
  const { userId } = useParams();
  const [ownerDetails, setOwnerDetails] = useState(null);

  useEffect(() => {
    const getOwnerDetails = async () => {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/posts/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        // console.log("owner details", res.data.data);

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
    <div className="fixed flex flex-col  justify-between bg-red-50 w-[14.5%] h-[100vh] pt-[60px]">
      <div
        key={ownerDetails._id}
        className="flex flex-col items-center mt-[3vh] gap-3"
      >
        <img
          src={ownerDetails.avatar}
          alt={ownerDetails.userName}
          className="w-[50%] rounded-md"
        />
        <div className="flex flex-col items-center gap-1">
          <h1 className="xl:text-3xl text-yellow-800 font-bold">
            {ownerDetails.userName}
          </h1>
          <p className="xl:text-sm tracking-wider text-yellow-950 font-semibold">
            {ownerDetails.email}
          </p>
        </div>
        <NavLink
          to={"/"}
          className="border border-green-500 rounded-sm  px-4 py-1 text-green-500 hover:bg-green-500 hover:text-white font-bold transition duration-200 mt-[20px]"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  );
}

export default PostOwnerDetails;
