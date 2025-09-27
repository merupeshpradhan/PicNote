import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import { toast } from "react-toastify";

function Register() {
  const [previewAvatar, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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

      toast.success("You register successfully");

      navigate("/login");

      setAvatar("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // console.log(
      //   "Please send your all detials.",
      //   error.response?.data?.message || error.message
      // );

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Oops! Something went wrong. Please check and complete all your details."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="register-container border-2 border-sky-200 shadow-lg shadow-sky-300 rounded-2xl h-[full] w-[25%] flex flex-col">
        <div className="flex justify-center py-2">
          <h1 className="text-xl font-bold tracking-wider text-red-500">
            Register
          </h1>
        </div>
        <form onSubmit={userRegister} className="register-form flex flex-col gap-5 p-5">
          <div className="avatar-section flex gap-2 justify-around items-center">
            <div className="avatar-preview-container border-2 border-sky-500 xl:h-[20vh] xl:w-[42%] rounded-md flex justify-center items-center overflow-hidden">
              {previewAvatar ? (
                <div className="avatar-preview">
                  <img
                    src={previewAvatar}
                    alt="Avatar preview"
                    className="w-full h-full object-cover "
                  />
                </div>
              ) : (
                <div className="font-semibold text-sky-500">
                  <FaRegImage size={40} />
                </div>
              )}
            </div>
            <div className="avatar-selection">
              <button
                type="button"
                onClick={() => document.getElementById("avtarInput").click()}
                className="bg-sky-500 px-4 py-2 rounded-full font-semibold text-white text-[14px] hover:bg-sky-800 cursor-pointer transition duration-200 tracking-wider"
              >
                {avatar ? "Change your image" : "Provide your image"}
              </button>
              <input
                className="hidden"
                id="avtarInput"
                type="file"
                accept="image/*"
                placeholder="Provide your own image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAvatar(file);
                  if (file) {
                    setAvatarPreview(URL.createObjectURL(file));
                  } else {
                    setAvatarPreview(null);
                  }
                }}
              />
            </div>
          </div>
          <div className="fullName flex gap-2 justify-between items-center">
            <label className="font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border-2 border-sky-400 focus:border-sky-600 rounded-md xl:w-[75%] xl:py-1 p-1.5 outline-0 font-mono font-medium tracking-wide xl:text-[16px]"
            />
          </div>
          <div className="email flex gap-2 justify-between items-center">
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-sky-400 focus:border-sky-600 rounded-md xl:w-[75%] xl:py-1 p-1.5 outline-0 font-mono font-medium tracking-wide xl:text-[16px]"
            />
          </div>
          <div className="password flex gap-2 justify-between items-center">
            <label className="font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-sky-400 focus:border-sky-600 rounded-md xl:w-[75%] xl:py-1 p-1.5 outline-0 font-mono font-medium tracking-wide xl:text-[16px]"
            />
          </div>

          <div className="submit-button flex justify-center">
            <button
              type="submit"
              className="bg-red-500 xl:py-1.5 xl:w-[33%] rounded-lg text-white xl:font-semibold xl:tracking-wider text-[18px] xl:mt-2 hover:bg-red-700 cursor-pointer transition duration-200"
            >
              {loading ? "Processing..." : "Register"}
            </button>
          </div>
        </form>
        <div className="link-to-login py-1">
          <div className=" flex justify-center">
            <hr className="w-[95%] border-sky-500" />
          </div>
          <Link to={"/login"} className="flex justify-center p-5 ">
            <button className="bg-green-500 xl:px-7 xl:py-1.5 xl:w-[90%]  rounded-lg xl:font-semibold xl:tracking-wider text-[18px] text-white hover:bg-green-700 cursor-pointer transition duration-200">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
