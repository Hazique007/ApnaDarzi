const otpVerification = async (otpTime) => {
    try {
      const currentTime = new Date().toISOString(); // Get the current time in UTC
      console.log("OTP Expiration Time:", otpTime);
      console.log("Current Time:", currentTime);
  
      const otpTimeDate = new Date(otpTime); // Convert OTP expiration to Date object
      const currentTimeDate = new Date(currentTime); // Convert current time to Date object
  
      if (otpTimeDate > currentTimeDate) {
        console.log("OTP is valid.");
        return true; // OTP is valid
      }
  
      console.log("OTP has expired.");
      return false; // OTP has expired
    } catch (error) {
      console.error("Error during OTP verification:", error.message);
      return false; // Handle unexpected errors
    }
  };
  
  export default otpVerification;