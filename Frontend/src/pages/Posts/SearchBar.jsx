import { useState, useEffect } from "react";
import { RiSearchEyeLine } from "react-icons/ri";

function SearchBar({ setPostData }) {
  return (
    <div>
      <div className="border border-stone-700 flex items-center rounded">
        <input
          onChange={(e) => setPostData(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search image..."
          className="w-[400px] pl-1.5 font-normal text-md tracking-wider outline-none"
        />
        <div className="px-2 py-[7px] bg-stone-300 hover:bg-stone-400 text-stone-700 hover:text-stone-900 flex justify-center rounded-r-sm cursor-pointer transition duration-200">
          <RiSearchEyeLine size={16} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
