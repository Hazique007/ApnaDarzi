import React, { useState, useEffect } from "react";
import TopNav from "../../../components/TopNav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllAddresses = () => {
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
  ]; // Allowed PIN codes
  const [addresses, setAddresses] = useState([]); // Store addresses
  const [newAddress, setNewAddress] = useState({
    name: "",
    address1: "",
    address2: "",
    pincode: "",
  });
  const [editingAddress, setEditingAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getAddressByUser",
          {
            params: { userID: userID },
          }
        );

        // Ensure that response data is set correctly
        if (response.data && response.data.data) {
          setAddresses(response.data.data); // Use the correct response structure
        } else {
          console.error("No addresses found for this user");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userID]);

  const handleInputChange = (event, key) => {
    const value = event.target.value;
    if (key === "pincode") {
      if (!/^\d*$/.test(value)) {
        toast.error("Pincode can only contain numbers"); // Show toast instead of alert
        return;
      }
    }
    if (editingAddress) {
      setEditingAddress({ ...editingAddress, [key]: value });
    } else {
      setNewAddress({ ...newAddress, [key]: value });
    }
  };

  const validateFields = (address) => {
    if (!address.name.trim()) return "Name is required";
    if (!address.address1.trim()) return "Address Line 1 is required";
    if (!address.address2.trim()) return "Address Line 2 is required";
    if (!address.pincode.trim()) return "Pincode is required";

    if (address.pincode.length !== 6) return "Pincode must be exactly 6 digits";
    if (!validPincodes.includes(address.pincode))
      return "This pincode is not serviceable"; // Change to toast on validation failure

    return "";
  };

  const handleAddAddress = async () => {
    const errorMessage = validateFields(newAddress);
    if (errorMessage) {
      toast.error(errorMessage); // Show toast instead of alert
      return;
    }

    const currentUserID = localStorage.getItem("userID");

    try {
      // Assuming userID is available, you can either pass it from state or props
      const updatedAddress = { ...newAddress, userID: currentUserID }; // Add userID to the address object

      const response = await fetch(
        "http://localhost:3000/addAddressbyuserID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAddress),
        }
      );
      console.log(updatedAddress);

      console.log(response);

      if (response.ok) {
        const result = await response.json();
        setAddresses([...addresses, result.data]);
        setNewAddress({ name: "", address1: "", address2: "", pincode: "" });
        setIsModalOpen(false);
      } else {
        console.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleEditAddress = async () => {
    const errorMessage = validateFields(editingAddress);
    if (errorMessage) {
      toast.error(errorMessage); // Show toast instead of alert
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/update/${editingAddress._id}`,
        editingAddress
      );
      if (response.data) {
        setAddresses(
          addresses.map((addr) =>
            addr._id === editingAddress._id ? response.data.data : addr
          )
        );
        setEditingAddress(null);
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/delete/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setAddresses(addresses.filter((addr) => addr._id !== id));
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div>
      <TopNav />
      <div className="px-5 mt-[17px]">
        <h1 className="font-poppins font-[700] text-[14px] text-[#737373]">
          My Addresses
        </h1>
      </div>

      <div className="grid gap-6 p-6">
        {addresses.length === 0 ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-gray-500 text-center ">No address added</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address._id}
              className=" justify-between items-center bg-gray-100 p-4 rounded-md "
            >
              {editingAddress && editingAddress._id === address._id ? (
                <div className="flex flex-col">
                  <label className="text-sm font-semibold">Name</label>
                  <input
                    type="text"
                    value={editingAddress.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    className="mb-2 p-2 border rounded"
                    placeholder="Name"
                  />
                  <label className="text-sm font-semibold">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    value={editingAddress.address1}
                    onChange={(e) => handleInputChange(e, "address1")}
                    className="mb-2 p-2 border rounded"
                    placeholder="Address Line 1"
                  />
                  <label className="text-sm font-semibold">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={editingAddress.address2}
                    onChange={(e) => handleInputChange(e, "address2")}
                    className="mb-2 p-2 border rounded"
                    placeholder="Address Line 2"
                  />
                  <label className="text-sm font-semibold">Pincode</label>
                  <input
                    type="text"
                    value={editingAddress.pincode}
                    onChange={(e) => handleInputChange(e, "pincode")}
                    className="p-2 border rounded"
                    placeholder="Pincode"
                  />
                </div>
              ) : (
                <div>
                  <p className="font-bold">{address.name}</p>
                  <p>{address.address1}</p>
                  <p>{address.address2}</p>
                  <p className="text-sm font-semibold">
                    Pincode: {address.pincode}
                  </p>
                </div>
              )}
              <div className="flex space-x-2 items-center">
                {editingAddress && editingAddress._id === address._id ? (
                  <>
                    <button
                      onClick={handleEditAddress}
                      className="px-4 py-2 bg-green-500 text-white rounded-md mt-4"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md mt-4"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setEditingAddress(null)}
                      className="ml-auto text-blue-500 hover:underline mt-8 pl-28"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingAddress(address)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md mt-4"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white h-14 w-14 flex items-center justify-center rounded-full shadow-lg text-2xl"
      >
        +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                value={newAddress.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="p-2 border rounded"
                placeholder="Name"
              />
              <label className="text-sm font-semibold">Address Line 1</label>
              <input
                type="text"
                value={newAddress.address1}
                onChange={(e) => handleInputChange(e, "address1")}
                className="p-2 border rounded"
                placeholder="Address Line 1"
              />
              <label className="text-sm font-semibold">Address Line 2</label>
              <input
                type="text"
                value={newAddress.address2}
                onChange={(e) => handleInputChange(e, "address2")}
                className="p-2 border rounded"
                placeholder="Address Line 2"
              />
              <label className="text-sm font-semibold">Pincode</label>
              <input
                type="text"
                value={newAddress.pincode}
                onChange={(e) => handleInputChange(e, "pincode")}
                className="p-2 border rounded"
                placeholder="Pincode"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllAddresses;
