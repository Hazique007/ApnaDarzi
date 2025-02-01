import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdHourglass } from "react-icons/io"; // Waiting icon
import TopNav from "../../components/TopNav";
import successAnimation from "../../assets/animations/order-placed.gif"; // Replace with your MP4 file path

const OrderPlacedSuccess = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProceed = () => {
    navigate("/Home");
  };

  return (
    <div className="mb-10">
      <TopNav />

      {/* Video Animation for Order Completion */}
      <div className="flex justify-center items-center pt-10">
        <img
          src={successAnimation}
          alt="Order Placed"
          style={{ width: 220, height: 180 }}
        />
      </div>

      {/* Heading */}
      <h2 className="text-2xl text-[#DA3A3A] text-center font-[600] mt-6">
        Order Confirmed
      </h2>

      {/* Steps */}
      <div className="flex flex-col items-start space-y-6 mt-10 mx-auto w-3/4">
        {/* Step 1: Order Placed */}
        <div className="flex items-center">
          <FaCheckCircle className="text-[#4CAF50] text-[22px] mr-4" />
          <span className="text-base font-poppins font-[500] text-[#4CAF50]">
            Order Placed - Done
          </span>
        </div>

        {/* Remaining Steps */}
        {[
          "Fabric Pickup - pending",
          "Measurement - pending",
          "Stitching - pending",
          "Apparel Delivery - pending",
          "Payment - pending",
          "Order Completed - pending",
        ].map((step, index) => (
          <div key={index} className="flex items-center">
            <IoMdHourglass className="text-[#D4A706] text-[22px] mr-4" />
            <span className="text-base font-poppins font-[500] text-[#D4A706]">
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex items-center justify-center mt-20">
        <button
          onClick={handleProceed}
          className="w-[314px] h-[50px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform active:scale-95"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderPlacedSuccess;
