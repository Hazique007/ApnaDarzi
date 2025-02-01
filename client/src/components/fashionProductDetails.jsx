import { useState, useEffect } from "react";
import TopNav from "./TopNav";
import Search from "./Search";
import { FaFilter } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import ProductCart from "./productCart";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { BeatLoader } from "react-spinners";
import ReactGA from "react-ga4";

const FashionProductDetails = () => {
  const ProductClick = (product) => {
    localStorage.setItem("productItem", JSON.stringify(product));

    ReactGA.event(category, {
      event_category: category,
      event_label: `Clicked ${product.category}`,
      value: product.price,
      product_subcategory: product.subCategory,
    });
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryDescription, setCategoryDescription] = useState();
  const [subCategoryDescription, setSubCategoryDescription] = useState();
  const { gender, category, subCategory } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://apnadarzi-31.onrender.com/api/v1/products/getGenderPlusCategory`,
          {
            params: { gender, category },
          }
        );
        // console.log(response);

        setData(response.data.products);
        setCategoryDescription(response.data.products[0].categoryDescription);
        setSubCategoryDescription(response.data.products[0].description);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setData([]);
      }
    };

    fetchData();
  }, [gender, category]);
  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <BeatLoader color="#ff58e6" />
      </div>
    );
  }
  return (
    <div>
      <TopNav />
      <div className="w-full justify-center px-[13px] pt-[11px] items-center">
        <Search />
      </div>
      <div className="px-[11px]">
        <h1 className="font-[700] text-[14px] mt-[17px] font-poppins text-[#737373]">
          {`${
            gender === "Male"
              ? "Men"
              : gender === "Female"
              ? "Women"
              : gender === "Kids"
              ? "Kids"
              : "All available products"
          }  >  ${category ? category : ""} ${
            subCategory ? " > " + subCategory : ""
          }`}
        </h1>
        <p className="text-[#898282] font-[400]  text-[12px] pr-3 font-poppins mb-4">
          {subCategory ? subCategoryDescription : categoryDescription}
        </p>
        {/* <div className="filter-sort mt-[21px] flex items-center justify-end gap-7 h-[22px] pr-[20px]">
          <div className="flex h-[25px] gap-3 items-center">
            <p className="text-[#898282] font-[400] text-[12px] font-poppins">
              Sort
            </p>
            <LuArrowDownUp color="#000" fontSize={14} />
          </div>
          <div className="flex h-[25px] gap-3 font-[400] text-[12px] font-poppins items-center">
            <p className="text-[#898282] font-[400] text-[12px] font-poppins">
              Filters
            </p>
            <FaFilter color="#000" fontSize={10} />
          </div>
        </div> */}

        {data.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 pb-24">
            {data.map((product, index) => (
              <ProductCart
                onClick={() => ProductClick(product)}
                key={index}
                styleName={product.name}
                price={product.price}
                gender={product.gender}
                category={product.category}
                subCategory={product.subCategory}
                images={product.images}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-9">
            <img
              src="https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg?ga=GA1.1.732799867.1719772377&semt=ais_hybrid"
              alt="No Products"
              className="h-36 w-36 object-contain"
            />
            <h2 className="text-xl font-semibold text-gray-600 mt-1">
              No Products Available
            </h2>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default FashionProductDetails;
