import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { FaPlus } from "react-icons/fa";

function Home() {
  return (
    <div className="flex flex-col min-h-screen relative items-center">
      <Post />
      <div className="fixed bottom-6 flex justify-center bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition">
        <Link to={"/creaetePost/:userId"}>
          <FaPlus size={28} />
        </Link>
      </div>
    </div>
  );
}

export default Home;
