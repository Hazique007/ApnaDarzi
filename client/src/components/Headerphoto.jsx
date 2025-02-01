import React from "react";

import image10 from "../assets/images/headerphoto.png";
import { useNavigate } from "react-router-dom";

const Headerphoto = () => {
  const navigate = useNavigate();
  return (
    <div className="images flex-col justify-between items-center ">
      {/* <button
        className="absolute top-3 right-3 text-white font-poppins font-medium px-4 py-1 bg-slate-900 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out"
        onClick={() => navigate("/Home")}
      >
        Skip
      </button> */}

      <img
        className="h-[21.5vh] w-full object-cover "
        src={image10}
        alt=""
        srcSet=""
      />
    </div>
  );
};

export default Headerphoto;
