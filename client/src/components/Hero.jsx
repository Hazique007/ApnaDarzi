import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import ReactGA from "react-ga4";

const Hero = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Banner Page",
    });
  }, []);
  //import ReactGA from "react-ga4";

  const [landingArray, setLandingArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch Landing Page Images
  const getLandingImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://apnadarzi-31.onrender.com/api/v1/landing/getLandingPageImages"
      );
      if (data.status !== "success") {
        navigate("/error");
        return;
      }

      const images = data.data?.flatMap((item) => item.bannerImages) || [];
      setLandingArray(images);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching landing images:", error);
      setLandingArray([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLandingImages();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (landingArray.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex =
            prevIndex === landingArray.length - 1 ? 0 : prevIndex + 1;
          scrollToIndex(nextIndex);
          return nextIndex;
        });
      }, 3500); // Scroll every 3.5 seconds
      return () => clearInterval(interval);
    }
  }, [landingArray]);

  // Scroll to a specific index
  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  // Manual scrolling sync
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(
        scrollLeft / scrollContainerRef.current.offsetWidth
      );
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Navigate to product page
  const handleImageClick = async (gender, category) => {
    try {
      await axios.post(
        "https://apnadarzi-31.onrender.com/api/v1/stats/trackClick",
        {
          gender,
          category,
        }
      );
      ReactGA.event(category, {
        event_category: category,
        event_label: `Clicked ${category}-${gender}`,
      });

      navigate(`/product/${gender}/${category}`);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  // Handle dot click
  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
    scrollToIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <BeatLoader color="#ff58e6" />
      </div>
    );
  }

  return (
    <div className="relative h-[182px] w-full mt-[11px] overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex h-[182px] w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
        {landingArray.length > 0 ? (
          landingArray.map((image, index) => (
            <div
              key={index}
              className="w-full h-[182px] flex-shrink-0 snap-center"
            >
              <img
                src={`https://apnadarzi-31.onrender.com/uploads/${image.image}`}
                onClick={() => handleImageClick(image.gender, image.category)}
                className="h-[182px] w-full rounded-[5px] cursor-pointer"
                alt={`Hero Image ${index + 1}`}
              />
            </div>
          ))
        ) : (
          <div className="h-[182px] w-full bg-gray-300 rounded-[5px]"></div>
        )}
      </div>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {landingArray.map((_, index) => (
          <div
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
              index === currentIndex
                ? "bg-blue-500 scale-125"
                : "bg-gray-400 hover:bg-blue-300 scale-75"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
