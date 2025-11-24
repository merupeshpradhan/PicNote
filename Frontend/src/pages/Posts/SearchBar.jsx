import { RiSearchEyeLine } from "react-icons/ri";

function SearchBar({ setPostData }) {
  return (
    <div>
      <div className="border border-stone-700 flex items-center rounded">
        <input
          onChange={(e) => setPostData(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search image..."
          className="w-[450px] pl-1.5 py-1 font-normal text-md tracking-widest outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
