import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhatsApp = () => {
  return (
    <div className="px-[16px] bg-[#D9D9D933] rounded-[10px] h-14 justify-between items-center flex w-[95vw] mt-8">
      <FaWhatsapp className="w-[40px] h-[40px] text-green-600 ml-2 " />
      <div className="txt pl-[16px] w-[70vw] flex-col justify-center items-center">
        <h1 className="font-[700] font-poppins text-[11px] leading-[18px]">
          Send ‘Hi’ on WhatsApp
        </h1>
        <p className="font-[400] font-poppins text-[10px] leading-[18px]">
          & we’ll help you with everything
        </p>
      </div>
      <a
        href="https://wa.me/918920039125"
        target="_blank"
        hrefLang=""
        className="text-[#1043F9] flex justify-end w-[30vw] text-[10px] font-[400] font-poppins"
      >
        Send WhatsApp
      </a>
    </div>
  );
};

export default WhatsApp;
