import React, { useState, useRef, useEffect, useContext } from "react";
import { SlArrowRight } from "react-icons/sl";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import image1 from "../assets/images/imageNew.png";
import image2 from "../assets/images/images (1).png";
import image3 from "../assets/images/Lettering-T-shirts.png";
import DialogImage from "../assets/images/dialog-image.png";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Context Api/trackProduct";
import ReactGA from "react-ga4";

// const images = [image1, image2, image3];

function SimpleDialog({ open, onClose, gender, category, onSelection }) {
  const handleClose = () => {
    onClose();
  };

  const handleFabricSelection = (selection) => {
    onSelection(selection);
    onClose();
  };

  useEffect(() => {
    if (gender && category) {
    }
  }, [gender, category]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      classes={{ paper: "p-4 rounded-lg text-center" }}
    >
      <div className="flex flex-col items-center space-y-4">
        <img
          className="h-14 w-14 object-cover rounded-full"
          src={DialogImage}
          alt="Dialog Image"
        />
        <DialogTitle className="font-bold text-lg text-gray-800">
          Would you like to proceed with Fabric Selection?
        </DialogTitle>
        <p className="text-gray-600 text-sm px-6">
          Click ‘Yes’ if you want to buy the cloth as well. Click ‘No’ if you
          already have the fabric, which we’ll pick up during measurements.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleFabricSelection("Fabric")}
            className="px-6 py-2 bg-[#C65647] text-white rounded-md font-medium shadow hover:bg-[#b2463d]"
          >
            ‘Yes’ I want to purchase the fabric
          </button>
          <button
            onClick={() => handleFabricSelection("NoFabric")}
            className="px-6 py-2 text-[#1043F9] border-none rounded-md font-medium hover:bg-blue-50"
          >
            ‘No’, I already have the fabric
          </button>
        </div>
      </div>
    </Dialog>
  );
}

const ProductCart = ({
  label,
  price,
  styleName,
  gender,
  images,
  category,
  subCategory,
  onClick,
}) => {
  // const { setProduct, product } = useContext(ProductContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const imageBoxRef = useRef(null);

  // useEffect(() => {
  //   localStorage.setItem("productItem", JSON.stringify({ gender, category }));
  // }, [gender, category]);

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

  const handleOnclick = () => {
    ReactGA.event(category, {
      event_category: category,
      event_label: `Clicked ${category}-${subCategory}`,
      value: price, // Ensure 'price' is correctly referenced
      product_subcategory: subCategory,
    });

    navigate("/customize"); // Move this inside the function body
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFabricSelection = (selection) => {
    // setSelectedFabric(selection);
    // if (selection === "Fabric") {
    //   navigate("/fabric");
    // } else if (selection === "NoFabric") {
    //   navigate("/customize");
    // }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (imageBoxRef.current) {
        const scrollLeft = imageBoxRef.current.scrollLeft;
        const width = imageBoxRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / width);
        setCurrentIndex(newIndex);
      }
    };

    const imageBox = imageBoxRef.current;
    imageBox.addEventListener("scroll", handleScroll);

    return () => imageBox.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        onClick={onClick}
        className="outer-box h-[30vh] w-[45vw] mb-[20px]  rounded-lg p-1"
      >
        <div
          ref={imageBoxRef}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="image-box aspect-square flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-lg"
        >
          {images.map((image, index) => (
            <img
              onClick={handleOnclick}
              key={index}
              className={`h-full w-full flex-shrink-0 object-fit rounded-lg snap-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${
                currentIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
              src={`http://localhost:3000/uploads/${image}`}
              alt={`Product ${index + 1}`}
            />
          ))}
        </div>
        <div className="dots flex justify-center mt-2 space-x-1">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => scrollToImage(index)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-black" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
        <div className=" flex flex-col gap-1 mt-2">
          <h2 className="text-[12px] font-semibold">{subCategory}</h2>
          <p className="text-[12px] text-gray-600">
            Price: <span className="text-red-500">₹{price}</span>
          </p>
        </div>
      </div>
      {/* <SimpleDialog
        open={open}
        onClose={handleClose}
        gender={gender}
        category={category}
        onSelection={handleFabricSelection}
      /> */}
    </div>
  );
};

export default ProductCart;
