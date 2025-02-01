import { Link } from "react-router-dom";

const StylingImageText = ({ img, text, onClick, link }) => {
  return (
    <Link
      to={link}
      className="flex-col  rounded-sm items-center justify-center text-center "
    >
      <div className="hover:bg-white">
        <img
          onClick={onClick}
          className="w-[10vw] object-fit  h-[10vw] rounded-sm"
          src={`https://apnadarzi-5.onrender.com/uploads/${img}`}
          alt=""
        />
      </div>
      <p className="text-[10px] mt-1 font-[400] leading-[15px] font-poppins">
        {text}
      </p>
    </Link>
  );
};

export default StylingImageText;
