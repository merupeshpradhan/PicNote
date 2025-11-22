import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PostDetail() {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getOwnerDetails = async () => {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/posts/${postId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        console.log("owner details", res.data.data);

        const post = res.data.data;
        if (post) {
          setPostDetails(post);
        }
      } catch (error) {
        console.error("Error fetching owner details:", error);
      }
    };

    getOwnerDetails();
  }, [postId]);

  const handleUserClick = (post) => {
    const logedInUser = localStorage.getItem("user");
    if (!logedInUser) {
      toast.error("Please log in first!");
      return;
    }
    navigate(`/profile/${post.user._id}`);
  };

  if (!postDetails) {
    return (
      <div className="text-center mt-20 text-3xl">Loading post details...</div>
    );
  }

  return (
    <div className="bg-indigo-50 lg:pt-[90px] flex flex-col items-center justify-between">
      <div className="w-full flex  items-cente justify-around gap-5 mb-10 lg:px-7">
        <div className="w-[70vw]">
          <img
            src={postDetails.image}
            alt={postDetails.imageName}
            className="w-full h-[85vh] rounded-2xl shadow-lg/40 "
          />
        </div>

        <div className="w-full h-[85vh] flex flex-col gap-6 border-2 border-indigo-900 rounded-2xl pl-4 pr-1 py-1">
          <h1 className="text-5xl font-semibold text-fuchsia-800 text-center italic tracking-wider underline underline-offset-8">
            {postDetails.imageName}
          </h1>
          <div
            className="h-[73vh] flex flex-col items-center gap-3 overflow-y-auto 
          "
          >
            <h3 className="font-medium text-base/7 text-indigo-700 italic tracking-wider">
              {postDetails.description}
            </h3>
            <div className="flex flex-col gap-2 items-center text-indigo-900 text-lg font-semibold">
              <p>
                Uploaded on :-{" "}
                {new Date(postDetails.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p
                onClick={() => handleUserClick(postDetails)}
              >
                Post By :-{" "}
                <span className="cursor-pointer hover:text-red-400 underline underline-offset-2">
                  {postDetails.user.firstName} {postDetails.user.lastName}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostDetail;
