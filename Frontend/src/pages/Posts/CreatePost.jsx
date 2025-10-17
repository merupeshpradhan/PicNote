import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import { FaRegImage } from "react-icons/fa";

function CreatePost() {
  const [ImagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  const handlePostCreation = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("imageName", imageName);
      formData.append("description", description);

      const token = localStorage.getItem("accessToken");

      await axios.post("http://localhost:4000/api/v1/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("User post create successfully");

      alert("You successfully create post");
      navigate("/");

      setImage("");
      setImageName("");
      setDescription("");
    } catch (error) {
      // toast.error("Please log in first to create a post.");
      toast.error(error.response?.data?.message || "Error creatingpost.");
      console.error(
        error.response?.data?.message || "Error creation post",
        error
      );
    }
    // alert("Please provide all thing to create post");
  };

  return (
    <div className="bg-indigo-50 h-[100vh] flex flex-col justify-between items-center gap-12 pt-25">
      <form onSubmit={handlePostCreation} className="flex flex-col gap-5">
        <div className="Image-input-and-view flex gap-5 items-center ">
          <div className="image-view w-[40vw] h-[23vh] md:w-[15vw] md:h-[35vh] rounded-md border flex justify-center items-center overflow-hidden">
            {ImagePreview ? (
              <div className="post-image-preview">
                <img
                  src={ImagePreview}
                  alt="Image preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="font-semibold text-neutral-500 text-4xl">
                <FaRegImage />
              </div>
            )}
          </div>
          <div className="image-input">
            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-yellow-500 rounded-full py-2 md:p-2.5 transition duration-200 text-[15px] w-[28vw] md:w-[8vw] font-medium md:font-semibold text-white hover:bg-yellow-900 cursor-pointer"
            >
              {image ? "Change image" : "Chose image"}
            </button>
            <input
              className="hidden"
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setImagePreview(null);
                }
              }}
            />
          </div>
        </div>
        <div className="Image-name-with-description">
          <div className="flex flex-col gap-3">
            {/* Image Name */}
            <input
              type="text"
              placeholder="Image name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              className="border md:w-[24vw] py-2 px-2 md:px-5 font-semibold rounded-md outline-0"
            />
            {/* Description */}
            <textarea
              placeholder="Write description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border py-2 px-2 md:p-2 rounded-md outline-none h-24 resize-none"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-green-500 py-2 xl:px-6 xl:py-1.5 hover:bg-green-700 w-[50%] rounded transition duration-200 font-semibold tracking-widest text-xl md:text-lg text-white cursor-pointer">
            Create
          </button>
        </div>
      </form>
      <div className="z-50 w-full">{!hideLayout && <Footer />}</div>
    </div>
  );
}

export default CreatePost;
