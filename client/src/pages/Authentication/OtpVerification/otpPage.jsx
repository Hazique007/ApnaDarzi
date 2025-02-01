import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from "react-hot-toast";
import HeaderPhotos from "../../../components/Headerphoto";
import PhoneInput from "react-phone-input-2";
import ReactGA from "react-ga4";

const Otp = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Otp Page",
    });
  }, []);
  //import ReactGA from "react-ga4";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [termsChecked, setTermsChecked] = useState(true);
  const navigate = useNavigate();

  // Hardcoded values for testing/review purposes
  const HARDCODED_PHONE = "911223334444"; // Replace with your testing number
  const HARDCODED_OTP = "123456"; // Replace with your testing OTP

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
    } else {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  const onOTPVerify = async () => {
    setLoading(true);

    // if (phone === HARDCODED_PHONE && otp === HARDCODED_OTP) {
    //   toast.success("OTP verified successfully");
    //   localStorage.setItem("userID", "hardcodedUserID");
    //   navigate("/home");
    //   setLoading(false);
    //   return;
    // }

    try {
      const formattedPhone = "+" + phone;
      const response = await fetch(
        "https://apnadarzi-5.onrender.com/api/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: formattedPhone, otp: otp }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {
        localStorage.setItem("userID", data.user._id);
        toast.success("OTP verified successfully");
        navigate("/home");
      } else {
        toast.error("Invalid OTP. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // const onSignup = async () => {
  //   console.log(phone);

  //   if (phone === HARDCODED_PHONE) {
  //     console.log("check");

  //     toast.success("Welcome to our App");
  //     navigate("/home");

  //     return; // Exit the function completely
  //   } else {
  //     // Validate the phone number length
  //     if (phone.length !== 12) {
  //       console.log("start2");
  //       toast.error("Please enter a valid 10-digit mobile number.");
  //       return;
  //     }

  //     // Check terms agreement
  //     if (!termsChecked) {
  //       console.log("start3");
  //       toast.error("You must agree to the Terms and Conditions to proceed.");
  //       return;
  //     }
  //   }

  //   // If all validations pass, proceed to send the OTP
  //   setLoading(true);
  //   try {
  //     console.log("entering");

  //     const formattedPhone = "+" + phone;
  //     const response = await fetch(
  //       "https://apnadarzi-5.onrender.com/api/send-otp",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ phoneNumber: formattedPhone }),
  //       }
  //     );
  //     const data = await response.json();
  //     if (data.success) {
  //       setLoading(false);
  //       setShowOtp(true);
  //       toast.success("OTP sent successfully");
  //       setTimer(60);
  //     } else {
  //       setLoading(false);
  //       toast.error("Failed to send OTP");
  //     }
  //   } catch (error) {
  //     console.error("Error during OTP send:", error);
  //     setLoading(false);
  //     toast.error("Failed to send OTP. Please try again.");
  //   }
  // };

  const onSignup = async () => {
    console.log(phone);
    ReactGA.event("send-otp", {
      event_category: "OTP",
      event_label: "clicked on send otp",
    });

    if (phone === HARDCODED_PHONE) {
      console.log("check");

      toast.success("Welcome to our App");
      navigate("/home");

      return; // Exit the function completely
    } else {
      // Validate the phone number length
      if (phone.length !== 12) {
        console.log("start2");
        toast.error("Please enter a valid 10-digit mobile number.");
        return;
      }

      // Check terms agreement
      if (!termsChecked) {
        console.log("start3");
        toast.error("You must agree to the Terms and Conditions to proceed.");
        return;
      }
    }

    // If all validations pass, proceed to send the OTP
    setLoading(true);
    try {
      console.log("entering");

      const formattedPhone = "+" + phone;
      const response = await fetch(
        "https://apnadarzi-5.onrender.com/api/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: formattedPhone }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.success) {
        setLoading(false);
        setShowOtp(true);
        toast.success("OTP sent successfully");
        setTimer(60);
      } else {
        setLoading(false);
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error during OTP send:", error);
      setLoading(false);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  // const onSignup=()=>{
  //   navigate('/home')

  // }

  // const onOTPVerify = async () => {
  //   setLoading(true);

  //   // if (phone === HARDCODED_PHONE && otp === HARDCODED_OTP) {
  //   //   toast.success("OTP verified successfully");
  //   //   localStorage.setItem("userID", "hardcodedUserID");
  //   //   navigate("/home");
  //   //   setLoading(false);
  //   //   return;
  //   // }

  //   try {
  //     if(phone===HARDCODED_PHONE){
  //       const formattedPhone = "+" + HARDCODED_PHONE;
  //     const response = await fetch(
  //       "https://apnadarzi-5.onrender.com/api/verify-otp",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ phoneNumber: formattedPhone, otp: 123456 }),
  //       }
  //     );

  //     }else{

  //       const formattedPhone = "+" + phone;
  //     const response = await fetch(
  //       "https://apnadarzi-5.onrender.com/api/verify-otp",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ phoneNumber: formattedPhone, otp: otp }),
  //       }
  //     );
  //     }

  //     const data = await response.json();
  //     if (data.success) {
  //       localStorage.setItem("userID", data.user._id);
  //       toast.success("OTP verified successfully");
  //       navigate("/home");
  //     } else {
  //       toast.error("Invalid OTP. Please try again.");
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error during OTP verification:", error);
  //     setLoading(false);
  //     toast.error("Something went wrong. Please try again.");
  //   }
  // };
  // const onSignup = async () => {
  //   navigate("/home");
  // };
  // const onOTPVerify = async () => {
  //   setLoading(true);
  //   try {
  //     const formattedPhone = "+" + phone;
  //     console.log("api fetching");

  //     const response = await fetch(
  //       "https://apnadarzi-5.onrender.com/api/verify-otp",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ phoneNumber: formattedPhone, otp: otp }),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);

  //     if (data.success) {
  //       localStorage.setItem("userID", data.user._id);
  //       toast.success("OTP verified successfully");
  //       navigate("/home");
  //     } else {
  //       toast.error("Invalid OTP. Please try again.");
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error during OTP verification:", error);
  //     setLoading(false);
  //     toast.error("Something went wrong. Please try again.");
  //   }
  // };

  const resendOtp = async () => {
    setCanResend(false);
    setTimer(60);

    // if (phone === HARDCODED_PHONE) {
    //   toast.success("OTP resent successfully");
    //   return;
    // }

    try {
      const formattedPhone = "+" + phone;
      const response = await fetch(
        "https://apnadarzi-5.onrender.com/api/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: formattedPhone }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("OTP resent successfully");
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error during OTP resend:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <section className="items-center justify-center">
        <div className="flex flex-col">
          <Toaster toastOptions={{ duration: 2000 }} />

          <div className="h-screen w-full rounded-[10px]">
            <HeaderPhotos />
            <div className="bg-black h-[calc(100vh-21.5vh)]">
              <p className="text-white text-[32px] font-[1000] font-poppins text-center pt-10">
                Doorstep Stitching
              </p>
              <p className="text-gray-300 text-[12px] font-[200] font-poppins text-center">
                Welcome to the world of custom tailoring
              </p>

              {showOtp ? (
                <>
                  <p className="text-white text-center pt-10 text-[12px]">
                    Verification OTP is sent to your mobile number +{phone}
                  </p>

                  <div className="flex justify-center items-center pt-10">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      OTPLength={6}
                      autoFocus
                      otpType="number"
                      disabled={false}
                      className="otp-container"
                    />
                  </div>

                  <p className="text-white text-center pt-10">
                    Didn’t receive the OTP?
                  </p>
                  <p
                    className={`text-${
                      canResend ? "blue" : "gray"
                    }-600 text-center pt-2 cursor-pointer`}
                    onClick={canResend ? resendOtp : null}
                    style={{ pointerEvents: canResend ? "auto" : "none" }}
                  >
                    Resend OTP
                  </p>
                  <p className="text-white text-center pt-2">
                    {formatTime(timer)}
                  </p>

                  <div className="flex items-center justify-center mt-10">
                    <button
                      onClick={onOTPVerify}
                      className="bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 w-48
                        text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95 
                        items-center justify-center flex gap-1"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Verify</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center items-center p-4 py-5 mt-5">
                    <PhoneInput
                      placeholder="Mobile number"
                      country={"in"}
                      value={phone}
                      onChange={setPhone}
                      onlyCountries={["in"]}
                    />
                  </div>

                  <div className="flex items-center justify-center mt-5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="terms" className="text-gray-300 text-xs">
                      I agree to the
                      <a
                        href="https://doc-hosting.flycricket.io/glam-threads-terms-of-use/1af08242-8409-44bc-87c4-57ad3e81768b/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline ml-1 text-xs"
                      >
                        Terms and Conditions & Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div className="flex items-center justify-center mt-10">
                    <button
                      onClick={onSignup}
                      disabled={!termsChecked}
                      className={`bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 w-48
                        text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95 
                        items-center justify-center flex gap-1 ${
                          !termsChecked ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Send OTP</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Otp;
