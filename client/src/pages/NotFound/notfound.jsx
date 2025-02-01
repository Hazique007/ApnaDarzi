import React from "react";
import { Link } from "react-router-dom";
import TopNav from "../../components/TopNav";

const NotFound = () => {
  return (
    <div>
      <TopNav />
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
        <h1 className="text-6xl font-bold text-pink-600">404</h1>
        <p className="text-lg text-gray-700 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/Home"
          className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-md text-sm hover:bg-pink-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
