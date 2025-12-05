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
      const toastId = toast.loading("Please Login first");
      const errorMsg = "Please Login first";

      toast.update(toastId, {
        render: errorMsg,
        closeButton: true,
        type: "warning",
        isLoading: false,
        autoClose: "3000",
        style: {
          fontSize: "14px",
          marginRight: "600px",
          marginTop: "-10px",
          padding: "2px 8px",
          lineHeight: "42px",
          minHeight: "20px", // ⬅ override default height
          height: "auto",
        },
      });
      navigate("/signin");
    }
  };

  return (
    <div className="h-[111vh] bg-[#edf5f0] flex flex-col justify-between min-h-screen relative items-center pt-16 md:pt-16 lg:pt-14 2xl:pt-16">
      <Post postData={postData} />

      <button
        onClick={handleCreatePostClick}
        className="fixed bottom-4 flex justify-center bg-green-600 text-white p-3.5 rounded-full shadow-lg z-10 hover:bg-green-700 transition duration-300 cursor-pointer"
      >
        <FaPlus size={20} />
      </button>

      <Footer />
    </div>
  );
}

export default Home;
