// <<<<<<< HEAD
// import React,{useState,useRef} from "react";
// import {auth} from "../firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// // import Input from "../../../components/InputForm"
// import { IoPerson } from "react-icons/io5";

// // import Submit from "../components/submitButton";



// const LoginHeading = ({onOtpRequested})=> {
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: () => {
//           // Recaptcha solved
//         },
//       },
//       auth
//     );
//   };


//   const requestOTP = async () => {
//     setError("");
//     if (!phone) {
//       setError("Please enter a valid phone number.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setupRecaptcha();
//       const appVerifier = window.recaptchaVerifier;
//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         phone,
//         appVerifier
//       );
//       onOTPRequested(confirmationResult);
//     } catch (err) {
//       setError("Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };



 

  

// return(

//     <div className="bg-black h-fixed w-fixed overflow-hidden ">

//     <p className="text-white  text-[30px] font-[1000] font-poppins text-center ">
//         <div className="pt-10">
//           Doorstep Stitching 
          
          
//           </div>
//         </p>
//         <p className="text-white  text-[18px] font-[200] font-poppins text-center ">
        
//         welcome to the world of custom tailoring
//           </p>

//           <p className="text-white mt-10">Mobile Number</p>

//           <div className="h-[38px]  bg-[#F6F1F1] rounded-[5px] flex items-center mt-2">
//     <IoPerson  className="h-[20px] w-[40px] ml-[25px] text-gray-500" />
//     <input
//       placeholder="Mobile Number"
//       value={phone}
//       onChange={e=>setPhone(e.target.value)}
//       className="bg-transparent  outline-none font-poppins text-[11px] leading-[15px]"
//       type="text"
//     />
//   </div>

//   <div className="pt-40 pb-20">
//   <div className="flex items-center justify-center mt-10">
//         <button
//         onClick={requestOTP}
//         disabled={loading}
        
       
//           className="bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700 w-48 text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95"
         
//         >
//        {loading ? "Sending..." : "Send OTP"}
          
//         </button>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         <div id="recaptcha-container"></div>
//         </div>
//   </div>


  






//         </div>
// )





// }

// export default LoginHeading;
// =======
// import React from "react";
// // import Input from "../../../components/InputForm"
// import { IoPerson } from "react-icons/io5";

// import Submit from "../components/submitButton";

// const LoginHeading = () => {
//   return (
//     <div className="bg-black h-[70vh]">
//       <p className="text-white  text-[30px] font-[1000] font-poppins text-center ">
//         <div className="pt-10">Doorstep Stitching</div>
//       </p>
//       <p className="text-white  text-[18px] font-[200] font-poppins text-center ">
//         welcome to the world of custom tailoring
//       </p>

//       <p className="text-white mt-10">Mobile Number</p>

//       <div className="h-[38px]  bg-[#F6F1F1] rounded-[5px] flex items-center mt-2">
//         <IoPerson className="h-[20px] w-[40px] ml-[25px] text-gray-500" />
//         <input
//           placeholder="Mobile Number"
//           className="bg-transparent  outline-none font-poppins text-[11px] leading-[15px]"
//           type="text"
//         />
//       </div>

//       <Submit />
//     </div>
//   );
// };

// export default LoginHeading;
// >>>>>>> 74d9cce2f830739a05dcf10dab51ae88820c9da8
