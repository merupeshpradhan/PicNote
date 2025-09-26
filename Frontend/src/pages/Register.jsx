import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [previewAvatar, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userRegister = async (e) => {
    e.preventDefault();

    if (!avatar) {
      alert("Provide your own image.");
      return;
    }

    if (!userName || !email || !password) {
      alert("Please provide your all detials.");
      return;
    }

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
      alert("You register successfully");
    } catch (error) {
      alert(
        "Oops! Something went wrong. Please check and complete all your details."
      );
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="border border-red-200 shadow-lg shadow-red-300 rounded-2xl h-[full] w-[25%] flex flex-col ">
        <div className="flex justify-center py-2">
          <h1 className="text-xl font-bold tracking-wider">Register</h1>
        </div>
        <form onSubmit={userRegister} className="flex flex-col gap-5 p-5">
          <div className="flex gap-2 justify-around items-center">
            <div className="border xl:h-[20vh] xl:w-[42%] rounded-full flex justify-center items-center overflow-hidden">
              {previewAvatar ? (
                <div className="">
                  <img
                    src={previewAvatar}
                    alt="Avatar preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="font-semibold">No image</div>
              )}
            </div>
            <div className="">
              <button
                type="button"
                onClick={() => document.getElementById("avtarInput").click()}
                className="bg-yellow-600 px-4 py-2 rounded-full font-semibold text-white text-[14px] hover:bg-yellow-800 cursor-pointer transition duration-200 tracking-wider"
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
          <div className="flex gap-2 justify-between items-center">
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border xl:w-[75%] xl:py-1 p-1.5 outline-0"
            />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <label className="font-semibold">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border xl:w-[75%] xl:py-1 p-1.5 outline-0"
            />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border xl:w-[75%] xl:py-1 p-1.5 outline-0"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 xl:w-[20%] p-1.5 rounded-lg text-white font-semibold tracking-wider text-[15px]"
            >
              Register
            </button>
          </div>
        </form>
        <div className="py-5">
          <div className="xl:mt-5 flex justify-center">
            <hr className="w-[95%]" />
          </div>
          <Link to={"/login"} className="flex justify-center">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
