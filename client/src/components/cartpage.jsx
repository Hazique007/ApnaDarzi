import React from "react";
import TopNav from "./TopNav";
import Navbar from "./Navbar";

const CartPage = () => {
  return (
    <div>
      <TopNav />
      <div className="flex items-center justify-center h-screen bg-gradient-to-br ">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-700 mb-4 animate-bounce">
            Coming Soon!
          </h1>
          <p className="text-lg text-gray-600 mb-6 px-2">
          Exciting features are on the way. Check back with us soon!          </p>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default CartPage;
