import { useState, useEffect } from "react";
import TopNav from "../../components/TopNav";
import Search from "../../components/Search";
import { FaFilter } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import ProductCart from "../../components/productCart";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { BeatLoader } from "react-spinners";
import ReactGA from "react-ga4";

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryDescription, setCategoryDescription] = useState();
  const [subCategoryDescription, setSubCategoryDescription] = useState();
  const { gender, category, subCategory } = useParams();

  const ProductClick = (product) => {
    localStorage.setItem("productItem", JSON.stringify(product));
    ReactGA.event(product.category, {
      event_category: product.category,
      event_label: `Clicked ${product.category} - ${product.subcategory}`,
      value: product.price,
      product_subcategory: product.subCategory, // Subcategory
    });
  };
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://apnadarzi-311.onrender.com/api/v1/products/allProducts`,
          {
            params: { gender, category, subCategory },
          }
        );
        // console.log(response);

        setData(response.data.products);
        // console.log(response.data.products);

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

export default ProductPage;
