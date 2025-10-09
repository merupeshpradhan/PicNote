import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Chek if user is logged in

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");

      // update state so Navbar re-renders
      setUser(null);

      // Do NOT navigate, user stays on current page
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };
  return (
    <nav className="bg-white shadow-md py-3 px-10 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800 tracking-wider">
        PicNote
      </Link>
      <div className="">
        <ul className="flex gap-5">
          {!user ? (
            <div className="login-register flex gap-5 justify-center items-center">
              <li className=" flex items-center bg-green-700 py-1.5 px-4 rounded-md text-md font-semibold text-white">
                <Link to={"/login"}>Login</Link>
              </li>
              <li className="bg-red-700 py-1.5 px-4 rounded-md text-md font-semibold text-white">
                <Link to={"/register"}>Register</Link>
              </li>
            </div>
          ) : (
            <div className="uerImg-and-name-and-logout flex gap-5 justify-center items-center">
              <div className="flex justify-center items-center gap-5">
                <div className="flex justify-center items-center gap-2">
                  <Link to={'/userDetials'}>
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.userName}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </Link>
                  <span className="font-semibold">{user.userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="border-2 border-red-800 px-2 py-1 rounded-md hover:bg-red-800 hover:text-white font-semibold transition duration-200 cursor-pointer tracking-wide"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
