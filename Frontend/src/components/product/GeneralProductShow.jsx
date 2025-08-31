import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  getProductsStatus,
  getProductsError,
} from "../../Store/Slices/productSlice";
const GeneralProductShow = ({
  category = "all",
  filterBy = "none",
  title,
  description,
}) => {
  const scrollRef = useRef(null);

  const products = useSelector(selectAllProducts);
  const [isScrollable, setIsScrollable] = useState(false);

  // Filter products by category
  let filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  // Apply additional filtering based on popularity
  if (filterBy === "popular") {
    filteredProducts = filteredProducts
      .filter((product) => product.ratings >= 4) // Example: filter by rating ≥ 4
      .sort((a, b) => b.rating - a.rating); // Sort by rating (highest first)
  } else if (filterBy === "discounted") {
    filteredProducts = filteredProducts
      .filter((product) => product.discount) // Filter only products with a discount
      .sort((a, b) => b.discount - a.discount); // Sort by highest discount
  }

  useEffect(() => {
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [filteredProducts]);

  const checkScrollable = () => {
    if (scrollRef.current) {
      setIsScrollable(
        scrollRef.current.scrollWidth > scrollRef.current.clientWidth
      );
    }
  };

  const handleScroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Section Title */}
      <h1 className="text-2xl font-bold ml-5 mt-10">{title}</h1>
      <p className="ml-5 mt-2">{description}</p>

      {/* Navigation Buttons */}
      {isScrollable && (
        <>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
            onClick={() => handleScroll(-300)}
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
            onClick={() => handleScroll(300)}
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}

      {/* Product List */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth mt-10 ml-3 mr-0 scrollbar-hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-50"
              style={{ scrollSnapAlign: "start" }}
            >
              <Product product={item} />
            </div>
          ))
        ) : (
          <p className="ml-10 mt-5 text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default GeneralProductShow;
