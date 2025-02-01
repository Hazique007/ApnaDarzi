import React from "react";
import { IoSearch } from "react-icons/io5";
import { useContext } from "react";
import { SearchContext } from "../Context Api/searchContext";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const { isSearch, setIsSearch } = useContext(SearchContext);
  const handleSearch = () => {
    setIsSearch(!isSearch);
    navigate("/search");
  };
     

  return (
    <div
      onClick={handleSearch}
      className="h-[38px]   bg-[#F6F1F1] rounded-[5px] flex items-center"
    >
      <IoSearch
        onClick={handleSearch}
        className="h-[20px] w-[20px] ml-[25px] text-gray-500"
      />
      <input
        placeholder="Search Sherwani"
        className="bg-transparent w-full pl-[20px] outline-none font-poppins text-[11px] leading-[15px]"
        type="text"
      />
    </div>
  );
};

export default Search;
