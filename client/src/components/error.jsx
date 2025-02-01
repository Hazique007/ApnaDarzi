import React from "react";
import TopNav from "./TopNav";
import Navbar from "./Navbar";
import Oops from "../assets/images/oops.png";

const Error = () => {
  const handleRetry = async () => {
    window.history.back();
    window.location.reload();
    // console.log(window.location.hash);
  };
  return (
    <div>
      <TopNav />
      <div className="flex flex-col items-center gap-2 justify-center h-[80vh]">
        <img className="aspect-square h-20" src={Oops} alt="" />
        <h1 className="text-center font-poppins text-lg">
          Oops! Something went wrong.
          <br /> Please try again.
        </h1>
        <button
          onClick={handleRetry}
          className="text-blue-600 font-poppins text-[14px] mt-2 list-none"
        >
          retry
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default Error;
