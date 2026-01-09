import { useNavigate } from "react-router-dom";
import Post from "./Posts/Post";
import { FaPlus } from "react-icons/fa";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Home({ postData }) {
  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      navigate(`/createPost/${parsedUser._id || parsedUser.id}`);
    } else {
      const toastId = toast.loading("Please SignIn first");
      const errorMsg = "Please SignIn first";

      toast.update(toastId, {
        render: errorMsg,
        closeButton: true,
        type: "warning",
        isLoading: false,
        autoClose: "3000",
      });
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-[111vh] bg-[#edf5f0] flex flex-col justify-between  relative items-center pt-16 md:pt-16 lg:pt-14 2xl:pt-16">
      <Post postData={postData} />

      <div className="group fixed bottom-4 z-10">
        <button
          onClick={handleCreatePostClick}
          className="flex justify-center bg-green-600 text-white p-3.5 rounded-full shadow-lg hover:bg-green-700 transition duration-300 cursor-pointer"
        >
          <FaPlus size={20} />
        </button>

        {/* Hover Text */}
        <span className="absolute left-1/2 -translate-x-1/2 bottom-14 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-3 py-1 rounded-md whitespace-nowrap">
          Upload Image
        </span>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
