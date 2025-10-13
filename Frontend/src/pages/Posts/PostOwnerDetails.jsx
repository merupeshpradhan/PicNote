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
    <div className="fixed bg-blue-200  w-[14.5%] h-[100vh] pt-[60px]">
      <div
        key={ownerDetails._id}
        className="flex flex-col items-center mt-[3vh] gap-3"
      >
        <img
          src={ownerDetails.avatar}
          alt={ownerDetails.userName}
          className="w-[50%] rounded-md"
        />
        <h1>{ownerDetails.userName}</h1>
        <p>{ownerDetails.email}</p>
      </div>

      <NavLink
        to={"/"}
        className="border rounded-sm px-3 py-1 text-green-500 hover:bg-green-500 hover:text-white font-bold transition duration-200"
      >
        Go to Home
      </NavLink>
    </div>
  );
}

export default PostOwnerDetails;
