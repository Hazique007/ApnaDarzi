import React from "react";

const ShowSummary = () => {
  const ProductItem = JSON.parse(localStorage.getItem("productItem"));

  return (
    <div className="font-poppins p-5 space-y-5">
      {/* Wrapper for card */}
      <div className="w-full max-w-md mx-auto bg-white rounded-xl border border-black p-4">
        <div className="flex flex-wrap justify-between items-start">
          {/* Left column */}
          <div className="flex flex-col space-y-2 w-1/2 md:w-auto">
            <p className="font-medium text-gray-700 text-sm">Total Amount</p>
            <p className="font-medium text-gray-700 text-sm">Payment Mode</p>
          </div>
          {/* Right column */}
          <div className="flex flex-col space-y-2 text-right w-1/2 md:w-auto">
            <p className="font-semibold text-black text-sm">Rs. {ProductItem?.price || 0}</p>
            <p className="font-medium text-black text-sm">Cash On Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSummary;
