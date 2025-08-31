import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PopupCart from "../Cart/PopupCart";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../Store/Slices/filterSlice";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentUser,
  selectUserStatus,
} from "../../Store/Slices/userSlice";
import UserBadge from "../Account/userBadge";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStatus = useSelector(selectUserStatus);
  const curruntUser = useSelector(selectCurrentUser);

  const [input, setInput] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(input));
    navigate("/filter"); // or "/shop" or wherever FilteredProductSection is
  };

  return (
    <div className="flex items-center justify-between h-14 sm:h-16 border-t border-b border-gray-200 px-2">
      {/* Logo Section */}
      <div className="w-[70%] flex justify-center items-center text-lg font-bold">
        LOGO
      </div>

      {/* Search Bar */}
      <div className="hidden lg:flex w-full lg:h-12 sm:h-10 bg-gray-200 relative rounded-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for Products"
          className=" w-full    outline-none  p-4  "
        />
        <button
          onClick={handleSearch}
          type="submit"
          className="absolute right-0 top-0 bottom-0 flex items-center justify-center m-2"
        >
          <FaSearch />
        </button>
      </div>
      {/* Right Section: Login, Wishlist, Cart */}
      <ul className="flex gap-6 items-center justify-end w-full mr-6">
        {/* Login & Register */}
        {userStatus === "loading" ? (
          <li className="hidden sm:flex items-center gap-2 text-sm">
            Loading...
          </li>
        ) : curruntUser ? (
          <li>
            <UserBadge user={curruntUser} />
          </li>
        ) : (
          <li className="hidden sm:flex items-center gap-2 text-sm">
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              Login
            </Link>
            <span>|</span>
            <Link
              to="/register"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              Register
            </Link>
          </li>
        )}

        {/* Wishlist - Black & White Icon */}
        <Link
          className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-black transition duration-300"
          to="/account?tab=list"
        >
          <FaHeart />
        </Link>

        {/* Cart - Black & White Icon */}
        <li
          className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-black transition duration-300"
          onClick={() => setIsCartOpen(true)}
        >
          <FaShoppingCart />
        </li>
      </ul>
      {isCartOpen && (
        <PopupCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </div>
  );
};

export default Navbar;
