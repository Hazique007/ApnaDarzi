import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShowSummary from "../../components/ShowSummary";
import Navbar from "../../components/Navbar";
import TopNav from "../../components/TopNav";
import SummaryBox from "../../components/Summarybox";
import Pickup from "../../components/pickup";
import Delivery from "../../components/deliverydetails";
import Works from "../../components/Works";
// import AddressManager from "../../components/addressmanager";
import OrderSummaryCard from "../../components/orderShowCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";

const OrderSummary = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(true);
  const summarySectionRef = useRef(null);
  const productItem = JSON.parse(localStorage.getItem("productItem"));
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const userID = localStorage.getItem("userID");

  const [formValues, setFormValues] = useState({
    pocket: "Single Pocket",
    sleeves: "Full Sleeves",
    threadColor: "White",
    buttonColor: "Black",
    collarStyle: "Regular",
    collarStiffness: "Medium",
    collarButton: "Zero",
    neckButton: "Yes",
    placket: "Standard",
    cuffStyle: "Round",
    cuffStiffness: "Soft",
    bottomCut: "Straight",
    shirtLength: "Regular",
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "https://apnadarzi-311.onrender.com/getAddressByUser",
          { params: { userID } }
        );

        if (response.data && response.data.data.length > 0) {
          setAddresses(response.data.data);

          // Select the first address if none is stored
          const savedAddress = JSON.parse(
            localStorage.getItem("selectedAddress")
          );
          if (savedAddress) {
            setSelectedAddress(savedAddress);
          } else {
            const firstAddress = response.data.data[0]._id;
            setSelectedAddress(firstAddress);
            localStorage.setItem(
              "selectedAddress",
              JSON.stringify(firstAddress)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userID]);

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  const handlePlaceOrder = async () => {
    if (!productItem) {
      toast.error("No product item data found. Please try again.");
      return;
    }

    if (!userID) {
      toast.error("No user ID found. Please login again.");
      return;
    }
    ReactGA.event("Order Placed", {
      event_category: productItem.category,
      event_label: `Clicked ${productItem.category} - ${productItem.gender}`,
      value: productItem.price,
    });

    if (!addresses || addresses.length === 0 || !selectedAddress) {
      toast.error("Please select an address.");
      return;
    }

    try {
      // Step 1: Store Selected Address in DB
      // const addressresponse = await axios.post("https://apnadarzi-311.onrender.com/api/v1/selectedaddress/save", {
      //   userID: userID,
      //   addressID: selectedAddress._id,
      // });
      // console.log("Address is", addressresponse);

      // Step 2: Proceed with Placing the Order
      const orderData = {
        category: productItem.category,
        categoryDescription: productItem.description,
        colors: [formValues.threadColor, formValues.buttonColor],
        customizationOptions: JSON.stringify(formValues),
        description: productItem.description,
        fabric: productItem.fabric,
        addressID: selectedAddress._id, // Store addressID in order
        gender: productItem.gender,
        images: productItem.images,
        isCustomized: true,
        name: productItem.name,
        price: productItem.price,
        sizes: productItem.sizes,
        stock: productItem.stock,
        subCategory: productItem.subCategory,
        userID: userID,
      };

      console.log(orderData);

      await axios.post(
        "https://apnadarzi-311.onrender.com/orders/create",
        orderData
      );
      navigate("/orderplaced");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        "An error occurred while placing the order. Please try again."
      );
    }
  };

  return (
    <div className="pb-20 font-poppins">
      <TopNav />
      <div className="mt-4 pb-5 space-y-5">
        <div ref={summarySectionRef}>
          <p className="text-center pt-5 pb-5 text-[#DA3A3A] text-[18px] font-[600]">
            Order Summary
          </p>
          <ShowSummary />
          <OrderSummaryCard />
          {/* <AddressManager /> */}

          <Pickup />
          <Delivery
            selectedAddress={selectedAddress}
            onSelect={handleAddressSelection}
          />
          <Works />
          <div className="flex items-center justify-center mt-6 pt-10">
            <button
              onClick={handlePlaceOrder}
              className="w-[280px] h-[45px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded-lg transition-transform transform active:scale-95"
            >
              Place Order
            </button>
          </div>
        </div>
        <Navbar />
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderSummary;
