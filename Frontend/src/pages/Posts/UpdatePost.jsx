import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdatePost() {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    image: null,
    imageName: "",
    description: "",
  });
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/posts/${postId}`
        );

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
      const res = await axios.put(
        `http://localhost:4000/api/v1/posts/${postId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      const post = res.data.data;
      navigate(`/profile/${post.user._id}`);

    } catch (error) {
      alert(error.response?.data?.message || "Error updating post");
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center gap-6">
      <h1 className="flex items-center">UpdatePost</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {preview && <img src={preview} alt="Preview" className="h-[26.5vw]" />}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-1.5"
        />
        <input
          type="text"
          name="imageName"
          placeholder="Image name"
          value={formData.imageName}
          onChange={handleChange}
          className="border p-1.5"
        />
        <input
          type="text"
          name="description"
          placeholder="Image description"
          value={formData.description}
          onChange={handleChange}
          className="border p-1.5"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="font-bold tracking-wider border w-[40%] p-1.5"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePost;
