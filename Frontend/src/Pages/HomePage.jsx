import React from "react";
import Catogary from "../components/Sections/CatogarySection";
import GeneralProductShow from "../components/product/GeneralProductShow";
import CardFadeOutSection from "../components/Sections/CardFadeOutSection";
import FreeShippingBanner from "../components/Sections/FreeShippingBanner";
import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import banner3 from "../assets/banner5.webp";
import banner4 from "../assets/banner6.webp";
import banner5 from "../assets/banner43.jpg";
import DealSection from "../components/Sections/DealSection";
import Footer from "../components/Sections/FooterSection";
import CatogarySliderSection from "../components/Sections/CatogarySliderSection";
import BlogSection from "../components/Sections/BlogSection";
import LastSection from "../components/Sections/LastSection";

const HomePage = () => {
  return (
    <>
      <CatogarySliderSection />
      <GeneralProductShow
        filterBy="popular"
        title="Popular Items"
        description="Do not miss the current offers until the end of March."
      />
      <CardFadeOutSection />
      <FreeShippingBanner />
      <GeneralProductShow
        category="all"
        title="Latest Products"
        description=""
      />
      <GeneralProductShow
        category="men's clothing"
        title="Featured Products"
        description=""
      />
      <DealSection />
      <GeneralProductShow
        category="women's clothing"
        title="Women's Clothing"
        description=""
      />
      <GeneralProductShow
        category="electronics"
        title="Electronics"
        description=""
      />
      <GeneralProductShow category="jewelery" title="jewelery" description="" />
      <BlogSection />
    </>
  );
};

export default HomePage;
