import React  from "react";

import { useNavigate } from 'react-router-dom';


const Submit = ()=> {

  const navigate = useNavigate();

  const goToOtpPage = () => {
    navigate('/otp');
  };

    return (
        <div className="flex items-center justify-center mt-10">
        <button
        onClick={goToOtpPage}
       
          className="bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700 w-48 text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95"
         
        >
          Submit
          
        </button>
        </div>
      );




}

export default Submit;