import React, { useState } from "react";
import axios from "axios";
import TopNav from "../../../components/TopNav";
import Search from "../../../components/Search";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircle } from "react-icons/io";

const AddSubCategory = () => {
  const userID = localStorage.getItem("userID");
  const [details, setDetails] = useState({
    category: "",
    subCategory: "",
    gender: "Male",
    description: "",
    price: "",
    stock: "",
    highlight: "",
  });
  const [uploadedImages, setUploadedImages] = useState([
    null,
    null,
    null,
    null,
  ]);

  const handleUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...uploadedImages];
      updatedImages[index] = file;
      setUploadedImages(updatedImages);
    }
  };

  const handleDelete = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages[index] = null;
    setUploadedImages(updatedImages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", details.category);
    formData.append("subCategory", details.subCategory);
    formData.append("price", details.price);
    formData.append("gender", details.gender);
    formData.append("description", details.description);

    formData.append("stock", details.stock);
    formData.append("highlight", details.highlight);

    uploadedImages.forEach((image, index) => {
      if (image) {
        formData.append("images", image);
      }
    });
    console.log(uploadedImages);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/products/add-subcategory?userID=${userID}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        toast.success("Subcategory added successfully!");
        setDetails({
          category: "",
          subCategory: "",
          gender: "Male",
          description: "",
          price: "",
          stock: "",
          highlight: "",
        });
        setUploadedImages([null, null, null, null]);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Error adding subcategory. Please try again."
      );
    }
  };

  return (
    <div>
      <TopNav />
      <div className="px-[17px] mt-[12px]">
        <Search />
      </div>
      <div className="flex justify-between px-[30px] mt-[23px]">
        <h1 className="text-[14px] font-[600] font-poppins flex items-center gap-2">
          <IoIosAddCircle className="text-xl" /> Add New Subcategory
        </h1>
      </div>
      <div className="Top Class pb-16 mt-5">
        <form onSubmit={handleSubmit} className="all Details">
          <div className="each-item flex flex-col px-[35px] mt-[10px] gap-[10px]">
            <label
              className="text-[12px] font-[700] font-poppins"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
              type="text"
              id="category"
              name="category"
              value={details.category}
              onChange={handleChange}
            />
          </div>

          <div className="each-item flex flex-col px-[35px] mt-[10px] gap-[10px]">
            <label
              className="text-[12px] font-[700] font-poppins"
              htmlFor="subCategory"
            >
              Subcategory
            </label>
            <input
              className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
              type="text"
              id="subCategory"
              name="subCategory"
              value={details.subCategory}
              onChange={handleChange}
            />
          </div>

          <div className="each-item flex flex-col px-[35px] mt-[10px] gap-[10px]">
            <label
              className="text-[12px] font-[700] font-poppins"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
              id="gender"
              name="gender"
              value={details.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="each-item flex flex-col px-[35px] mt-[10px] gap-[10px]">
            <label
              className="text-[12px] font-[700] font-poppins"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
              type="text"
              id="description"
              name="description"
              value={details.description}
              onChange={handleChange}
            />
          </div>

          <div className="each-item flex flex-col px-[35px] mt-[10px] gap-[10px]">
            <label
              className="text-[12px] font-[700] font-poppins"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
              type="number"
              id="price"
              name="price"
              value={details.price}
              onChange={handleChange}
            />
          </div>

          <div className="each-item flex flex-col px-[35px] mt-[10px] gap-[10px]">
            <label
              className="text-[12px] font-[700] font-poppins"
              htmlFor="stock"
            >
              Stock Availability
            </label>
            <input
              className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
              type="number"
              id="stock"
              name="stock"
              value={details.stock}
              onChange={handleChange}
            />
          </div>

          <div className="each-item flex flex-col px-[35px] mt-[10px] gap-[10px]">
            <label
              className="text-[12px] font-[700] font-poppins"
              htmlFor="images"
            >
              Images
            </label>
            <div className="Images-Section flex gap-4 items-center">
              {uploadedImages.map((image, index) => (
                <div key={index} className="flex flex-col items-center">
                  {image ? (
                    <div>
                      <img
                        src={image}
                        alt="Uploaded"
                        className="h-[57px] w-[57px] rounded-[10px] border-[1px] border-gray-300"
                      />
                      <button
                        className="text-[10px] bg-red-500 text-white mt-2 rounded-[10px] h-[27px] w-[57px] flex items-center justify-center"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        className="hidden"
                        type="file"
                        id={`image${index}`}
                        accept="image/*"
                        onChange={(e) => handleUpload(e, index)}
                      />
                      <label
                        htmlFor={`image${index}`}
                        className="cursor-pointer text-[10px] bg-gray-200 text-center rounded-[10px] h-[57px] w-[57px] flex items-center justify-center text-gray-700 font-poppins border-[1px] border-[#737373]"
                      >
                        Upload
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-[10px]">
            <button
              type="submit"
              className="bg-[#D4A706] mt-5 text-white text-[12px] px-4 py-1 rounded-md"
            >
              Add Subcategory
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddSubCategory;
