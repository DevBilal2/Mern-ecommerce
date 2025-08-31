import React from "react";
import FadeOutSlider from "./FadeOutSliderSection";
import AddCard from "../Cards/AddCard";
import Imagephone from "../../assets/phonecard.jpg";
import imagecard from "../../assets/imagecard.png";

const CardFadeOutSection = () => {
  const cardData = [
    {
      image: imagecard,
      title: "Buy Men Bags with very low price",
      price: 1500,
    },
    { image: Imagephone, title: "Buy apple phone 15 256GB Black", price: 1500 },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Slider stays on the left */}
      <FadeOutSlider />

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row lg:flex-col w-full lg:w-[30%] gap-6 mt-10 sm:justify-between">
        {cardData.map((item, index) => (
          <AddCard
            key={index}
            title={item.title}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CardFadeOutSection;
