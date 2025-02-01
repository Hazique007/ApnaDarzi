import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import ReactGA from "react-ga4";

const SearchStyle = ({ gender }) => {
  const [maleData, setMaleData] = useState([]);
  const [femaleData, setFemaleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const [maleResponse, femaleResponse] = await Promise.all([
        axios.get(
          "https://apnadarzi-5.onrender.com/api/v1/category/getGenderWiseCategory",
          { params: { gender: "Male" } }
        ),
        axios.get(
          "https://apnadarzi-5.onrender.com/api/v1/category/getGenderWiseCategory",
          { params: { gender: "Female" } }
        ),
      ]);

      if (maleResponse.status !== 200 || femaleResponse.status !== 200) {
        navigate("/error");
        return;
      }

      setMaleData(maleResponse.data.data);
      setFemaleData(femaleResponse.data.data);
    } catch (error) {
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [gender]);
  console.log(maleData);

  const lab =
    gender === "Male" ? "Men" : gender === "Female" ? "Women" : "Unisex";
  const Label = lab
    ? `${lab.charAt(0).toUpperCase() + lab.slice(1)} Styles`
    : "Unisex Styles";

  const renderCategory = (data) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center">
          <BeatLoader size={10} color="#ff58e6" />
        </div>
      );
    }

    return data.map((item) => {
      const filteredProducts = item.products.filter(
        (product) => product.gender === gender
      );

      const uniqueSubCategories = [
        ...new Set(filteredProducts.map((product) => product.subCategory)),
      ];
      //Track Click
      const handleImageClick = async (gender, category, subCategory) => {
        try {
          await axios.post(
            "https://apnadarzi-5.onrender.com/api/v1/stats/trackClick",
            {
              gender,
              category,
            }
          );
          console.log("Clicked");
          ReactGA.event(category, {
            event_category: category,
            event_label: `Clicked ${product.category}`,
            product_subcategory: subCategory,
          });
          // navigate(`/product/${gender}/${category}/${subCategory}?`);
        } catch (error) {
          console.error("Error tracking click:", error);
        }
      };

      return (
        <div key={item.category} className="mb-6">
          <Link
            onClick={() => handleImageClick(gender, item.category)}
            to={`/product/${gender}/${item.category}`}
            className="text-[#DA3A3A] font-semibold text-md"
          >
            {item.category}
          </Link>
          <ul className="pl-4 list-none">
            {uniqueSubCategories.map((subCategory) => (
              <li key={subCategory} className="mb-2">
                <Link
                  className="text-[13px] font-normal text-gray-700 hover:text-[#DA3A3A] hover:underline"
                  to={`/product/${gender}/${item.category}/${subCategory}`}
                  onClick={() =>
                    handleImageClick(gender, item.category, subCategory)
                  }
                >
                  {subCategory}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="pl-4 mt-5 w-full">
      <h1 className="font-bold text-lg">{Label}</h1>
      <div className="mt-5 flex flex-wrap gap-8">
        {gender === "Male" && (
          <div className="w-full grid grid-cols-2 sm:w-1/2 lg:w-1/3">
            {renderCategory(maleData)}
          </div>
        )}

        {gender === "Female" && (
          <div className="w-full grid grid-cols-2 sm:w-1/2 lg:w-1/3">
            {renderCategory(femaleData)}
          </div>
        )}

        {gender === "Unisex" && (
          <>
            <div className="w-full sm:w-1/2 lg:w-1/3">
              {renderCategory(maleData)}
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3">
              {renderCategory(femaleData)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchStyle;
