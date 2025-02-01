import { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { generate } from "otp-generator";

const ListingComponent = () => {
  const [maleData, setMaleData] = useState([]);
  const [femaleData, setFemaleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch categories for both genders
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const [maleResponse, femaleResponse] = await Promise.all([
        axios.get(
          "http://localhost:3000/api/v1/category/getGenderWiseCategory",
          { params: { gender: "Male" } }
        ),
        axios.get(
          "http://localhost:3000/api/v1/category/getGenderWiseCategory",
          { params: { gender: "Female" } }
        ),
      ]);

      if (maleResponse.status === 200 && femaleResponse.status === 200) {
        setMaleData(maleResponse.data.data);
        setFemaleData(femaleResponse.data.data);
      } else {
        console.error("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleNavigate = (gender, category, subCategory) => {
    navigate(`/listing/${gender}/${category}/${subCategory}`);
  };
  const handleNavigateCategory = (gender, category) => {
    navigate(`/listing/${gender}/${category}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BeatLoader size={10} color="#ff58e6" />
      </div>
    );
  }

  return (
    <div className="mt-[20px] px-[23px]">
      {/* Male Categories */}
      {maleData.length > 0 && (
        <>
          {/* <h2 className="font-poppins font-[700] text-[16px] text-[#0A2481] mb-[10px]">
            Men's Categories
          </h2> */}
          {maleData.map((category) => (
            <div key={category.category} className="mb-[15px]">
              {/* Category */}
              <div className="category h-[27px] py-[4px] rounded-[10px] px-[10px] border-[1px] border-[#737373] flex justify-between items-center">
                <h2 className="font-poppins font-[600] text-[14px]">
                  Men - {category.category}
                </h2>
                <button
                  onClick={() =>
                    handleNavigateCategory("Male", category.category)
                  }
                  className="font-poppins font-[600] text-[14px] text-[#0A2481]"
                >
                  Edit
                </button>
              </div>
              {/* Subcategories */}
              <div className="subCategory">
                {category.products.map((product) => {
                  if (product.gender === "Male") {
                    return (
                      <div
                        key={product.subCategory}
                        className="px-[12px] flex justify-between items-center mt-[12px]"
                      >
                        <p className="font-poppins font-[400] text-[12px] text-[#0A2481]">
                          {product.subCategory}
                        </p>
                        <button
                          onClick={() =>
                            handleNavigate(
                              product.gender,
                              category.category,
                              product.subCategory
                            )
                          }
                          className="font-poppins font-[400] text-[12px] text-[#0A2481]"
                        >
                          Edit
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Female Categories */}
      {femaleData.length > 0 && (
        <>
          {/* <h2 className="font-poppins font-[700] text-[16px] text-[#0A2481] mt-[20px] mb-[10px]">
            Women's Categories
          </h2> */}
          {femaleData.map((category) => (
            <div key={category.category} className="mb-[15px]">
              {/* Category */}
              <div className="category h-[27px] py-[4px] rounded-[10px] px-[10px] border-[1px] border-[#737373] flex justify-between items-center">
                <h2 className="font-poppins font-[600] text-[14px]">
                  Women - {category.category}
                </h2>
                <button
                  onClick={() =>
                    handleNavigateCategory("Female", category.category)
                  }
                  className="font-poppins font-[600] text-[14px] text-[#0A2481]"
                >
                  Edit
                </button>
              </div>
              {/* Subcategories */}
              <div className="subCategory">
                {category.products.map((product) => {
                  if (product.gender === "Female") {
                    return (
                      <div
                        key={product.subCategory}
                        className="px-[12px] flex justify-between items-center mt-[12px]"
                      >
                        <p className="font-poppins font-[400] text-[12px] text-[#0A2481]">
                          {product.subCategory}
                        </p>
                        <button
                          onClick={() =>
                            handleNavigate(
                              product.gender,
                              category.category,
                              product.subCategory
                            )
                          }
                          className="font-poppins font-[400] text-[12px] text-[#0A2481]"
                        >
                          Edit
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListingComponent;
