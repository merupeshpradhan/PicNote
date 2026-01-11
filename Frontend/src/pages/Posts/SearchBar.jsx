import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBar({ setPostData }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setPostData(value);
    
    navigate("/")
  };

  return (
    <div>
      <div className="border-2 border-[#85ac85] flex items-center rounded">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search image..."
          className="w-[150px] md:w-[350px] lg:w-[450px] pl-1.5 md:py-1 lg:py-1 font-normal text-md tracking-widest outline-none"
        />
        <div className="pr-2 text-gray-400">
          <FaSearch size={15} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
