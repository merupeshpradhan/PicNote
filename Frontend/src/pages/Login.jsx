import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        { email, password },
        { withCredentials: true }
      );

      const userData = res.data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Welcome to PicNote!");
      setEmail("");
      setPassword("");
      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      setPassword("");
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden justify-center items-center">
        {/* Left Section - Logo + Illustration */}
        <div className="md:w-1/2 bg-pink-50 flex flex-col items-center justify-center p-6">
          <div className="text-center mb-6  mt-[17px]">
            <h1 className="text-4xl font-extrabold text-pink-600 tracking-wide">
              Pic<span className="text-gray-800">Note</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Capture. Save. Remember.
            </p>
          </div>
           <div className="relative flex items-center justify-center">
            <img src="/Tablet-login-bro.png" alt="Preview" className="" />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
            Login to Your Account
          </h2>
          <p className="text-gray-500 mb-6">
            Welcome back! Please enter your details to continue to PicNote.
          </p>

          <form onSubmit={userLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-pink-300 rounded-md p-2 focus:border-pink-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative ">
              <label className="font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-pink-300 rounded-md p-2 pr-10 focus:border-pink-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white py-2 rounded-md font-semibold hover:bg-pink-600 transition"
            >
              {loading ? "Processing..." : "Sign In"}
            </button>
          </form>

          {/* Register Redirect */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?
            <Link
              to="/register"
              className="text-pink-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
