import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";

function PostDetail() {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);

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

  if (!postDetails) {
    return (
      <div className="text-center mt-20 text-3xl">Loading post details...</div>
    );
  }

  return (
  <div>
     <div className="lg:mt-28 flex items-center justify-around gap-5 mb-10">
      <div className="imageName_and_imageDescription flex flex-col items-center gap-5">
        <h1>{postDetails.imageName}</h1>
        <h3>{postDetails.description}</h3>
        <p>
          {postDetails.user.firstName} {postDetails.user.lastName}
        </p>
        <p>{postDetails.updatedAt}</p>
      </div>
      <div className="w-[45vw]">
        <img src={postDetails.image} alt={postDetails.imageName} className="w-full h-[80vh]" />
      </div>
    </div>
    <Footer/>
  </div>
  );
}

export default PostDetail;
