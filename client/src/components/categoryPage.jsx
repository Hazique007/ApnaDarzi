import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import TopNav from "./TopNav";
import ReactGA from "react-ga4";

const CategoryPage = () => {
  const { gender } = useParams();
  const [categoryArray, setCategoryArray] = useState([]);
  const navigate = useNavigate();

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

  // Function to handle category clicks
  const handleCategoryClick = (category) => {
    ReactGA.event(category, {
      event_category: category,
      event_label: `Clicked ${category} ${gender}`,
    });
    navigate(`/product/${gender}/${category}`);
  };

  useEffect(() => {
    getCategory();
  }, [gender]);

  return (
    <div>
      <TopNav />
      <div className="category-page bg-gray-100 min-h-screen py-6">
        <h1 className="text-3xl font-extrabold text-center my-6 text-gray-800">
          {gender === "Male"
            ? "Men's Categories"
            : gender === "Female"
            ? "Women's Categories"
            : "Categories"}
        </h1>
        <div className="category-list grid grid-cols-2 gap-6 px-6">
          {categoryArray.length > 0 ? (
            categoryArray.map((element) => (
              <div
                key={element._id}
                onClick={() => handleCategoryClick(element.category)}
                className="cursor-pointer flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-[100px] h-[100px]">
                  <img
                    src={`https://apnadarzi-311.onrender.com/uploads/${element.categoryImages}`}
                    alt={`${element.category} image`}
                    className="w-full h-full object-fit rounded-md border-2 border-gray-200"
                  />
                </div>
                <p className="mt-3 text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 text-center">
                  {element.category}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center col-span-2 text-gray-500">
              Loading categories...
            </div>
          )}
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default CategoryPage;
