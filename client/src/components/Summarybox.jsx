import React from "react";

const SummaryBox = () => {
  return (
    
    <div className="flex items-center justify-between bg-[#f5f5f5] p-4 rounded-md">
      {/* Left Section */}
      <div>
        <p className="font-[700] text-[18px]">Order Summary</p>
        <p className="pt-2 font-[500] text-[12px]">Men Formal Shirt</p>
      </div>
      {/* Right Section */}
      <div className="text-right">
        <p className="text-[12px] text-[#737373]">Stitching Charges</p>
        <p className="text-[12px] font-[500]">Rs. 500</p>
      </div>
    </div>
  );
};

export default SummaryBox;
