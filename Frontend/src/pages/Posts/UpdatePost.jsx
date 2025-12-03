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
        window.scrollTo(0, 0);
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
    <div className="min-h-screen bg-blue-50 flex flex-col justify-between items-center gap-12 pt-25">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="w-full flex justify-center items-center gap-5">
          <div className="Image-input-and-view flex gap-5 items-center ">
            <div className="image-view  w-[40vw] h-[23vh] md:h-[70vh] rounded-md border flex justify-center items-center overflow-hidden">
              {preview && (
                <img
                  src={preview}
                  alt="Image preview"
                  className="w-full max-h-[350px] object-cover"
                />
              )}
            </div>
          </div>
          <div className="Image-name-with-description">
            <div className="flex items-center justify-center flex-col gap-3">
              {/* Image input */}
              <div className="image-input">
                <button
                  type="button"
                  onClick={() => document.getElementById("fileInput").click()}
                  className="bg-yellow-700 rounded-full py-2  transition duration-200 w-[7.5vw] text-[12px] font-semibold tracking-widest text-white hover:bg-yellow-900 cursor-pointer"
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
                className="w-[50vw] h-[50vh] border px-3 p-2 rounded-md outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="w-[13vw] bg-green-700 xl:px-6 xl:py-1 hover:bg-green-800 rounded transition duration-200 font-semibold tracking-widest text-lg text-white cursor-pointer">
            {loading ? "Processing" : "Update"}
          </button>
        </div>
      </form>
      <div className="z-50 w-full">{!hideLayout && <Footer />}</div>
    </div>
  );
}

export default UpdatePost;
