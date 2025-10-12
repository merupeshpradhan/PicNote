import { Link } from "react-router-dom";
import Post from "./Posts/Post";
import { FaPlus } from "react-icons/fa";

function Home() {
  return (
    <div className="flex flex-col min-h-screen relative items-center pt-17 bg-indigo-50">
      <Post />
      <div className="fixed bottom-6 flex justify-center bg-green-600 text-white p-3.5 rounded-full shadow-lg z-50 hover:bg-green-700 transition duration-300 cursor-pointer">
        <Link to={"/createPost/:userId"}>
          <FaPlus size={20} />
        </Link>
      </div>
    </div>
  );
}

export default Home;
