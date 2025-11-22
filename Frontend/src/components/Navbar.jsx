import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Chek if user is logged in and any update of user
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    updateUser();

    // Listen for user updates
    window.addEventListener("userUpdated", updateUser);

    // Optional: also listen for changes from other tabs
    window.addEventListener("storage", updateUser);
    return () => {
      window.removeEventListener("userUpdated", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");

      navigate("/");

      // update state so Navbar re-renders
      setUser(null);

      // Do NOT navigate, user stays on current page
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };
  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-100 shadow-indigo-400 shadow-lg/65 rounded-bl-2xl rounded-br-2xl py-2.5 md:py-2 lg:py-2 px-5 flex justify-between items-center z-50">
      <Link to="/">
        <h1 className="text-2xl md:text-4xl lg:text-3xl font-extrabold text-pink-600 tracking-wide cursor-pointer">
          Pic<span className="text-gray-800">Note</span>
        </h1>
      </Link>
      <div className="block">
        <ul className="flex gap-5">
          {!user ? (
            <div className="login-register flex gap-3 md:gap-5 justify-center items-center">
              <li className="flex items-center bg-green-600 hover:bg-green-700 py-1 px-2.5 lg:py-1 lg:px-4 rounded-md text-md md:font-semibold tracking-wider text-white transition duration-200 cursor-pointer">
                <Link to={"/login"}>Login</Link>
              </li>
              <li className="bg-red-600 hover:bg-red-700   py-1 px-2.5 lg:py-1 rounded-md text-md md:font-semibold tracking-wider text-white transition duration-200 cursor-pointer">
                <Link to={"/register"}>Register</Link>
              </li>
            </div>
          ) : (
            <div className="uerImg-and-name-and-logout flex gap-5 justify-center items-center">
              <div className="flex justify-center items-center gap-3 md:gap-5">
                <Link
                  to={"/userDetials"}
                  className="flex justify-center items-center gap-2"
                >
                  <span className="font-semibold hidden md:block">
                    Wellcome {user.firstName}
                  </span>
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.firstName}
                      className="w-7 h-7 md:w-10 md:h-10 rounded-full"
                    />
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-md hover:text-white text-[12px] md:text-[16px] md:font-semibold transition duration-200 cursor-pointer font-bold tracking-wider"
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
