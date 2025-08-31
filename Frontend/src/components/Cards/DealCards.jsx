import React from "react";

const DealCards = ({ image }) => {
  return (
    <div className="h-55 w-full rounded-2xl">
      <img
        src={image}
        className="h-full w-full hover:scale-105 hover:rotate-1 transition-transform duration-300 rounded-2xl"
        alt="Deal Card"
      />
    </div>
  );
};

export default DealCards;
