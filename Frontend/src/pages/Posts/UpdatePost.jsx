// import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import api from "../Api/api";

function UpdatePost() {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    image: null,
    imageName: "",
    description: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // const res = await axios.get(
        //   `http://localhost:4000/api/v1/posts/${postId}`
        // );
        const res = await api.get(`/posts/${postId}`);

        const post = res.data.data;
        // console.log(post);

        setFormData({
          image: null,
          imageName: post.imageName,
          description: post.description,
        });

        setPreview(post.image);
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching post");
        console.error("Error fething post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    if (formData.image) {
      data.append("image", formData.image);
    }
    data.append("imageName", formData.imageName);
    data.append("description", formData.description);

    try {
      // const res = await axios.put(
      //   `http://localhost:4000/api/v1/posts/${postId}`,
      //   data,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //     withCredentials: true,
      //   }
      // );
      const res = await api.put(`/posts/${postId}`, data);


      const post = res.data.data;
      if (post?.user?._id) {
        navigate(`/userDetials/${post.user._id}`);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error updating post");
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] bg-blue-50 flex flex-col justify-between items-center gap-12 pt-25">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="Image-input-and-view flex gap-5 items-center ">
          <div className="image-view xl:h-[35vh] xl:w-[15vw] rounded-md border flex justify-center items-center overflow-hidden">
            {preview && (
              <img
                src={preview}
                alt="Image preview"
                className="w-full h-[350px] object-cover"
              />
            )}
          </div>
          <div className="image-input">
            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-yellow-500 rounded-full p-2.5 transition duration-200 w-[8vw] font-semibold text-white hover:bg-yellow-900 cursor-pointer"
            >
              Change image
            </button>
            <input
              id="fileInput"
              className="hidden"
              type="file"
              name="image"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="Image-name-with-description">
          <div className="flex flex-col gap-3">
            {/* Image Name */}
            <input
              type="text"
              name="imageName"
              placeholder="Image name"
              value={formData.imageName}
              onChange={handleChange}
              className="border w-[24vw] xl:py-2 px-3 font-semibold rounded-md outline-0"
            />
            {/* Description */}
            <textarea
              name="description"
              placeholder="Write description..."
              value={formData.description}
              onChange={handleChange}
              className="border px-3 p-2 rounded-md outline-none h-24 resize-none"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-green-400 xl:px-6 xl:py-1.5 hover:bg-green-800 rounded transition duration-200 font-semibold tracking-wider text-lg text-white cursor-pointer">
            {loading ? "Processing" : "Update"}
          </button>
        </div>
      </form>
      <div className="z-50 w-full">{!hideLayout && <Footer />}</div>
    </div>
  );
}

export default UpdatePost;
