import React from "react";

const AddCard = ({ image, title, price }) => {
  return (
    <div className="relative w-full h-full ">
      <img src={image} className="w-full h-[230px] rounded-2xl" />
      <div className="absolute left-5 top-10 flex flex-col gap-3">
        <h3 className="text-xl font-bold w-40 whitespace-pre-wrap">{title}</h3>
        <h2 className="text-orange-600 font-bold text-xl">${price}</h2>
        <a className="font-serif underline">SHOP NOW</a>
      </div>
    </div>
  );
};

export default AddCard;
