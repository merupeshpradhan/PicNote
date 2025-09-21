import axios from "axios";
import { useEffect, useState } from "react";

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
    <div>
      {posts.map((post) => (
        <div key={post._id} className="">
          <img
            src={post.image}
            alt={post.imageName}
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
