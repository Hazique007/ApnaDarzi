import React, { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const OrderSummaryCard = ({ order, removeOrder }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userID = localStorage.getItem("userID");

  const handleRemove = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:3000/orders/${order._id}`
      );
      removeOrder(order._id);
      setLoading(false);
    } catch (error) {
      setError("Error removing order from frontend: " + error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Removing...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const { images, name, price, fabric, _id, deliveryDate } = order;

  return (
    <Link
      to={`/orderSuccessful/${userID}/${order._id}`}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        maxWidth: "430px",
        padding: "18px",
        margin: "8px auto",
        backgroundColor: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "30%",
          maxWidth: "140px",
          height: "120px", // Ensure image height matches the right side content
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          marginRight: "12px",
        }}
      >
        <img
          src={`http://localhost:3000/uploads/${images?.[0]}`}
          alt="Product"
          style={{
            width: "100%",
            height: "100%", // Make image height fill the container
            objectFit: "cover", // Keep the aspect ratio intact
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            fontSize: "0.9rem",
            margin: "0",
            fontWeight: "bold",
            marginBottom: "4px",
          }}
        >
          {name || "Product Name"}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "black",
            margin: "4px 0",
          }}
        >
          Rs. {price || "0"}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#555",
            margin: "4px 0",
          }}
        >
          Qty:1 | Fabric: {fabric || "Unknown"}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#555",
            margin: "4px 0",
          }}
        >
          Order date: {deliveryDate || "NA"}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#555",
            margin: "4px 0",
          }}
        >
          Order ID: {_id} {/* Display the order ID here */}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          {/* <p
            style={{
              fontSize: "12px",
              color: "#555",
            }}
          >
            Delivery in 3 days
          </p> */}
          {/* <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "12px",
              textDecoration: "underline",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={handleRemove}
          >
            Remove
          </button> */}
        </div>
      </div>
    </Link>
  );
};

export default OrderSummaryCard;
