import { Link } from "react-router-dom";
import Post from "./Posts/Post";
import { FaPlus } from "react-icons/fa";
import Footer from "../components/Footer";

function Home() {
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="bg-indigo-50 flex flex-col justify-between min-h-screen relative items-center pt-17">
      <Post />

      <Link
        to={"/createPost/:userId"}
        className="fixed bottom-4 flex justify-center bg-green-600 text-white p-3.5 rounded-full shadow-lg z-10 hover:bg-green-700 transition duration-300 cursor-pointer"
      >
        <FaPlus size={20} />
      </Link>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default Home;
