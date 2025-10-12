import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaRegImage, FaUser } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { toast } from "react-toastify";

function Register() {
  const [previewAvatar, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const userRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);

      const res = await axios.post(
        "http://localhost:4000/api/v1/users/signup",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("You register successfully!", res);
      toast.success("You registered successfully!");
      navigate("/login");

      setAvatar("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        {/* Left Section */}
        <div className="md:w-1/2 bg-pink-50 flex flex-col items-center p-6">
          {/* Project Name */}
          <div className="text-center mb-6 mt-[17px]">
            <h1 className="text-4xl font-extrabold text-pink-600 tracking-wide">
              Pic<span className="text-gray-800">Note</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Capture. Save. Remember.
            </p>
          </div>

          {/* Illustration  */}
          <div className="relative mt-[10%]">
            <img src="/Sign-up-amico.png" alt="Preview" className="" />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
           {/* Form Header */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-500 mb-6">
            Join PicNote to save, organize, and remember your notes and images securely.
          </p>

          <form onSubmit={userRegister} className="space-y-5">
            {/* Avatar Upload */}
            <div className="flex gap-7">
              <div className="avatar-preview-container border-2 border-pink-500 xl:h-[20vh] xl:w-[42%] rounded-md flex justify-center items-center overflow-hidden">
                {previewAvatar ? (
                  <div className="avatar-preview">
                    <img
                      src={previewAvatar}
                      alt="Avatar preview"
                      className="w-full h-full object-cover "
                    />
                  </div>
                ) : (
                  <div className="font-semibold text-pink-500">
                    <FaUser size={40} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => document.getElementById("avatarInput").click()}
                  className="bg-pink-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-pink-600 transition cursor-pointer"
                >
                  {avatar ? "Change your image" : "Provide your image"}
                </button>
                <FaRegImage className="text-pink-500 text-xl" />
              </div>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAvatar(file);
                  if (file) {
                    setAvatarPreview(URL.createObjectURL(file));
                  } else {
                    setAvatarPreview("");
                  }
                }}
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-pink-300 rounded-md p-2 focus:border-pink-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold text-gray-700">E-mail</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-pink-300 rounded-md p-2 focus:border-pink-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
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
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white py-2 rounded-md font-semibold hover:bg-pink-600 transition cursor-pointer"
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?
            <Link
              to="/login"
              className="text-pink-500 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;