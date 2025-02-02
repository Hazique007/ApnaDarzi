import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Pickup = () => {
  const validPincodes = [
    "226001",
    "226002",
    "226003",
    "226004",
    "226005",
    "226006",
    "226007",
    "226010",
    "226012",
    "226016",
    "226017",
    "226018",
    "226019",
    "226020",
    "226021",
    "226022",
    "226023",
    "226024",
    "226025",
    "226028",
    "226029",
    "226030",
    "226101",
    "226102",
    "226201",
    "226202",
    "226301",
    "227105",
    "227125",
  ];

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address1: "",
    address2: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const validateFields = (address) => {
    if (!address.name.trim()) return "Name is required";
    if (!address.address1.trim()) return "Address Line 1 is required";
    if (!address.address2.trim()) return "Address Line 2 is required";
    if (!address.pincode.trim()) return "Pincode is required";
    if (address.pincode.length !== 6) return "Pincode must be exactly 6 digits";
    if (!validPincodes.includes(address.pincode))
      return "This pincode is not serviceable";
    return "";
  };

  // const fetchAddresses = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://apnadarzi-311.onrender.com/getAddressByUser?userID=${localStorage.getItem(
  //         "userID"
  //       )}`
  //     );
  //     if (response.ok) {
  //       const result = await response.json();
  //       setAddresses(result.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching addresses:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAddresses();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateFields(newAddress);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    try {
      const response = await fetch(
        "https://apnadarzi-311.onrender.com/addAddressbyuserID",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newAddress,
            userID: localStorage.getItem("userID"),
          }),
        }
      );
      if (response.ok) {
        setNewAddress({
          name: "",
          address1: "",
          address2: "",
          pincode: "",
        });
        setShowForm(false);
        setShowModal(true);
        // Reload the page
        window.location.reload();
      } else {
        console.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  
  

  return (
    <div className="p-4 px-5 flex flex-col font-poppins">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-[13px]">
            Pick up and Delivery Details
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Pick up and Delivery Address
          </p>
        </div>
        <button
          className="pl-5 text-xs flex items-center bg-transparent hover:bg-blue-500 text-black font-medium hover:text-white py-1 px-3 border border-gray-300 hover:border-transparent rounded"
          onClick={() => setShowForm(!showForm)}
        >
          <FaMapMarkerAlt className="h-4 w-4 mr-1" />
          New Address
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded-md mt-4"
        >
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              name="name"
              value={newAddress.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="p-2 border border-gray-300 rounded text-sm"
              required
            />
            <input
              type="text"
              name="address1"
              value={newAddress.address1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
              className="p-2 border border-gray-300 rounded text-sm"
              required
            />
            <input
              type="text"
              name="address2"
              value={newAddress.address2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
              className="p-2 border border-gray-300 rounded text-sm"
              required
            />
            <input
              type="text"
              name="pincode"
              value={newAddress.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
              className="p-2 border border-gray-300 rounded text-sm"
              required
            />
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Modal for Address Successfully Added */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg font-medium mb-4">
              Address Successfully Added!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pickup;
