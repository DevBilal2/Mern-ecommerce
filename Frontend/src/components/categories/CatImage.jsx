import React from "react";
import bag from "../../assets/bag.png";
import elec from "../../assets/elec.png";
import fashion from "../../assets/fashion.png";
import foot from "../../assets/foot.png";
import fruit from "../../assets/fruit.png";
import jewel from "../../assets/jewel.png";
import { motion } from "framer-motion";

const CatogaryImages = [
  { image: foot, text: "Footwear" },
  { image: fruit, text: "Groceries" },
  { image: jewel, text: "jewellery" },
  { image: bag, text: "Bag" },
  { image: elec, text: "Electronix" },
  { image: fashion, text: "Fashion" },
  { image: foot, text: "Footwear" },
  { image: fruit, text: "Groceries" },
  { image: jewel, text: "jewellery" },
];
const CatImage = () => {
  return (
    <div className="w-full flex items-center gap-6 p-5 overflow-x-auto scrollbar-hidden whitespace-nowrap snap-x snap-mandatory scroll-pl-5 scroll-pr-5">
      {CatogaryImages.map((item, index) => (
        <div
          key={index}
          className="flex-none flex flex-col items-center justify-center bg-white shadow-lg rounded-sm p-4 sm:w-28 md:w-36"
        >
          <motion.img
            whileHover={{ scale: 1.08 }}
            className="size-12 sm:size-20 object-contain mb-2"
            src={item.image}
            alt={item.text}
          />
          <h2 className="text-sm font-semibold text-gray-700">{item.text}</h2>
        </div>
      ))}
    </div>
  );
};

export default CatImage;
