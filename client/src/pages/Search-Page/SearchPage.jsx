import React, { useEffect } from "react";
import TopNav from "../../components/TopNav";
import Search from "../../components/Search";
import SearchStyle from "../../components/searchStyle";
import Navbar from "../../components/Navbar";
import ReactGA from "react-ga4";
const SearchPage = ({ gender }) => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Search Page",
    });
  }, []);
  //import ReactGA from "react-ga4";
  return (
    <div className="pb-20">
      <TopNav />
      <div className="w-full justify-center px-[13px] pt-[5px] items-center ">
        {/* <Search /> */}
        <SearchStyle gender={"Male"} />
        <SearchStyle gender={"Female"} />
        {/* <SearchStyle gender={"Kids"} /> */}
      </div>
      <Navbar />
    </div>
  );
};

export default SearchPage;
