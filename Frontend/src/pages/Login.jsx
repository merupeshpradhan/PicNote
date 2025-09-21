import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        alert("Welcome user to PicNote");

        navigate("/");

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Somthing went wrong to login, please provide correct email and password."
        );
      });
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="border-2 border-green-600 shadow-lg shadow-green-300 rounded-2xl h-[full] w-[25%] flex flex-col ">
        <div className="flex justify-center py-2">
          <h1 className="text-xl font-bold tracking-wider">Login</h1>
        </div>
        <form onSubmit={userLogin} className="p-5 flex flex-col gap-5">
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
              className="bg-green-500 xl:w-[20%] p-1.5 rounded-lg text-white font-semibold tracking-wider text-[15px]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
