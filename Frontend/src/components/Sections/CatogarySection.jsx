import React from "react";
import { Link } from "react-router-dom";
const CatogarySection = () => {
  return (
    <div className="flex justify-center items-center gap-10 border-t border-b  border-gray-200 p-4 ">
      <ul className="flex space-x-8 overflow-x-auto whitespace-nowrap scrollbar-hidden cursor-pointer">
        <Link to="/">Home</Link>
        <Link to="/filter">men's clothing</Link>
        <Link to="/filter">jewelery</Link>
        <Link to="/filter">electronics</Link>
        <Link to="/filter">women's clothing</Link>
        <Link to="/filter">men's clothing</Link>
        <Link to="/filter">jewelery</Link>
        <Link to="/filter">electronics</Link>
        <Link to="/filter">women's clothing</Link>
      </ul>

      <p className="hidden lg:flex self-end">🚀Free International Delivery</p>
    </div>
  );
};

export default CatogarySection;
