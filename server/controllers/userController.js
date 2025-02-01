import Otp from "../models/UserSchema.js";
import otpVerification from "../helpers/otpValidate.js";
import otpGenerator from "otp-generator";
import twilio from "twilio";
import mongoose from "mongoose";

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TwilioClient = new twilio(accountSid, authToken);

export const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    console.log(req.body);

    // Find OTP data for the given phone number and OTP
    const OtpData = await Otp.findOne({
      phoneNumber,
      otp,
    });
    console.log(OtpData);

    // If no OTP data found, return error
    if (!OtpData) {
      return res.status(400).json({
        success: false,
        msg: "You entered the wrong OTP!",
      });
    }

    // Check if OTP is expired
    // const isOtpExpired = await otpVerification(OtpData.otpExpiration);
    // console.log(isOtpExpired); // Log if needed for debugging

    // // If OTP is expired, return error
    // if (isOtpExpired) {
    //   return res.status(400).json({
    //     success: false,
    //     msg: "OTP has expired",
    //   });
    // }

    // If OTP is valid, return success response
    return res.status(200).json({
      success: true,
      msg: "OTP verified successfully",
      user: OtpData,
    });
  } catch (error) {
    // Log error for debugging and return general error message
    console.error("Error in verifyOtp function:", error);
    return res.status(500).json({
      success: false,
      msg: "Error during OTP verification. Please try again.",
    });
  }
};

// export const sendOtp = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       specialChars: false,
//       lowerCaseAlphabets: false,
//     });

//     const cDate = new Date();
//     try {
//       await UserSchema.findOneAndUpdate(
//         { phoneNumber },
//         { otp, otpExpiration: new Date(cDate.getTime()) },
//         { upsert: true, new: true, setDefaultsOnInsert: true }
//       );
//     } catch (dbError) {
//       console.error("Error updating user OTP:", dbError);
//       return res.status(500).json({
//         success: false,
//         msg: "Database error while saving OTP.",
//       });
//     }

//     try {
//       await TwilioClient.messages.create({
//         body: `Your OTP for logging in Online Tailoring is: ${otp}`,
//         to: phoneNumber,
//         from: process.env.TWILIO_PHONE_NUMBER,
//       });
//     } catch (twilioError) {
//       console.error("Twilio error:", twilioError);
//       return res.status(500).json({
//         success: false,
//         msg: "Error sending OTP via Twilio.",
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       msg: "OTP Sent Successfully " + otp,
//     });
//   } catch (error) {
//     console.error("Error in sendOtp function:", error);
//     return res.status(500).json({
//       success: false,
//       msg: error.message,
//     });
//   }
// };

// export const verifyOtp = async (req, res) => {
//   try {
//     const { phoneNumber,otp } = req.body;
//     const OtpData = await Otp.findOne({
//       phoneNumber,
//       otp

//     });

//     if (!OtpData) {
//       return res.status(500).json({
//         success: false,
//         msg: "You entered the wrong OTP!",
//       });
//     }

//     const isotpExpired = await otpVerification(OtpData.otpExpiration);
//     if (isotpExpired) {
//       return res.status(500).json({
//         success: false,
//         msg: "OTP has expired",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       msg: "OTP verified successfully",
//       user: OtpData,
//     });
//   } catch (error) {
//     console.error("Error in verifyOtp function:", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Error during OTP verification. Please try again.",
//     });
//   }
// };

// export const sendOtp = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     console.log(req.body);

//     if (phoneNumber === HARDCODED_PHONE) {
//       try {

//       } catch (dbError) {
//         console.error("Error updating user OTP for hardcoded phone:", dbError);
//         return res.status(500).json({
//           success: false,
//           msg: "Database error while saving hardcoded OTP.",
//         });
//       }
//     }

//     // Generate OTP for other numbers
//     if (phoneNumber === HARDCODED_PHONE) {
//       otp = HARDCODED_OTP;
//     } else {
//       const otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//         specialChars: false,
//         lowerCaseAlphabets: false,
//       });
//     }

//     const cDate = new Date();
//     try {
//       await UserSchema.findOneAndUpdate(
//         { phoneNumber },
//         { otp, otpExpiration: new Date(cDate.getTime() + 5 * 60 * 1000) }, // OTP valid for 5 minutes
//         { upsert: true, new: true, setDefaultsOnInsert: true }
//       );
//     } catch (dbError) {
//       console.error("Error updating user OTP:", dbError);
//       return res.status(500).json({
//         success: false,
//         msg: "Database error while saving OTP.",
//       });
//     }

//     try {
//       await TwilioClient.messages.create({
//         body: `Your OTP for logging in Online Tailoring is: ${otp}`,
//         to: phoneNumber,
//         from: process.env.TWILIO_PHONE_NUMBER,
//       });
//     } catch (twilioError) {
//       console.error("Twilio error:", twilioError);
//       return res.status(500).json({
//         success: false,
//         msg: "Error sending OTP via Twilio.",
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       msg: "OTP Sent Successfully",
//     });
//   } catch (error) {
//     console.error("Error in sendOtp function:", error);
//     return res.status(500).json({
//       success: false,
//       msg: error.message,
//     });
//   }
// };

export const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);

    // if (!phoneNumber || typeof phoneNumber !== "string") {
    //   return res.status(400).json({
    //     success: false,
    //     msg: "Invalid phone number.",
    //   });
    // }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(otp);

    const cDate = new Date();

    // Check database connection
    if (!mongoose.connection.readyState) {
      console.error("Database not connected.");
      return res.status(500).json({
        success: false,
        msg: "Database connection error.",
      });
    }

    try {
      const updatedOtp = await Otp.findOneAndUpdate(
        { phoneNumber },
        { otp, otpExpiration: new Date(cDate.getTime() + 5 * 60 * 1000) }, // OTP valid for 5 minutes
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (!updatedOtp) {
        throw new Error("Failed to update or create OTP entry.");
      }
    } catch (dbError) {
      console.error("Error updating user OTP:", dbError.message, dbError);
      return res.status(500).json({
        success: false,
        msg: dbError,
      });
    }

    // Send OTP using Twilio
    try {
      await TwilioClient.messages.create({
        body: `Your OTP for logging in Online Tailoring is: ${otp}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
    } catch (twilioError) {
      console.error("Twilio error:", twilioError);
      return res.status(500).json({
        success: false,
        msg: "Error sending OTP via Twilio.",
      });
    }

    return res.status(201).json({
      success: true,
      msg: "OTP Sent Successfully",
    });
  } catch (error) {
    console.error("Error in sendOtp function:", error.message, error);
    return res.status(500).json({
      success: false,
      msg: "An unexpected error occurred while sending OTP.",
    });
  }
};

export const getUserdetials = async (req, res) => {
  const { userID } = req.query;

  try {
    const user = await Otp.findById(userID);

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user details" });
  }
};
