import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga4";

const Trending = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Trending Page",
    });
  }, []);
  //import ReactGA from "react-ga4";

  const getTrendingImages = async () => {
    try {
      const { data } = await axios.get(
        "https://apnadarzi-31.onrender.com/api/v1/landing/getTrendingPageImages"
      );

      if (data?.status !== "success") {
        navigate("/error");
        return;
      }

      const items = Array.isArray(data?.data) ? [...data.data] : [];
      while (items.length < 4) {
        items.push({ trendingImage: null, category: "Placeholder" });
      }

      setTrendingItems(items);
    } catch (error) {
      console.error("Error fetching trending items:", error);
      setTrendingItems([]);
      navigate("/error");
    }
  };

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
        event_label: `Clicked ${category} - ${gender}`,
      });
      navigate(`/TrendingProduct/${gender}/${category}`);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  useEffect(() => {
    getTrendingImages();
  }, []);

  return (
    <div className="px-4 mt-10 h-auto rounded-lg">
      <h1 className="font-poppins ml-1 font-bold text-[12px] leading-[18px]">
        Trending
      </h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {trendingItems.length > 0 ? (
          trendingItems.map((item, index) => (
            <div
              key={index}
              className="w-full cursor-pointer"
              onClick={() => handleImageClick(item.gender, item.category)}
            >
              {item.trendingImage ? (
                <img
                  className="h-[45vw] w-[45vw] object-cover rounded-lg"
                  src={`https://apnadarzi-31.onrender.com/uploads/${item.trendingImage}`}
                  alt={`Trending Image ${index + 1} - ${item.category}`}
                />
              ) : (
                <div className="h-[30vh] w-full bg-gray-300 rounded-lg flex items-center justify-center"></div>
              )}
            </div>
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>
    </div>
  );
};

export default Trending;
