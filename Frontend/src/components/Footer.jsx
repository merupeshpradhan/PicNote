import { FaInstagram, FaTelegram } from "react-icons/fa";
import { PiTelegramLogoLight } from "react-icons/pi";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 flex items-center justify-between px-10">
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
