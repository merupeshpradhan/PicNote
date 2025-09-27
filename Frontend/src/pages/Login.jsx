import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:4000/api/v1/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("User login successfully", res);

        toast.success("Welcome user to PicNote");

        navigate("/");

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Somthing went wrong to login, please provide correct email and password."
        );
      });
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="border-2 border-green-200 shadow-lg shadow-green-300 rounded-2xl h-[full] w-[25%] flex flex-col ">
        <div className="flex justify-center py-2">
          <h1 className="text-xl font-bold tracking-wider text-green-600">
            Login
          </h1>
        </div>
        <form onSubmit={userLogin} className="p-5 flex flex-col gap-5">
          <div className="flex gap-2 justify-between items-center">
            <label className="font-semibold text-green-950">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="border-2 border-gray-400 focus:border-gray-600 rounded-md xl:w-[75%] xl:py-1.5 p-1.5 outline-0 font-mono font-medium tracking-wide xl:text-[16px]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <label className="font-semibold text-green-950">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border-2 border-gray-400 focus:border-gray-600  rounded-md xl:w-[75%] xl:py-1.5 p-1.5 outline-0 font-mono font-medium tracking-wide xl:text-[16px]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 xl:py-1.5 xl:w-[33%] rounded-lg text-white xl:font-semibold xl:tracking-wider text-[18px] xl:mt-2 hover:bg-green-700 cursor-pointer transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <div className="py-1">
          <div className=" flex justify-center">
            <hr className="w-[95%] border-sky-500" />
          </div>
          <Link to={"/register"} className="flex justify-center p-5 ">
            <button className="bg-red-500 xl:px-7 xl:py-1.5 xl:w-[90%]  rounded-lg xl:font-semibold xl:tracking-wider text-[18px] text-white hover:bg-red-700 cursor-pointer transition duration-200">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
