import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga4";

const Fashion = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Fashion and Styling Page",
    });
  }, []);
  //import ReactGA from "react-ga4";
  const [fashionImages, setFashionImages] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchFashionImages = async () => {
    try {
      const { data } = await axios.get(
        "https://apnadarzi-311.onrender.com/api/v1/landing/getFashionPageImages"
      );
      if (data.status !== "success") {
        navigate("/error");
        return;
      }

      const images = data.data;
      const placeholders = Array.from(
        { length: 8 - images.length },
        (_, i) => ({
          fashionImage: null,
          category: "Placeholder",
          gender: "Unknown",
          _id: `placeholder-${i}`,
        })
      );

      setFashionImages([...images, ...placeholders]);
    } catch (err) {
      console.error("Error fetching fashion images:", err);
      setError(true);
    }
  };

  const handleImageClick = async (gender, category) => {
    try {
      await axios.post(
        "https://apnadarzi-311.onrender.com/api/v1/stats/trackClick",
        {
          gender,
          category,
        }
      );
      ReactGA.event(category, {
        event_category: category,
        event_label: `Clicked ${product.category}`,
        value: product.price,
        product_subcategory: product.subCategory,
      });
      navigate(`/FashionProduct/${gender}/${category}`);
    } catch (err) {
      console.error("Error tracking click:", err);
    }
  };

  useEffect(() => {
    fetchFashionImages();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error loading fashion images. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="px-[15px] mt-10 rounded-[10px]">
      <h1 className="font-poppins ml-[6px] font-[700] text-[12px] leading-[18px]">
        Fashion and Style Highlights
      </h1>

      <div className="images grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {fashionImages.length > 0 ? (
          fashionImages.map((image, index) => (
            <div
              key={image._id || `image-${index}`}
              className="w-full cursor-pointer"
              onClick={() =>
                handleImageClick(image.gender || "Unknown", image.category)
              }
            >
              {image.fashionImage ? (
                <img
                  className="h-[45vw] w-[45vw] object-cover rounded-[10px]"
                  src={`https://apnadarzi-311.onrender.com/uploads/${image.fashionImage}`}
                  alt={image.category || "Fashion Item"}
                />
              ) : (
                <div className="h-[30vh] w-full bg-gray-300 rounded-[10px] animate-pulse"></div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center w-full">Loading images...</p>
        )}
      </div>
    </div>
  );
};

export default Fashion;
