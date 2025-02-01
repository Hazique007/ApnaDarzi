import React from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../../../components/TopNav";
import Navbar from "../../../components/Navbar";
import ReactGA from "react-ga4";

const HelpAndSupport = () => {
  const navigate = useNavigate();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  //import ReactGA from "react-ga4";
  return (
    <div className="min-h-screen bg-gray-100 font-poppins">
      <TopNav />
      {/* Header */}
      <div className="px-[11px] mt-[17px] ">
        <h1 className="font-poppins font-[700] text-[14px] text-[#737373] ">
          Help and Support
        </h1>
      </div>

      {/* Help Content */}
      <div className="pt-5 px-4">
        <div className="mx-auto mt-8 bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Need Help?
          </h2>
          <p className="text-gray-600 mb-4">Reach out to us:</p>
          <p className="text-gray-800">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:test@test.com"
              className="text-blue-500 hover:underline"
            >
              theglamthreads21@gmail.com
            </a>
          </p>
          <p className="text-gray-800 mt-2">
            <strong>Phone:</strong>{" "}
            <a href="tel:+8920039125" className="text-blue-500 hover:underline">
              8920039125
            </a>
          </p>
          <p className="text-gray-600 mt-4">
            We’ll be happy to assist you with your queries immediately.
          </p>

          <button
            onClick={() => navigate(-1)} 
            className="mt-6 w-full py-2 bg-gradient-to-r from-purple-500 to-red-400 text-white font-semibold rounded-lg hover:shadow-lg transition-transform transform active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default HelpAndSupport;
