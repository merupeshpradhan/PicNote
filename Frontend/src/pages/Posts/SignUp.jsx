import { useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaRegImage,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../Api/api";

function SignUp() {
  const [previewAvatar, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const userSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Loading toast
    const toastId = toast.loading("Signup for PicNote...");

    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);

      // const res = await axios.post(
      // // const res = await axios.get(`http://localhost:4000/api/v1/posts/user/${userId}`);

      //   "http://localhost:4000/api/v1/users/signup",
      //   formData,
      //   { headers: { "Content-Type": "multipart/form-data" } }
      //   // { withCredentials: true }
      // );
      const res = await api.post("/users/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("You register successfully!", res);
      // toast.success("You registered successfully!");

      const successsMsg =
        res.data?.message || "Signup successful! Please login.";

      toast.update(toastId, {
        render: successsMsg,
        type: "success",
        isLoading: false,
        autoClose: "3000",
        style: { fontSize: "14px" },
      });

      navigate("/signIn");

      setAvatar("");
      setAvatarPreview("");
      setFirstName("");
      setLastName("");
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
    <div className="min-h-screen flex items-center justify-center bg-pink-100 py-4 px-4">
      <div className="bg-white rounded-2xl shadow-2xl md:rounded-2xl md:shadow-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-pink-50 flex md:flex-col items-center justify-between md:justify-normal p-3 md:p-6">
          {/* Project Name */}
          <div className="text-center mb-6 mt-[10px]">
            <h1 className="text-2xl md:text-4xl font-extrabold text-pink-600 tracking-wide">
              Pic<span className="text-gray-800">Note</span>
            </h1>
            <p className="text-gray-500 text-sm md:mt-1">
              Capture. Save. Remember.
            </p>
          </div>

          {/* Illustration  */}
          <div className="relative">
            <img
              src="/Sign-up-amico.png"
              alt="Preview"
              className="w-[150px] md:w-full"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 pt-4 pb-4 px-6 md:p-9">
          {/* Form Header */}
          <h2 className="text-xl md:text-3xl font-semibold text-gray-700 mb-1 md:mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm sm:text-md lg:text-[15px] mb-4 md:mb-6">
            Join PicNote to save, organize, and remember your notes and images
            securely.
          </p>

          <form onSubmit={userSignUp} className="space-y-1 md:space-y-5">
            {/* Avatar Upload */}
            <div className="flex justify-between md:justify-start md:gap-7 mb-3">
              <div className="avatar-preview-container border-2 border-pink-500 w-[50%] h-[20vh] xl:h-[26vh] xl:w-[42%] rounded-md flex justify-center items-center overflow-hidden">
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
              <div className="flex  items-center lg:gap-3">
                <button
                  type="button"
                  onClick={() => document.getElementById("avatarInput").click()}
                  className="bg-pink-500 text-white text-[11px] sm:text-[12px] w-[130px] md:w-[130px] py-2 rounded-md md:font-semibold hover:bg-pink-600 transition cursor-pointer"
                >
                  {avatar ? "Change your image" : "Provide your image"}
                </button>
                <FaRegImage className="text-pink-500 hidden lg:block md:text-xl" />
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

            {/* First Name && Last Name*/}
            <div className="w-full flex items-center justify-center gap-2">
              <div className="firstName w-full">
                <label className="md:font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border text-[15px] border-pink-300 rounded-md p-2 focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div className="lastName w-full">
                <label className="md:font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border text-[15px] border-pink-300 rounded-md p-2 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email && Password */}
            <div className="w-full flex items-center justify-center gap-2">
              {/* Email */}
              <div className="w-full">
                <label className="md:font-semibold text-gray-700">E-mail</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border text-[15px] border-pink-300 rounded-md p-2 focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div className="relative w-full">
                <label className="md:font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border text-[15px] border-pink-300 rounded-md p-2 focus:border-pink-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-[13px] text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-pink-500 mt-3 text-white py-1.5 md:py-2 rounded-md md:font-semibold hover:bg-pink-600 transition flex justify-center items-center gap-2 ${
                loading && "opacity-70 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" /> Sign Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-gray-600 mt-3 md:mt-6 text-[14px] tracking-wide">
            Already have an account?
            <Link
              to="/SignIn"
              className="text-pink-500 md:font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
