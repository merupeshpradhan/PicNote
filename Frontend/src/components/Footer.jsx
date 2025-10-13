import { FaInstagram } from "react-icons/fa";
import { PiTelegramLogoLight } from "react-icons/pi";

function Footer() {
  
  return (
    <footer className="bottom-0 left-0 w-full h-[60px] bg-gray-900 text-gray-400 py-4 flex items-center justify-between px-10">
      <p>&copy; {new Date().getFullYear()} PicNote. All rights reserved.</p>
      <div className="flex items-center gap-5">
        <p>
          <PiTelegramLogoLight size={19} />
        </p>
        <p>
          <FaInstagram size={19} />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
