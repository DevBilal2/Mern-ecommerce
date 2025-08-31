import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaTimes,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  setSearchQuery,
  selectFilters,
  selectSearchQuery,
} from "../../Store/Slices/filterSlice";

const Sidebar = ({ onClose }) => {
  const dispatch = useDispatch();

  const savedFilters = useSelector(selectFilters);
  const savedSearch = useSelector(selectSearchQuery);

  const [searchQuery, setSearchQueryLocal] = useState(savedSearch);
  const [priceRange, setPriceRange] = useState(savedFilters.priceRange);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState(savedFilters.ratings);

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);

  // Categories to display (no duplicates, lowercase for label)
  const categories = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  // Sync Redux filters with local state (convert backend uppercase to lowercase)
  useEffect(() => {
    setSearchQueryLocal(savedSearch);
    setPriceRange(savedFilters.priceRange);
    setSelectedCategories(
      savedFilters.categories.map((cat) => cat.toLowerCase())
    );
    setSelectedRatings(savedFilters.ratings);
  }, [savedSearch, savedFilters]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? [] : [category]
    );
  };

  const handleRatingToggle = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = newValue;
    setPriceRange(newRange.sort((a, b) => a - b));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchQuery));
    if (onClose) onClose();
  };

  const applyFilters = () => {
    dispatch(
      setFilters({
        categories: selectedCategories.map((cat) => cat.toUpperCase()), // match backend
        priceRange,
        ratings: selectedRatings,
      })
    );
    dispatch(setSearchQuery(searchQuery));
    if (onClose) onClose();
  };

  return (
    <div className="h-full bg-white p-4 border-r border-gray-300 overflow-y-auto">
      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 p-1"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Apply Filters Button */}
      <div className="mb-4 w-full">
        <button
          onClick={applyFilters}
          className="w-full bg-red-500 text-white py-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQueryLocal(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <h2 className="text-lg font-semibold">Categories</h2>
          {isCategoryOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isCategoryOpen && (
          <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <li key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`cat-${category}`}
                  className="mr-2 h-4 w-4 accent-red-500"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                <label
                  htmlFor={`cat-${category}`}
                  className="cursor-pointer capitalize"
                >
                  {category}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <h2 className="text-lg font-semibold">Price Range</h2>
          {isPriceOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isPriceOpen && (
          <div className="mt-3">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">₹{priceRange[0]}</span>
              <span className="text-sm font-medium">₹{priceRange[1]}</span>
            </div>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full accent-red-500"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full accent-red-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => setIsRatingOpen(!isRatingOpen)}
        >
          <h2 className="text-lg font-semibold">Customer Rating</h2>
          {isRatingOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isRatingOpen && (
          <ul className="mt-2 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <li key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  className="mr-2 h-4 w-4 accent-red-500"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingToggle(rating)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center cursor-pointer"
                >
                  {[...Array(5)].map((_, i) =>
                    i < rating ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-yellow-400" />
                    )
                  )}
                  <span className="ml-1 text-sm text-gray-600">& Up</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
