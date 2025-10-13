import { FaInstagram } from "react-icons/fa";
import { PiTelegramLogoLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full h-[px] bg-gray-900 text-gray-400 py-[25px] flex items-center justify-between px-10">
      <p>&copy; {new Date().getFullYear()} PicNote. All rights reserved.</p>
      <div className="flex items-center gap-5">
        <NavLink>
          <PiTelegramLogoLight size={19} />
        </NavLink>
      
          <NavLink>
            <FaInstagram size={19} />
          </NavLink>
      </div>
    </footer>
  );
}

export default Footer;
