// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import api from "../Api/api";

function PostDetail() {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOwnerDetails = async () => {
      // const token = localStorage.getItem("accessToken");
      // console.log(token);
      setLoading(true);
      try {
        // const res = await axios.get(
        //   `http://localhost:4000/api/v1/posts/${postId}`,
        //   {
        //     headers: { Authorization: `Bearer ${token}` },
        //     withCredentials: true,
        //   }
        // );
        const res = await api.get(`/posts/${postId}`);

        console.log("owner details", res.data.data);

        const post = res.data.data;
        if (!post) {
          toast.error("Show imge not available", {
            closeButton: true,
          });
          navigate("/");
          return;
        }

        setPostDetails(post);
      } catch (error) {
        console.error("Error fetching owner details:", error);
        toast.error(error.response?.data?.message || "Failed to fetch post", {
          closeButton: true,
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    getOwnerDetails();
  }, [postId]);

  const handleUserClick = (post) => {
    const logedInUser = localStorage.getItem("user");
    if (!logedInUser) {
      toast.error("Please signIn first!");
      return;
    }
    navigate(`/profile/${post.user._id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="lg:text-4xl text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#eff7ed] pt-[90px] flex flex-col items-center justify-between">
      <div className="w-full flex flex-col lg:flex-row  items-center justify-around gap-5 mb-10 lg:px-7">
        <div className="w-full flex items-center justify-center px-5">
          <img
            src={postDetails.image}
            alt={postDetails.imageName}
            className="lg:h-[70vh] rounded-2xl shadow-lg/40"
          />
        </div>
        <div className="w-[370px] md:w-[95%] lg:w-full md:h-[63.5vh] lg:h-[85vh] flex flex-col gap-6 border-2 border-[#55ff6c] rounded-2xl px-2 lg:pl-4 lg:pr-1 lg:py-1 mt-4 lg:mt-7">
          <h1 className="lg:text-5xl font-semibold text-[#33bd45] text-center italic tracking-wider underline underline-offset-8 mt-2">
            {postDetails.imageName}
          </h1>
          <div
            className="h-[73vh] flex flex-col items-center gap-3 overflow-y-auto"
          >
            <p className="text-[12px] md:text-base lg:leading-7 tracking-wider whitespace-pre-line">
              {" "}
              {postDetails.description}
            </p>
            <div className="flex flex-col gap-1 items-center text-[12px] md:text-[14px] lg:text-[15px] tracking-wider text-fuchsia-900 text-lg font-semibold">
              <p>
                Uploaded on :-{" "}
                {new Date(postDetails.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p onClick={() => handleUserClick(postDetails)} className="">
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
