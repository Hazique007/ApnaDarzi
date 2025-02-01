import React, { useState } from "react";

// import { useNavigate } from 'react-router-dom';

const OtpHeading = ({ confirmationResult }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const verifyOTP = async () => {
    setError("");
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      setSuccess(true);
    } catch (err) {
      setError("Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <h1 className="text-center text-2xl">Login Successful!</h1>;
  }

  return (
    <div className="bg-black h-[800px]">
      <p className="text-white  text-[30px] font-[1000] font-poppins text-center ">
        <div className="pt-10">Doorstep Stitching</div>
      </p>
      <p className="text-white  text-[18px] font-[200] font-poppins text-center ">
        welcome to the world of custom tailoring
      </p>

      <p className="text-white text-center pt-10 text-[12px]">
        Verification OTP is sent on Mobile Number User’s Mobile Number
      </p>

      <p className="text-white pt-10 pl-10">Otp</p>
      <div className="h-[38px]  bg-[#F6F1F1] rounded-[5px] flex items-center mt-2">
        <input
          placeholder="Enter Otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="bg-transparent  outline-none font-poppins text-[11px] leading-[15px] pl-10"
          type="text"
        />
      </div>

      <p className="text-white text-center pt-10">Didn’t receive the OTP?</p>

      <a href="www.google.com">
        <p className="text-blue-600 text-center pt-2">Resend OTP</p>
      </a>

      <div className="flex items-center justify-center mt-10">
        <button
          onClick={verifyOTP}
          disabled={loading}
          className="bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700 w-48 text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};
export default OtpHeading;
