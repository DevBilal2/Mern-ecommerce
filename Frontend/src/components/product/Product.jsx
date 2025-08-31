import { Link } from "react-router-dom";
import React from "react";
import {
  FaShoppingCart,
  FaStar,
  FaHeart,
  FaHeartBroken,
  FaExpand,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  likeProduct,
  unlikeProduct,
} from "../../Store/Slices/likedProductSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const likeStatus = useSelector((state) => state.likedProducts.status);

  const likedProducts = useSelector((state) => state.likedProducts.items);

  const isLiked = likedProducts.some((liked) => {
    const likedId = liked.productId?._id || liked.productId;
    return likedId && likedId === product._id;
  });

  const truncateText = (text, wordLimit = 8) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleLikeClick = () => {
    if (likeStatus === "loading") return;
    if (isLiked) {
      dispatch(unlikeProduct(product._id));
    } else {
      dispatch(likeProduct(product._id));
    }
  };

  return (
    <div className="w-full flex flex-col border border-gray-300 shadow-md rounded-lg p-4 relative bg-white min-h-[400px]">
      {" "}
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.discount}%
        </span>
      )}
      {/* Product Image */}
      <div className="relative h-36 flex items-center justify-center overflow-hidden group">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleLikeClick}
            disabled={likeStatus === "loading"}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
            aria-label={isLiked ? "Unlike product" : "Like product"}
          >
            {isLiked ? (
              <FaHeartBroken className="text-red-500" />
            ) : (
              <FaHeart className="text-gray-700" />
            )}
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200">
            <FaExpand className="text-gray-700" />
          </button>
        </div>
      </div>
      {/* Product Details */}
      <div className="flex flex-col mt-3 flex-grow">
        <h3 className="text-gray-500 text-sm uppercase font-semibold">
          {product.category}
        </h3>
        <h3 className="text-gray-900 font-bold text-md line-clamp-2">
          {truncateText(product.name)}
        </h3>
        <div className="flex items-center text-yellow-500 mt-1">
          {[...Array(Math.round(product.ratings || 0))].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <div className="flex items-center mt-1">
          <span className="text-red-600 font-bold text-lg">
            ₹{product.price}
          </span>
        </div>
      </div>
      {/* Add to Cart */}
      <Link
        to={`/product/${product._id}`}
        className="mt-auto flex items-center justify-center bg-white text-orange-600 border border-orange-600 text-sm font-semibold py-2 rounded-lg hover:border-none duration-500 cursor-pointer hover:text-white hover:bg-black"
      >
        <FaShoppingCart className="mr-2" />
        ADD TO CART
      </Link>
    </div>
  );
};

export default Product;
