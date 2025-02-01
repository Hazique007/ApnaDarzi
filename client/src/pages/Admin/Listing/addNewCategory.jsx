import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TopNav from "../../../components/TopNav";
import Search from "../../../components/Search";
import { IoIosAddCircle } from "react-icons/io";
import { useParams } from "react-router-dom";

const AddCategory = () => {
  const params = useParams();
  const [details, setDetails] = useState({
    category: "",
    gender: "Male",
    categoryDescription: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      image: e.target.files[0],
    }));
  };
  const userID = localStorage.getItem("userID");
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("category", details.category);
    formData.append("gender", details.gender);
    formData.append("categoryDescription", details.categoryDescription);
    if (details.image) {
      formData.append("image", details.image);
    }

    try {
      const response = await axios.post(
        `https://apnadarzi-31.onrender.com/api/v1/category/addCategoryData?userID=${userID}`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Category added successfully!");
        setDetails({
          category: "",
          gender: "Male",
          categoryDescription: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(
        error.response?.data?.message ||
          "Error adding category. Please try again."
      );
    }
  };

  return (
    <div className="pb-10">
      <TopNav />
      <div className="px-[17px] mt-[12px]">
        <Search />
      </div>
      <div className="flex justify-between px-[30px] mt-[23px]">
        <h1 className="text-[14px] font-[600] font-poppins flex items-center gap-2">
          <IoIosAddCircle className="text-xl" /> Add New Category
        </h1>
      </div>

      <div className="all Details">
        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="category"
          >
            Category Name
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

        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
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

        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="categoryDescription"
          >
            Description
          </label>
          <input
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            type="text"
            id="categoryDescription"
            name="categoryDescription"
            value={details.categoryDescription}
            onChange={handleChange}
          />
        </div>

        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className=" hidden font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor={`image`}
            className="cursor-pointer text-[10px] m-auto bg-gray-200 text-center rounded-[10px] h-[27px] w-full flex items-center justify-center text-gray-700 font-poppins border-[1px] border-[#737373]"
          >
            Upload
          </label>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={handleSave}
          className="font-[400] text-[12px] bg-[#D4A706] text-white w-[200px] h-[27px] rounded-[10px] mt-[30px] self-center"
        >
          Save Category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
