import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import TopNav from "../../components/TopNav";
import Search from "../../components/Search";
import Hero from "../../components/Hero";
import Trending from "../../components/Trending";
import Works from "../../components/Works";
import WhatsApp from "../../components/whats";
import Fashion from "../../components/fashionStyling";
import { DesignStyling } from "../../components/styling";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Landing Page",
    });
  }, []);

  return (
    <div className="pb-20">
      <TopNav />
      <div className="w-full justify-center px-1 pt-3">
        <Search />
        <Hero />
        <DesignStyling />
        <div className="flex justify-center items-center">
          <WhatsApp />
        </div>
        <Trending />
        <Works />
        <Fashion />
      </div>
      <Navbar />
    </div>
  );
};

export default LandingPage;
