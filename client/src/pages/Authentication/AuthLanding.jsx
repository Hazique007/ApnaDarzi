import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";
import ReactGA from "react-ga4";

const AuthLanding = () => {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userID) {
        navigate("/Home");
      } else {
        navigate("/otp");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-black h-40 w-full">
        <p className="text-white text-center font-[1000] text-[30px] pt-10">
          Doorstep Stitching
        </p>
        <p className="text-white text-center font-[200] text-[18px]">
          welcome to the world of custom tailoring
        </p>
      </div>
      <AuthHeader />
    </div>
  );
};

export default AuthLanding;
