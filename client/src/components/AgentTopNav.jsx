import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const AgentTopNav = ({ onLogout }) => {
  const handleBackClick = () => {
    navigate(-1);
  };

  const navigate = useNavigate()

  return (
    <div>
      <div className="h-[46px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] w-full flex items-center justify-between px-[8px]">
        <div className="flex items-center">
          <IoIosArrowBack
            onClick={handleBackClick}
            className="h-[16px] w-[16px] text-[#FFFFFF] font-[700] cursor-pointer"
          />
          <p className="text-white leading-[24px] text-[16px] font-[500] font-poppins ml-2">
            Doorstep Stitching
          </p>
        </div>
        {/* Logout button */}
        <p
          onClick={onLogout}
          className="text-white font-[500] leading-[18px] text-[12px] font-poppins font-[400] cursor-pointer"
        >
          Logout
        </p>
      </div>

    </div>
  );
};

export default AgentTopNav;
