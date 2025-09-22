import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
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
        <div key={userPost._id} className="">
          <img src={userPost.image} className="w-full h-[48vh] object-cover" />
        </div>
      ))}
    </div>
  );
}

export default Profile;
