import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [ImagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handlePostCreation = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("imageName", imageName);
      formData.append("description", description);

      await axios.post("http://localhost:4000/api/v1/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("User post create successfully");

      alert("You successfully create post");
      navigate("/");

      setImage("");
      setImageName("");
      setDescription("");
    } catch (error) {
      alert("Please provide all thing to create post");

      console.error(
        error.response?.data?.message || "Error creation post",
        error
      );
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center gap-12 mt-20">
      <form onSubmit={handlePostCreation} className="flex flex-col gap-5">
        <div className="Image-input-and-view flex gap-5 items-center ">
          <div className="image-view xl:h-[20vh] xl:w-[10vw] rounded-md border flex justify-center items-center">
            {ImagePreview ? (
              <div>
                <img src={ImagePreview} alt="Image preview" />
              </div>
            ) : (
              <div>No image</div>
            )}
          </div>
          <div className="image-input">
            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-yellow-500 rounded-full p-2.5 transition duration-200 w-[8vw] font-semibold text-white hover:bg-yellow-900 cursor-pointer"
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
            <input
              type="text"
              placeholder="Image name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              className="border w-[20vw] py-1 px-5 font-semibold"
            />
            <input
              type="text"
              placeholder="Image description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border w-[20vw] py-1 px-5 font-semibold"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-green-400 xl:px-6 xl:py-1.5 hover:bg-green-800 rounded transition duration-200 font-semibold tracking-wider text-lg text-white cursor-pointer">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
