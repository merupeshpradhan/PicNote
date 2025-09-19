import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-10 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800 tracking-wider">
        PicNote
      </h1>
      <div className="">
        <ul className="flex gap-5">
          <li className=" flex items-center bg-green-700 px-6 rounded-md text-md font-semibold text-white">
            <Link to={"/login"}>Login</Link>
          </li>
          <li className="bg-red-700 px-6 py-2 rounded-md text-md font-semibold text-white">
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
