import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaUser,
  FaFilter,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../Store/Slices/userSlice";
import Sidebar from "./SideBarSection";

const BottomNav = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [active, setActive] = useState("home");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement your search logic here
  };

  const handleFilterChange = (filters) => {
    console.log("Filters applied:", filters);
    // Implement your filter logic here
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="fixed  inset-0  z-40 lg:hidden bg-black bg-opacity-50">
          <div className="absolute inset-0 bg-white">
            <Sidebar
              onClose={() => setShowSidebar(false)}
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 w-full bg-white shadow-md border-t border-gray-300 flex justify-around items-center py-2 lg:hidden z-50">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center text-xs ${
            active === "home" ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => {
            setActive("home");
            setShowSidebar(false);
          }}
        >
          <FaHome size={20} />
          <span>Home</span>
        </Link>

        {/* Filter/Search */}
        <button
          className={`flex flex-col items-center text-xs ${
            active === "filter" ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => {
            setActive("filter");
            setShowSidebar(true);
          }}
        >
          <FaFilter size={20} />
          <span>Filter</span>
        </button>
        <button
          className={`flex flex-col items-center text-xs ${
            active === "search" ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => setActive("search")}
        >
          <FaSearch size={20} />
          <span>Search</span>
        </button>

        {/* Wishlist (redirects to login if not logged in) */}
        <Link
          to={currentUser ? "/wishlist" : "/login"}
          className={`flex flex-col items-center text-xs ${
            active === "wishlist" ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => setActive("wishlist")}
        >
          <FaHeart size={20} />
          <span>Wishlist</span>
        </Link>

        {/* Orders (redirects to login if not logged in) */}
        <Link
          to={currentUser ? "/orders" : "/login"}
          className={`flex flex-col items-center text-xs ${
            active === "orders" ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => setActive("orders")}
        >
          <FaShoppingBag size={20} />
          <span>Orders</span>
        </Link>

        {/* Account (redirects to login if not logged in) */}
        <Link
          to={currentUser ? "/account" : "/login"}
          className={`flex flex-col items-center text-xs ${
            active === "account" ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => setActive("account")}
        >
          <FaUser size={20} />
          <span>Account</span>
        </Link>

        {/* ... rest of your navigation items ... */}
      </div>
    </>
  );
};

export default BottomNav;
