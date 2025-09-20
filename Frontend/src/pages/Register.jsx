import { useState } from "react";
import axios from "axios";

function Register() {
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
        <form onSubmit={userRegister} className="p-5 flex flex-col gap-5">
          <div className="flex gap-2 justify-between items-center">
            <label className="font-semibold">Your image</label>
            <input
              type="file"
              placeholder="Provide your own image"
              className="border xl:w-[75%] xl:py-1 p-1.5 outline-0"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="border xl:w-[75%] xl:py-1 p-1.5 outline-0"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <label className="font-semibold">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="border xl:w-[75%] xl:py-1 p-1.5 outline-0"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border xl:w-[75%] xl:py-1 p-1.5 outline-0"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
      </div>
    </div>
  );
}

export default Register;
