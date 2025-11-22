import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Posts/Post";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import UpdatePost from "./pages/Posts/UpdatePost";
import CreatePost from "./pages/Posts/CreatePost";
import UserDetials from "./pages/Users/UserDetials";
import PostDetail from "./pages/Posts/PostDetail";
import SearchPost from "./pages/Posts/SearchPost";

function App() {
  const location = useLocation();

  // Chek if current route is login or register
  const hideLayout = ["/login", "/register"].includes(location.pathname);
  return (
    <div className="">
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userDetials" element={<UserDetials />} />
        <Route path="/post" element={<Post />} />
        <Route path="/createPost/:userId" element={<CreatePost />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/postDetail/:postId" element={<PostDetail />} />
        <Route path="/update/:postId" element={<UpdatePost />} />
        <Route path="/search" element={<SearchPost />} />
      </Routes>
      {/* {!hideLayout && <Footer />} */}
    </div>
  );
}

export default App;
