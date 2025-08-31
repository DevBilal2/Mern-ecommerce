import React from "react";
import FirstNavbar from "../Sections/FirstNavbar";
import Navbar from "../Sections/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Sections/FooterSection";
import LastSection from "../Sections/LastSection";
import FeaturesSection from "../Sections/FeatureSection";
import CatogarySection from "../Sections/CatogarySection";
import BottomNav from "../Sections/BottomNav";
import PopupCart from "../Cart/PopupCart";

const Layout = () => {
  return (
    <div className="relative">
      <FirstNavbar />
      <div className="sticky top-0 w-full z-40 bg-white">
        <Navbar />
        <CatogarySection />
      </div>
      <Outlet />
      <BottomNav />
      <FeaturesSection />
      <Footer />
      <LastSection />
    </div>
  );
};

export default Layout;
