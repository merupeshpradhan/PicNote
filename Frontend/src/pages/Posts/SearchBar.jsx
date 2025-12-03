import { FaSearch } from "react-icons/fa";

function SearchBar({ setPostData }) {
  return (
    <div>
      <div className="border-2 border-[#628f07] flex items-center rounded">
        <input
          onChange={(e) => setPostData(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search image..."
          className="w-[450px] pl-1.5 py-1 font-normal text-md tracking-widest outline-none"
        />
        <div className="pr-2 text-gray-400">
          <FaSearch size={15}/>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
