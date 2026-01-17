// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import { FaRegImage, FaSpinner } from "react-icons/fa";
import api from "../Api/api";

function CreatePost() {
  const [ImagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePostCreation = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Publishing your post.........");
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("imageName", imageName);
      formData.append("description", description);

      // const token = localStorage.getItem("accessToken");

      // await axios.post("http://localhost:4000/api/v1/posts", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   withCredentials: true,
      // });

      const res = await api.post("/posts", formData);

      console.log("User post create successfully");

      // toast.success("You successfully create post");

      const successsMsg = res.data?.message || "SignIn success";

      toast.update(toastId, {
        render: successsMsg,
        closeButton: true,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/");

      setImage("");
      setImageName("");
      setDescription("");
    } catch (error) {
      // toast.error("Please log in first to create a post.");
      // toast.error(error.response?.data?.message || "Error creatingpost.");
      // console.error(
      //   error.response?.data?.message || "Error creation post",
      //   error
      // );
      console.log(
        error.response?.data?.message || "Error creation post",
        error
      );

      toast.update(toastId, {
        render: error.response?.data?.message || "Error creating post.",
        closeButton: true,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
    // alert("Please provide all thing to create post");
  };

  return (
    <div className="min-h-[111vh] bg-[#eff7ed] flex flex-col justify-between items-center gap-12 pt-20 md:pt-32">
      <form onSubmit={handlePostCreation} className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
          <div className="Image-input-and-view flex gap-5 justify-center items-center ">
            <div className="image-view w-[90vw] h-[40vh] md:w-[90vw] md:h-[50vh] lg:w-[40vw] lg:h-[67vh] rounded-md border border-[#58530b] flex justify-center items-center overflow-hidden">
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
          </div>
          <div className="Image-input-name-and-description">
            <div className="w-full flex flex-col gap-3 items-center">
              <div className="image-input">
                <button
                  type="button"
                  onClick={() => document.getElementById("fileInput").click()}
                  className="bg-blue-500 hover:bg-blue-600 rounded-full py-1.5 md:p-2 transition duration-200 text-[15px] mt-3 mb-3 md:mt-0 w-[35vw] md:w-[20vw] font-medium md:font-semibold text-white cursor-pointer"
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
              {/* Image Name */}
              <input
                type="text"
                placeholder="Image name"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                className="border w-[90vw] md:w-[60vw] lg:w-[24vw] py-2 px-2 font-semibold rounded-md outline-0"
              />
              {/* Description */}
              <textarea
                placeholder="Write description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-[90vw] md:w-[90vw] lg:w-[50vw] h-[50vh] border py-2 px-2 md:p-2 rounded-md outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-500 py-1 md:py-2 xl:px-6 xl:py-1.5 hover:bg-green-600 w-[35%] md:w-[20%] rounded transition duration-200 font-semibold tracking-widest text md:text-xl lg:text-lg text-white cursor-pointer flex justify-center items-center gap-2 ${
              loading && "opacity-70 cursor-not-allowed"
            } `}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-xl" /> Uploading...
              </>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </form>{" "}
      <Footer />
    </div>
  );
}

export default CreatePost;
