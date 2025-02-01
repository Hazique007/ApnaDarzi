import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import ReactGA from "react-ga4";

import { BeatLoader } from "react-spinners";
import {
  FiHome,
  FiShoppingBag,
  FiUser,
  FiHelpCircle,
  FiSettings,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Profile page",
    });
  }, []);

  const API_BASE_URL = "http://localhost:3000";
  const userID = localStorage.getItem("userID");
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [profile, setProfile] = useState(null); // Set initial profile to null
  const [role, setRole] = useState("user");

  const navigate = useNavigate();
  const getRole = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/getUserDetails",
      {
        params: { userID: userID },
      }
    );
    console.log("response", response);
    setRole(response.data.role);
  };
  // Use effect to fetch the profile only if the userID exists
  useEffect(() => {
    if (!userID) {
      // Handle case where userID is not found
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/listpersonal`, {
          params: { userID },
        });

        if (response.data && response.data.length > 0) {
          const user = response.data[0];
          setProfile({
            name: user.name || "N/A",
            mobileNumber: user.mobileNumber || "N/A",
          });
        } else {
          console.error("No details found for this user");
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };
    getRole();
    fetchProfile();
  }, [userID]); // Re-run this effect when userID changes

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <BeatLoader color="#ff58e6" />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("pincode");
    localStorage.removeItem("userID");
    console.log("User logged out");
    navigate("/otp");
  };

  // {role === "admin"
  //   ? {
  //       label: "Admin",
  //       icon: <MdOutlineAdminPanelSettings className="text-black text-lg" />,
  //       onClick: () => navigate("/listing"),
  //     }
  //   : ""},

  const options = [
    ...(role === "admin"
      ? [
          {
            label: "Admin",
            icon: (
              <MdOutlineAdminPanelSettings className="text-black text-lg" />
            ),
            onClick: () => navigate("/listing"),
          },
        ]
      : []),
    ...(role === "agent"
      ? [
          {
            label: "Agent",
            icon: <MdDeliveryDining className="text-black text-lg" />,
            onClick: () => navigate("/userlist"),
          },
        ]
      : []),

    {
      label: "My Addresses",
      icon: <FiHome className="text-black text-lg" />,
      onClick: () => navigate("/addresses"),
    },
    {
      label: "My Orders",
      icon: <FiShoppingBag className="text-black text-lg" />,
      onClick: () => navigate("/orders"),
    },
    {
      label: "Personal Details",
      icon: <FiUser className="text-black text-lg" />,
      onClick: () => navigate("/personal-details"),
    },
    {
      label: "Help and Support",
      icon: <FiHelpCircle className="text-black text-lg" />,
      onClick: () => navigate("/help-support"),
    },
    {
      label: "Settings",
      icon: <FiSettings className="text-black text-lg" />,
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <div className="mb-10 font-poppins pb-16">
      <TopNav />

      <div className="px-5 mt-[17px]">
        <h1 className="font-poppins font-[700] text-[14px] text-[#737373]">
          Profile
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto"></div>

      <div className="p-6">
        <div
          className="w-full p-8 rounded-[15px] text-white"
          style={{
            background: "linear-gradient(90deg, #171617 0%, #94908F 100%)",
          }}
        >
          <h2 className="text-lg font-semibold">
            {profile?.name || "Profile details not available"}{" "}
            {/* Render name if profile is not null */}
          </h2>
          <p className="text-sm text-gray-300">
            {profile?.mobileNumber || "Profile details not available"}{" "}
            {/* Render mobile number if profile is not null */}
          </p>
        </div>
      </div>

      <div className="w-full mx-auto  bg-white rounded-lg">
        {options.map((option, index) => (
          <div key={index}>
            <div
              onClick={option.onClick}
              className="flex items-center py-4 px-6 cursor-pointer hover:bg-gray-100 transition duration-200"
            >
              {option.icon}
              <span className="ml-4 text-[15px] text-gray-800">
                {option.label}
              </span>
            </div>
            {index < options.length - 1 && <hr className="border-gray-300" />}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <p
          onClick={handleLogout}
          className="text-[#1043F9] cursor-pointer text-lg font-medium hover:underline"
        >
          Log Out
        </p>
      </div>
      <Navbar />
    </div>
  );
};

export default ProfilePage;
