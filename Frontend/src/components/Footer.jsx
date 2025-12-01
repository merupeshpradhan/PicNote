import { FaInstagram } from "react-icons/fa";
import { PiTelegramLogoLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full bg-gray-900 text-gray-400 py-[12px] md:py-[25px] px-5 md:px-10 cursor-default">
      <div className="flex items-center justify-between ">
        <p className="text-[13px] md:text-[16px]">
          &copy; {new Date().getFullYear()} PicNote. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <NavLink>
            <PiTelegramLogoLight size={19} />
          </NavLink>

          <NavLink>
            <FaInstagram size={19} />
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
