import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function CreatePost() {
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = Navigate;

  const handlePostCreation = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("imageName", imageName);
      formData.append("description", description);

      await axios.post("http://localhost:4000/api/v1/posts", formData, {
        headers: { "Content-Type": "multipart/form-Data" },
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
        <div className="flex gap-5 items-center ">
          <div className="xl:h-[20vh] xl:w-[10vw] rounded-md border flex justify-center items-center">
            {previewImage ? <div>image</div> : <div>No image</div>}
          </div>
          <div className="">
           <button>{image?"Change image":"Chose image"}</button>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Image name"
              className="border w-[20vw] py-1 px-5 font-semibold"
            />
            <input
              type="text"
              placeholder="Image description"
              className="border w-[20vw] py-1 px-5 font-semibold"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
