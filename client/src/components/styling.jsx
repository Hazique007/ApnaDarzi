import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StylingImageText from "./styling-img-text";
import { useEffect, useState } from "react";
import { BeatLoader, SyncLoader, ClipLoader } from "react-spinners";
import ReactGA from "react-ga4";

export const DesignStyling = () => {
  return (
    <>
      <Styling gender="Male" heading="Men Styling" />
      <Styling gender="Female" heading="Women Styling" />
    </>
  );
};

const Styling = ({ heading, gender }) => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  //import ReactGA from "react-ga4";
  const [categoryArray, setCategoryArray] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // console.log(categoryArray);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "https://apnadarzi-311.onrender.com/api/v1/category/fetchcategories",
        {
          params: { gender },
        }
      );

      if (response.data.categories) {
        setCategoryArray(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [gender]);

  const handleImageClick = async (gender, category) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://apnadarzi-311.onrender.com/api/v1/stats/trackClick",
        {
          gender,
          category,
        }
      );
      if (res) {
        setLoading(false);
      }
      ReactGA.event(category, {
        event_category: category,
        event_label: `Clicked ${category}-${gender}`,
      });

      navigate(`/product/${gender}/${category}`);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
    //<SyncLoader color="#ff58e6" />
  };
  if (loading) {
    return (
      <div className="w-full flex justify-center  h-[20vh] text-[12px] top-5 items-center">
        <ClipLoader size={20} color="#ff58e6" />
      </div>
    );
  }
  return (
    <div>
      <div className="pt-5 w-full flex justify-between px-[10px] mt-3">
        <h1 className="text-[12px] ml-[10px] font-poppins leading-[18px] font-[700]">
          {heading}
        </h1>
        <Link
          className="text-[12px] text-[#1043F9] leading-[15px]"
          to={`/product/${gender}`}
        >
          View All
        </Link>
      </div>
      <div className="images flex w-full mt-3 px-[19px] justify-between">
        {categoryArray.map((element) => (
          <StylingImageText
            key={element._id}
            onClick={() => handleImageClick(element.gender, element.category)}
            text={element.category}
            img={element.categoryImages}
            alt={`${element.category} image`}
          />
        ))}
      </div>
    </div>
  );
};

export default DesignStyling;
