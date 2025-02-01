import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav";
import Search from "../../components/Search";
import { FaFilter } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import FabricCart from "../../components/FabricCart";
import Navbar from "../../components/Navbar";
import axios from "axios";

const FabricPage = () => {
  const [fabrics, setFabrics] = useState([]);
  const [gender, setGender] = useState();
  const [category, setCategory] = useState();

  const FabricData = JSON.parse(localStorage.getItem("productItem"));
  // console.log(FabricData);

  const fetchFabrics = async (gender, category) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/fabric/getFabricGenderPlusCategory",
        {
          params: {
            gender: FabricData.gender,
            category: FabricData.category,
          },
        }
      );

      console.log(response);
      setFabrics(response.data.data);

      // setFabrics(data || []);
    } catch (error) {
      console.error("Error fetching fabrics:", error);
    }
  };

  useEffect(() => {
    fetchFabrics(gender, category);
  }, [gender, category]);

  return (
    <div>
      <TopNav />
      <div className="w-full justify-center px-[13px] pt-[11px] items-center">
        <Search />
      </div>
      <div className="px-[11px]">
        <h1 className="font-[700] text-[14px] mt-[17px] font-poppins text-[#737373]">
          Fabric Selection{" "}
        </h1>
        <p className="text-[#898282] font-[400] mt-[13px] text-[12px] pr-3 font-poppins">
          Explore our premium collection of fabrics tailored for your needs.
        </p>
        <div className="filter-sort mt-[21px] flex items-center justify-end gap-7 h-[22px] pr-[20px]">
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
        </div>
        <div className="grid grid-cols-2 gap-4 mt-16 pb-24">
          {fabrics.map((fabric, index) => (
            <FabricCart key={index} {...fabric} />
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default FabricPage;
