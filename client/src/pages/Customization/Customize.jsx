import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../../components/TopNav";
import Navbar from "../../components/Navbar";
import { MdArrowForwardIos } from "react-icons/md";
import C1 from "../../assets/images/c1.png";
import C2 from "../../assets/images/Hexagon.png";
import C3 from "../../assets/images/c3.png";
import C4 from "../../assets/images/c4.png";
import ReactGA from "react-ga4";

const Customize = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Customization Page",
    });
  }, []);
  //import ReactGA from "react-ga4";

  const productItem = JSON.parse(localStorage.getItem("productItem"));
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    pockets: "Single Pocket",
    sleeves: "Full Sleeves",
    thread: "White",
    collarStyle: "Regular",
    collarStiffness: "Medium",
    collarButton: "Zero",
    neckButton: "Yes",
    buttonColor: "Black",
    threadColor: "White",
    placket: "Standard",
    cuffStyle: "Round",
    cuffStiffness: "Soft",
    bottomCut: "Straight",
    shirtLength: "Regular",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const scrollContainerRef = useRef(null); // Added ref for scroll container

  const handleProceed = () => {
    ReactGA.event("customize_click", {
      event_category: "Proceed",
      event_label: "proceed from order customize",
    });

    navigate("/ordersummary");
  };
  // console.log(productItem);

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + productItem.images.length) % productItem.images.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % productItem.images.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleScroll = (event) => {
    if (scrolling) return;

    setScrolling(true);
    if (event.deltaY > 0) {
      handleNextImage();
    } else {
      handlePrevImage();
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setScrolling(false);
    }, 500); // Adjust debounce delay for smoother scroll
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    container.addEventListener("wheel", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, [scrolling]);

  // Horizontal scroll to specific index
  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <TopNav />
      <div className="px-[11px] mt-[17px] pb-24">
        <h1 className="font-poppins font-[700] flex gap-1 items-center text-[14px] text-[#737373] ">
          {productItem.gender === "Male" ? "Men" : "Women"}{" "}
          <MdArrowForwardIos /> {productItem.category} <MdArrowForwardIos />{" "}
          {productItem.subCategory}
        </h1>
        <div className="w-full text-center mt-[23px] gap-y-3 flex flex-col items-center justify-center">
          <h1 className="text-[17px] font-poppins font-[600] text-[#DA3A3A]">
            Customize
          </h1>

          <div
            ref={scrollContainerRef} // Added ref here
            id="carouselContainer"
            className="relative w-[320px] h-[282px] aspect-[1/1.5] sm:w-full sm:h-[350px] overflow-x-hidden overflow-y-hidden snap-x snap-mandatory scroll-smooth rounded-[10px] px-4"
          >
            <img
              src={`https://apnadarzi-31.onrender.com/uploads/${productItem.images[currentImageIndex]}`}
              alt="Customize clothing"
              className="w-full h-full object-fit rounded-[20px]"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
            >
              &#8249;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
            >
              &#8250;
            </button>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {productItem.images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    index === currentImageIndex
                      ? "bg-blue-500"
                      : "bg-gray-900 opacity-50"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-poppins font-[600] text-[16px]">
            About {productItem.subCategory}
          </h2>
          <p className="font-poppins font-[400] text-[13px] mt-1 text-gray-600">
            {productItem.description}
          </p>
        </div>
        <div className=" mt-[31px] bg-[#F1F1F180] rounded-[10px] p-4">
          <div className="flex w-full justify-between ">
            <h1 className="text-[16px] font-[700] font-poppins mb-2">
              Customize Your Style With:
            </h1>
          </div>

          <div className="flex flex-col gap-6 pt-5">
            <div className="r1 flex justify-around items-center ">
              <div className="flex flex-col items-start gap-1">
                <img src={C1} className="c1 w-[25px] h-[25px]" />
                <p className="text-[#AA3DF3] font-[700] text-[12px]">Style</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <img src={C2} className="c2 w-[50px] h-[50px]" />
                <p className="text-[#10E36C] font-[700] text-[12px]">
                  Look and Feel
                </p>
              </div>
            </div>
            <div className="r2 flex justify-around items-center">
              <div className="flex flex-col items-center justify-center gap-1">
                <img src={C3} className="c3 w-[25px] h-[25px]" />
                <p className="text-[#0099FF] text-[12px] font-[700]">
                  Thread Colours
                </p>
              </div>
              <div className=" flex flex-col items-center gap-1">
                <img src={C4} className="c3 w-[25px] h-[25px]" />
                <p className="text-[#FE6126] text-[12px] font-[700]">
                  Other Customizations
                </p>
              </div>
            </div>
            <p className="text-[12px] font-poppins italic font-[400] px-[13px] text-center">
              You can share all your customization needs with our tailor expert
              when he comes to take measurements.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={handleProceed}
            className="bg-gradient-to-r from-[#9C3FE4] to-[#C65647] text-white font-poppins text-[17px] font-[500] rounded-[15px] w-[314px] h-[50px] text-center"
          >
            Proceed
          </button>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Customize;
