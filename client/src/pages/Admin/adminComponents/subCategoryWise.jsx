import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopNav from "../../../components/TopNav";
import Search from "../../../components/Search";
import { toast } from "react-toastify";

const SubCategoryWise = () => {
  const userID = localStorage.getItem("userID");
  const { gender, category, subCategory } = useParams();
  const [details, setDetails] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [newImages, setNewImages] = useState([]); // State to handle new images for update

  // Get product details
  const getDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/products/GenderCategorySubcategory",
        {
          params: { gender, category, subCategory },
        }
      );
      setDetails(response.data.products[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error(
        error.response?.data?.message ||
          "Error fetching category. Please try again."
      );
    }
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = e.target.files;
    setNewImages(files);
  };

  // Handle update request
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("gender", details.gender);
    formData.append("category", details.category);
    formData.append("subCategory", details.subCategory);
    formData.append("description", details.description);
    formData.append("price", details.price);
    formData.append("stock", details.stock);

    // Append new images to FormData
    for (let i = 0; i < newImages.length; i++) {
      formData.append("images", newImages[i]);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/products/UpdateGenderCategorySubcategory?userID=${userID}`,
        formData,
        {
          params: { gender, category, subCategory },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Product updated successfully!");
        getDetails();
        setIsEdit(false);
      } else {
        toast.error(
          error.response?.data?.message || "Update Error. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    }
  };

  // Handle delete request
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/products/CategorySubcategoryDelete",
        {
          params: { gender, category, subCategory },
        }
      );

      if (response.status === 200) {
        toast.success("Product deleted successfully!");
        // window.history.back();
      } else {
        toast.error("Failed to delete the product. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(
        "An error occurred while deleting the product. Please try again."
      );
    }
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle confirmation from the modal
  const confirmDelete = () => {
    handleDelete();
    closeModal();
  };

  useEffect(() => {
    getDetails();
  }, [gender, category, subCategory]);

  return (
    <div className="pb-10">
      <TopNav />
      <div className="px-[17px] mt-[12px]">
        <Search />
      </div>
      <div className="flex justify-between px-[30px] mt-[23px]">
        <h1 className="text-[14px] font-[600] font-poppins">
          {details.gender === "Male"
            ? "Men"
            : details.gender === "Female"
            ? "Women"
            : "General"}{" "}
          - {details.category} - {details.subCategory}
        </h1>

        {!isEdit ? (
          <button
            onClick={handleEdit}
            className={`${
              !isEdit ? "bg-[#D4A706]  text-white" : "text-[#1043F9] bg-white "
            } px-4 py-1 rounded-sm text-[12px] h-[27px] font-poppins font-[400]`}
          >
            {isEdit ? "Cancel" : "Edit"}
          </button>
        ) : (
          ""
        )}
        {isEdit ? (
          <button
            onClick={openModal}
            className="text-[#1043F9] bg-white px-4 py-1 rounded-sm text-[12px] h-[27px] font-poppins font-[400]"
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </div>

      {/* Product Details */}
      <div className="all Details">
        {/* Gender */}
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

        {/* Category */}
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

        {/* Description */}
        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            disabled={!isEdit}
            type="text"
            id="description"
            name="description"
            value={details.description || ""}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            disabled={!isEdit}
            type="text"
            id="price"
            name="price"
            value={details.price || ""}
            onChange={handleChange}
          />
        </div>

        {/* Stock */}
        <div className="each-item flex flex-col px-[35px] mt-[15px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="stock"
          >
            Stock Availability
          </label>
          <input
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px]"
            disabled={!isEdit}
            type="text"
            id="stock"
            name="stock"
            value={details.stock || ""}
            onChange={handleChange}
          />
        </div>

        {/* Images */}
        <div className="each-item flex flex-col px-[35px] mt-[15px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="images"
          >
            Images
          </label>
          <div className="images flex justify-evenly mt-[20px]">
            {details.images?.map((image, index) => (
              <img
                className="w-[70px] h-[70px] object-fit rounded-[10px]"
                key={index}
                src={`http://localhost:3000/uploads/${image}`.replace(
                  /\\/g,
                  "/"
                )}
                alt="product"
              />
            ))}
          </div>

          {isEdit && (
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-[10px]"
            />
          )}
        </div>
      </div>

      {/* Save Button */}
      {isEdit && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleSave}
            className="bg-[#D4A706] text-white text-[12px] px-4 py-1 rounded-md"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Modal Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[300px] p-6">
            <p className="text-lg font-poppins mb-4 text-center">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 py-1 bg-red-500 text-white text-md rounded-sm hover:bg-red-600"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="px-4 py-1 bg-yellow-500 text-white text-md rounded-sm hover:bg-yellow-600"
                onClick={closeModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategoryWise;
