import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
import UpdatePost from "./pages/UpdatePost";
import CreatePost from "./pages/CreatePost";
// import DeletePost from "./pages/DeletePost";

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
        <Route path="/post" element={<Post />} />
        <Route path="/createPost/:userId" element={<CreatePost />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/update/:postId" element={<UpdatePost />} />
        {/* <Route path="/delete/:postId" element={<DeletePost />} /> */}
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
