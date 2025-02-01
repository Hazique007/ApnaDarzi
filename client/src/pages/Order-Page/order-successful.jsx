import React, { useEffect, useState } from "react";
import TopNav from "../../components/TopNav";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Green check icon
import { IoMdHourglass } from "react-icons/io"; // Waiting icon
import axios from "axios";
import successAnimation from "../../assets/animations/order-placed.gif";
import ReactGA from "react-ga4";

const OrderSuccessful = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState({
    fabricPickedUp: false,
    measurementDone: false,
    apparelDelivered: false,
    paymentReceived: false,
  });

  const { orderID } = useParams();
  const userID = localStorage.getItem("userID");

  // Fetch the order status from the backend using the orderID and userID
  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/agent/agentorderdetails?orderID=${orderID}&userID=${userID}`
      );
      console.log(response.data);

      if (response.status === 200) {
        const {
          fabricPickedUp,
          measurementDone,
          apparelDelivered,
          paymentReceived,
        } = response.data.data;
        setOrderStatus({
          fabricPickedUp,
          measurementDone,
          apparelDelivered,
          paymentReceived,
        });
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  useEffect(() => {
    fetchOrderStatus();
  }, [orderID, userID]);

  const handleProceed = () => {
    navigate("/Home");
  };

  return (
    <div className="mb-10">
      <TopNav />
      <div className="flex justify-center items-center pt-10">
        <img
          src={successAnimation}
          autoPlay
          loop={false}
          muted
          playsInline
          style={{ width: 220, height: 180 }}
        />
      </div>

      <h2 className="text-2xl text-[#DA3A3A] text-center font-[600] mt-4">
        Order Confirmed
      </h2>

      <div className="flex flex-col items-start space-y-6 mt-10 mx-auto w-3/4">
        {/* Step 1: Order Placed - Always Done */}
        <div className="flex items-center">
          <FaCheckCircle className="text-[#4CAF50] text-[22px] mr-4" />
          <span className="text-base font-poppins font-[500] text-[#4CAF50]">
            Order Placed - Done
          </span>
        </div>

        {/* Dynamic Order Steps */}
        {[
          { label: "Fabric Pickup", status: orderStatus.fabricPickedUp },
          { label: "Measurement", status: orderStatus.measurementDone },
          { label: "Apparel Delivery", status: orderStatus.apparelDelivered },
          { label: "Payment", status: orderStatus.paymentReceived },
          { label: "Order Completed", status: orderStatus.paymentReceived },
        ].map((step, index) => (
          <div key={index} className="flex items-center">
            {step.status ? (
              <FaCheckCircle className="text-[#4CAF50] text-[22px] mr-4" />
            ) : (
              <IoMdHourglass className="text-[#D4A706] text-[22px] mr-4" />
            )}
            <span
              className={`text-base font-poppins font-[500] ${
                step.status ? "text-[#4CAF50]" : "text-[#D4A706]"
              }`}
            >
              {step.label} - {step.status ? "Done" : "Pending"}
            </span>
          </div>
        ))}
      </div>

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

export default OrderSuccessful;
