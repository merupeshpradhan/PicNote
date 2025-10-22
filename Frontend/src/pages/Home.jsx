import { useNavigate } from "react-router-dom";
import Post from "./Posts/Post";
import { FaPlus } from "react-icons/fa";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      navigate(`/createPost/${parsedUser.id}`);
    } else {
      toast.error("Please Login first", {
        style: {
          width: window.innerWidth < 600 ? "250px" : "320px",
          marginTop: window.innerWidth < 600 ? "10px" : "0px",
          fontSize: window.innerWidth < 600 ? "18px" : "16px",
        },
      });
      navigate("/login");
    }
  };

  return (
    <div className="bg-indigo-50 flex flex-col justify-between min-h-screen relative items-center pt-16">
      <Post />

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
