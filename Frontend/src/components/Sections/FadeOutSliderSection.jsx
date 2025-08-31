import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import phone from "../../assets/phone.jpg";
import shoes from "../../assets/shoes.jpg";

const FadeOutSlider = () => {
  const ads = [
    {
      p: "Big Saving Day",
      image: phone,
      title: "Apple iPhone 15GB 256GB Pink",
      price: 300,
    },
    {
      p: "Big Saving Day",
      image: shoes,
      title: "Men Round Toe Lace-up Lightweight PU Sneaker",
      price: 59,
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  // Sequential animation variants
  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 * i, duration: 0.5, ease: "easeInOut" },
    }),
    exit: { x: -50, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full md:w-full lg:w-[70%] h-[400px] sm:h-[500px] overflow-hidden m-2 mt-10  ">
      {/* Image Container */}
      <div className="w-full h-full flex items-center justify-center sm:p-5 relative">
        {/* Animated Image */}
        <AnimatePresence>
          <motion.img
            key={ads[index].image}
            src={ads[index].image}
            alt="Ad"
            className="absolute w-full h-full object-cover rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Text Content */}
        <motion.div
          className="absolute top-20 right-10 sm:right-20 z-10 w-[40%] sm:p-6 rounded-xl"
          key={ads[index].title} // Ensures proper re-render
        >
          <AnimatePresence>
            <motion.p
              key={ads[index].p}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={1}
              className="text-gray-600 text-lg font-semibold"
            >
              {ads[index].p}
            </motion.p>

            <motion.h1
              key={ads[index].title}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={2}
              className="mt-2 text-lg sm:text-4xl font-bold text-gray-900 break-words whitespace-normal leading-tight"
            >
              {ads[index].title}
            </motion.h1>

            <motion.p
              key={ads[index].price}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={3}
              className="text-gray-700 text-lg mt-2"
            >
              Starting only at{" "}
              <span className="text-2xl font-bold text-orange-600">
                ${ads[index].price}.00
              </span>
            </motion.p>

            <motion.button
              key={`button-${index}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={4}
              className="hover:bg-black hover:duration-700 mt-3 p-2 bg-orange-600 text-white rounded-2xl w-fit"
            >
              Shop Now
            </motion.button>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronRight size={18} />
      </button>

      {/* 🔹 Dots (Indicators) 🔹 */}
      <div
        onClick={nextSlide}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2"
      >
        {ads.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              index === i
                ? "bg-orange-500 shadow-[0_0_10px_#FFA500]"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FadeOutSlider;
