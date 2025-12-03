import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import UserDetials from "./pages/Users/UserDetials";
import Post from "./pages/Posts/Post";
import CreatePost from "./pages/Posts/CreatePost";
import UpdatePost from "./pages/Posts/UpdatePost";
import PostDetail from "./pages/Posts/PostDetail";

function App() {
  const location = useLocation();
  const [postData, setPostData] = useState("");
  // const [postData, setPostData] = useState([]);

  // Chek if current route is login or register
  const hideLayout = ["/login", "/register"].includes(location.pathname);
  return (
    <div className="">
      {!hideLayout && <Navbar setPostData={setPostData} />}
      <Routes>
        <Route path="/" element={<Home postData={postData} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post postData={postData} />} />
        <Route
          path="/userDetials/:userId"
          element={<UserDetials postData={postData} />}
        />
        <Route path="/createPost/:userId" element={<CreatePost />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/postDetail/:postId" element={<PostDetail />} />
        <Route path="/update/:postId" element={<UpdatePost />} />
      </Routes>
    </div>
  );
}

export default App;
