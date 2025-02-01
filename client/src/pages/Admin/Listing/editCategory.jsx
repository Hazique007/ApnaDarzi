import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopNav from "../../../components/TopNav";
import Search from "../../../components/Search";
import { toast } from "react-toastify";

const EditCategory = () => {
  const { gender, category, subCategory } = useParams();
  const [details, setDetails] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const userID = localStorage.getItem("userID");

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `https://apnadarzi-5.onrender.com/api/v1/products/GenderCategory?userID=${userID}`,
        {
          params: { gender, category },
        }
      );
      console.log(response);

      setDetails(response.data.products[0]);
      setPreviewImage(response.data.products[0]?.image);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Error fetching product details.");
    }
  };

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("gender", details.gender);
      formData.append("category", details.category);
      formData.append("categoryDescription", details.categoryDescription);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.put(
        `https://apnadarzi-5.onrender.com/api/v1/products/UpdateGenderCategory?userID=${userID}`,
        formData,
        {
          params: { gender, category, subCategory },
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Category updated successfully!");
        getDetails();
        setIsEdit(false);
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.get(
        `https://apnadarzi-5.onrender.com/api/v1/category/deleteCategory?userID=${userID}`,
        {
          params: { gender, category },
        }
      );

      if (response.status === 200) {
        toast.success("Category deleted successfully!");
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (error) {
      console.error(
        "Errorrrrr deleting category:",
        error.response || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Error deleting category. Please try again."
      );
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, [gender, category]);

  return (
    <div className="pb-10">
      <TopNav />
      <div className="px-[17px] mt-[12px]">
        <Search />
      </div>
      <div className="flex justify-between px-[30px] mt-[23px]">
        <h1 className="text-[14px] font-[600] font-poppins">
          {details.gender} - {details.category}
        </h1>

        {!isEdit ? (
          <button
            onClick={handleEdit}
            className={`${
              !isEdit ? "bg-[#D4A706] text-white" : "text-[#1043F9] bg-white"
            } px-4 py-1 rounded-sm text-[12px] h-[27px] font-poppins font-[400]`}
          >
            {isEdit ? "Cancel" : "Edit"}
          </button>
        ) : null}
      </div>

      <div className="all Details">
        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            disabled={!isEdit}
            id="gender"
            name="gender"
            value={details.gender || ""}
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
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            disabled={!isEdit}
            type="text"
            id="category"
            name="category"
            value={details.category || ""}
            onChange={handleChange}
          />
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
            disabled={!isEdit}
            type="text"
            id="categoryDescription"
            name="categoryDescription"
            value={details.categoryDescription || ""}
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
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-[70px] h-[70px] object-cover rounded-md"
            />
          ) : (
            <img
              src={` https://apnadarzi-5.onrender.com/uploads/${details.categoryImages}`}
              alt="Preview"
              className="w-[70px] h-[70px] object-cover rounded-md"
            />
          )}
          <input
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            disabled={!isEdit}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {isEdit && (
        <div className="flex justify-center items-center px-7">
          <button
            onClick={handleSave}
            className="font-[400] text-[12px] bg-[#D4A706] text-white w-[200px] h-[27px] rounded-[10px] mt-[30px] self-center"
          >
            Save
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="font-[400] text-[12px] bg-[#FF0000] text-white w-[200px] h-[27px] rounded-[10px] mt-[30px] ml-4"
          >
            Delete
          </button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-[14px] font-poppins">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-[#FF0000] text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
