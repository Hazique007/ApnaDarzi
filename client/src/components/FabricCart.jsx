import { useState, useRef } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const FabricCart = ({
  fabric,
  price,
  images,
  gender,
  category,
  subCategory,
}) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageBoxRef = useRef(null);

  // Scroll to a specific image
  const scrollToImage = (index) => {
    const imageBox = imageBoxRef.current;
    if (imageBox) {
      imageBox.scrollTo({
        left: index * imageBox.offsetWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <div className="outer-box h-[40vh] w-[45vw] mb-16 rounded-lg p-2 shadow-md bg-white">
      {/* Image Carousel */}
      <div
        ref={imageBoxRef}
        className="image-box h-[33vh] w-full flex overflow-hidden snap-x snap-mandatory scroll-smooth rounded-lg"
      >
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <img
              onClick={() => navigate("/customize")}
              key={index}
              className="h-full w-full object-fit flex-shrink-0  rounded-lg snap-center cursor-pointer"
              src={`http://localhost:3000/uploads/${image}`}
              alt={`Fabric ${index + 1}`}
            />
          ))
        ) : (
          <p className="text-center w-full flex items-center justify-center">
            No Images Available
          </p>
        )}
      </div>

      <div className="dots flex justify-center mt-2 space-x-1">
        {images &&
          images.map((_, index) => (
            <span
              key={index}
              onClick={() => scrollToImage(index)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-black" : "bg-gray-400"
              }`}
            ></span>
          ))}
      </div>

      <div className="text flex flex-col gap-2 mt-7">
        <h2 className="text-[12px] font-semibold">{fabric}</h2>
        <p className="text-[12px] text-gray-600">
          Price: {price ? `$${price}` : "N/A"}
        </p>
        <h2 className="text-[12px] text-yellow-600">
          <div className="flex items-center gap-1">
            {gender} <SlArrowRight className="text-[8px]" /> {category}{" "}
            {/* <SlArrowRight className="text-[8px]" /> {subCategory}{" "} */}
            <SlArrowRight className="text-[8px]" />
            {fabric}
          </div>
        </h2>
      </div>
    </div>
  );
};

export default FabricCart;
