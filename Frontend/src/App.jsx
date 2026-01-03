import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn/SignIn";
import Signup from "./pages/Auth/Signup/Signup";
import Navbar from "./components/Navbar";
import OwnerProfile from "./pages/OwnerProfile";
import UserDetials from "./pages/Users/UserDetials";
import Post from "./pages/Posts/Post";
import CreatePost from "./pages/Posts/CreatePost";
import UpdatePost from "./pages/Posts/UpdatePost";
import PostDetail from "./pages/Posts/PostDetail";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();
  const [postData, setPostData] = useState("");
  // const [postData, setPostData] = useState([]);

  // Chek if current route is login or register
  const hideLayout = ["/signin", "/signup"].includes(location.pathname);
  return (
    <div className="">
      <ScrollToTop />

      {!hideLayout && <Navbar setPostData={setPostData} />}

      <Routes>
        <Route path="/" element={<Home postData={postData} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/post" element={<Post />} />
        <Route path="/userDetials/:userId" element={<UserDetials />} />
        <Route path="/createPost/:userId" element={<CreatePost />} />
        <Route path="/profile/:userId" element={<OwnerProfile />} />
        <Route path="/postDetail/:postId" element={<PostDetail />} />
        <Route path="/update/:postId" element={<UpdatePost />} />
      </Routes>
    </div>
  );
}

export default App;
