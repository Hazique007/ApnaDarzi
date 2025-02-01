import React from "react";

const Workcomp = ({ img, head, desc }) => {
  return (
    <div className=" w-full flex pl-3  mt-4">
      <img className="h-[73px] w-[100px] rounded-[10px]" src={img} alt="" />
      <div className="textArea pl-3 mt-2 pr-3 flex-col items-center justify-center">
        <h1 className="text-[12px] font-[600] font-poppins leading-[18px]">
          {head}
        </h1>
        <p className="text-[10px] font-[400]  font-poppins leading-[18px]">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Workcomp;
