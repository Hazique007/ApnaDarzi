import React, { useState, useEffect } from "react";
import axios from "axios";
import Topnav from "../../../components/TopNav";
import OrderSummaryCard from "../../../components/OrderSummarycard";
import { BeatLoader } from "react-spinners";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]); // To store fetched orders
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    // Fetch all orders from the API using Axios
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://apnadarzi-5.onrender.com/orders/getOrdersByUser",
          {
            params: { userID: userID },
          }
        );
        setOrders(response.data); // Assuming the API returns an array of orders
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Set the error message if something goes wrong
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userID]); // Empty dependency array ensures this runs once when the component is mounted

  const removeOrder = (orderId) => {
    // Update the UI state by filtering out the deleted order
    setOrders(orders.filter((order) => order._id !== orderId));
  };

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <BeatLoader color="#ff58e6" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" font-poppins flex flex-col  ">
      <Topnav />
      <div className="px-5 mt-[17px]">
        <h1 className="font-poppins font-[700] text-[14px] text-[#737373]">
          Order History
        </h1>
      </div>
      <div className="flex-1 flex justify-center items-center">
        {orders.length === 0 ? (
          <div className=" text-gray-500 text-center">No order history</div>
        ) : (
          <div className="pb-10 ">
            <div>
              {orders.map((order, index) => (
                <OrderSummaryCard
                  key={index}
                  order={order}
                  removeOrder={removeOrder}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Navbar at the bottom (if you have a navbar) */}
      {/* You can place your BottomNav component here */}
    </div>
  );
};

export default OrderHistoryPage;
