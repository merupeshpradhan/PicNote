import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/posts");
        console.log("Posts response", res);

        if (res.data.data) {
          setPosts(res.data.data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!posts.length) {
    return <div className="text-center mt-10">No post available.</div>;
  }

  return (
    <div className="w-[100%] flex gap-5 p-5">
      {posts.map((post) => (
        <div key={post._id} className="flex flex-col items-center gap-2">
          <img
            src={post.image}
            alt={post.imageName}
            className=" h-[48vh] object-cover"
          />
          <p className="text-xl font-semibold">{post.imageName}</p>

          <NavLink to={`/profile/${post.user._id}`}>
            Posted by: {post.user.userName}
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default Home;
