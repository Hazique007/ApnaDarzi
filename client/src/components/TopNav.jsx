import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopNav = () => {
  const navigate = useNavigate();
  const [isServicible, setIsServicible] = useState(false);
  const [pincode, setPincode] = useState("");
  const [tempPincode, setTempPincode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [city, setCity] = useState("Lucknow");

  const lucknowPincodes = [
    "226001",
    "226002",
    "226003",
    "226004",
    "226005",
    "226006",
    "226007",
    "226008",
    "226009",
    "226010",
  ];

  useEffect(() => {
    const savedPincode = localStorage.getItem("pincode");
    if (savedPincode) {
      setPincode(savedPincode);
      setIsServicible(lucknowPincodes.includes(savedPincode));
      setCity("Lucknow");
    }
  }, []);

  const handleBackClick = () => {
    if (window.location.pathname !== "/Home") {
      console.log(window.location.pathname);

      navigate(-1);
    } else {
    }
  };

  const handleSave = () => {
    if (lucknowPincodes.includes(tempPincode)) {
      setPincode(tempPincode);
      setIsServicible(true);
      setCity("Lucknow");
      localStorage.setItem("pincode", tempPincode);
      setIsModalOpen(false);
    } else {
      toast.error("This pincode is not serviceable");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTempPincode("");
    if (!pincode || !lucknowPincodes.includes(pincode)) {
      setCity("Select City");
    }
  };

  const openModal = () => {
    setTempPincode(pincode || "");
    setIsModalOpen(true);
  };

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
        <p
          onClick={openModal}
          className={`${
            isServicible ? "text-white font-[500]" : "text-white"
          } leading-[18px] text-[12px] font-poppins font-[400] cursor-pointer`}
        >
          {city}
        </p>
      </div>
      {isModalOpen && (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Enter Pincode</h2>
            <input
              type="text"
              value={tempPincode}
              onChange={(e) => setTempPincode(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Enter Pincode"
            />
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TopNav;
