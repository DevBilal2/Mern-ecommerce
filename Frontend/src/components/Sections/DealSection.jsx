import React from "react";
import Slider from "react-slick";
import DealCards from "../Cards/DealCards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/banner1.webp";
import banner2 from "../../assets/banner2.webp";
import banner3 from "../../assets/banner5.webp";
import banner4 from "../../assets/banner6.webp";
import banner5 from "../../assets/banner43.jpg";

const DealSection = () => {
  const images = [banner1, banner2, banner3, banner4, banner5];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full p-4">
      {/* Flex on large & medium, stack & drag on small */}
      <div className="hidden md:flex  justify-center gap-4">
        {images.map((image, index) => (
          <DealCards key={index} image={image} />
        ))}
      </div>

      {/* Dragable on small screens */}
      <div className=" md:hidden m-4">
        <Slider {...settings}>
          {images.map((image, index) => (
            <DealCards key={index} image={image} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DealSection;
