// import React, { useState } from "react";
// <<<<<<< HEAD
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'




// import HeaderPhotos from "../../../components/Headerphoto";


// const LoginPage = () => {
//   const [phone, setPhone] = useState("");
  

//   return (
//     <div className="h-[110px] w-full rounded-[5px] pb-78 ">
//       <HeaderPhotos />

//       <div className="bg-black h-fixed w-fixed overflow-hidden ">

// <p className="text-white  text-[30px] font-[1000] font-poppins text-center ">
//     <div className="pt-10">
//       Doorstep Stitching 
      
      
//       </div>
//     </p>
//     <p className="text-white  text-[18px] font-[200] font-poppins text-center ">
    
//     welcome to the world of custom tailoring
//       </p>

//       <p className="text-white mt-10 font-[500] flex items-center">Mobile Number</p>
//       <PhoneInput country={"in"} value={phone} onChange={setPhone} className="flex items-center" />

     



// <div className="pt-40 pb-20">
// <div className="flex items-center justify-center mt-10">
//     <button
   
   
//       className="bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700 w-48 text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95"
     
//     >
//       Send Otp
   
//     </button> 
  
//     </div>
// </div>









//     </div>
// =======
// import { auth } from "../../../firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { IoPerson } from "react-icons/io5";
// import HeaderPhotos from "../../../components/Headerphoto";

// const LoginPage = ({ onOtpRequested }) => {
//   if (!auth) {
//     // console.log("Auth is Required");
//   }
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             console.log("Recaptcha solved successfully:", response);
//           },
//         },
//         auth
//       );
//     }
//   };

//   const requestOTP = async () => {
//     setError(""); // Reset error
//     if (!phone) {
//       setError("Please enter a valid phone number.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // No reCAPTCHA setup anymore
//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         `+91${phone}`, // Your country code + phone number
//         window.recaptchaVerifier // We no longer use recaptcha
//       );
//       onOtpRequested(confirmationResult); // Pass confirmation result to parent component
//     } catch (err) {
//       setError("Failed to send OTP. Try again.");
//       console.error("Error during OTP request:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-[110px] w-full rounded-[5px] pb-78">
//       <HeaderPhotos />

//       <div className="bg-black h-auto w-full overflow-hidden">
//         <p className="text-white text-[30px] font-[1000] font-poppins text-center pt-10">
//           Doorstep Stitching
//         </p>
//         <p className="text-white text-[18px] font-[200] font-poppins text-center">
//           Welcome to the world of custom tailoring
//         </p>

//         <p className="text-white mt-10">Mobile Number</p>
//         <div className="h-[38px] bg-[#F6F1F1] rounded-[5px] flex items-center mt-2">
//           <IoPerson className="h-[20px] w-[40px] ml-[25px] text-gray-500" />
//           <input
//             placeholder="Mobile Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="bg-transparent outline-none font-poppins text-[11px] leading-[15px]"
//             type="tel"
//           />
//         </div>

//         {error && <p className="text-red-500 mt-4">{error}</p>}

//         <div className="pt-20 pb-20 flex items-center justify-center">
//           <button
//             onClick={requestOTP}
//             disabled={loading}
//             className="bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 w-48 text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95"
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </div>
//         <div id="recaptcha-container"></div>
//       </div>
// >>>>>>> 74d9cce2f830739a05dcf10dab51ae88820c9da8
//     </div>
//   );
// };

// export default LoginPage;
