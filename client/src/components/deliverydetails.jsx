import React, { useState, useEffect } from "react";
import axios from "axios";

const Delivery = ({ selectedAddress, onSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getAddressByUser",
          { params: { userID } }
        );

        console.log("API Response:", response); // Debugging

        // Ensure response is JSON
        if (!response.data || typeof response.data !== "object") {
          throw new Error("Invalid API response format");
        }

        if (response.data.data && response.data.data.length > 0) {
          let fetchedAddresses = response.data.data;

          // Retrieve saved address from local storage
          let savedAddress = localStorage.getItem("selectedAddress");
          let selected;

          if (savedAddress) {
            try {
              savedAddress = JSON.parse(savedAddress);
              selected = fetchedAddresses.find(
                (addr) => addr._id === savedAddress._id
              );
            } catch (e) {
              console.error("Error parsing local storage address:", e);
              localStorage.removeItem("selectedAddress"); // Remove corrupted data
            }
          }

          if (!selected) {
            // Select the first address by default if no valid saved address
            selected = fetchedAddresses[0];
            localStorage.setItem("selectedAddress", JSON.stringify(selected));
          }

          onSelect(selected);

          // Move selected address to the top
          fetchedAddresses = [
            selected,
            ...fetchedAddresses.filter((addr) => addr._id !== selected._id),
          ];

          setAddresses(fetchedAddresses);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (!sessionStorage.getItem("hasReloaded")) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    } else {
      fetchAddresses(); // Fetch profile data
    }

    ;
  }, [userID]);

  const handleAddressChange = (event) => {
    const selectedId = event.target.value;
    const selectedAddressObject = addresses.find(
      (addr) => addr._id === selectedId
    );

    if (selectedAddressObject) {
      onSelect(selectedAddressObject);
      localStorage.setItem(
        "selectedAddress",
        JSON.stringify(selectedAddressObject)
      );

      // Move selected address to the top
      setAddresses((prevAddresses) => [
        selectedAddressObject,
        ...prevAddresses.filter(
          (addr) => addr._id !== selectedAddressObject._id
        ),
      ]);
    }
  };

  const toggleView = () => {
    setShowAll(!showAll);
  };

  const displayedAddresses = showAll ? addresses : addresses.slice(0, 3);

  return (
    <div className="p-4 rounded-md pl-4">
      {addresses.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          No address found. Please add one.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-start">
          {displayedAddresses.map((address) => (
            <label
              key={address._id}
              className="flex items-center w-full mb-3 font-poppins cursor-pointer"
            >
              <input
                type="radio"
                value={address._id}
                checked={selectedAddress && selectedAddress._id === address._id}
                onChange={handleAddressChange}
                className="w-4 h-4 mr-3"
              />
              <div className="text-left">
                <p className="text-[14px]">Deliver to: {address.name}</p>
                <p className="text-[12px]">{address.address1}</p>
                <p className="text-[12px]">{address.address2}</p>
                <p className="text-[12px] font-bold">
                  Pincode: {address.pincode}
                </p>
              </div>
            </label>
          ))}
        </div>
      )}

      <button
        onClick={toggleView}
        className="ml-auto px-4 py-2 text-[#1043F9] font-[500] pt-5 text-[12px]"
      >
        {showAll ? "Show less..." : "View more..."}
      </button>
    </div>
  );
};

export default Delivery;
