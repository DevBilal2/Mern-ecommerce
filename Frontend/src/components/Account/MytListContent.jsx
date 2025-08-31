import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLikedItems,
  unlikeProduct,
} from "../../Store/Slices/likedProductSlice";

const MytListContent = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectLikedItems);

  const handleRemove = (productId) => {
    dispatch(unlikeProduct(productId));
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow p-4 max-w-4xl">
      <h2 className="text-xl font-bold mb-4">My List</h2>
      <p className="text-gray-600 mb-6">
        There are {products.length} products in your My List
      </p>

      {products.map((product, index) => (
        <div
          key={index}
          className="flex gap-4 pb-6 border-t p-2 border-gray-200 last:border-b-0 items-center"
        >
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[0].url
                : "https://via.placeholder.com/100"
            }
            className="object-contain w-25"
            alt={product.name}
          />

          {/* This div grows to take all available horizontal space */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-1">{product.seller}</p>
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-1">{product.ratings}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 line-through ml-2">
                ${product.discountPrice.toFixed(2)}
              </span>
              <span className="text-green-600 ml-2">
                {(
                  ((product.price - product.discountPrice) / product.price) *
                  100
                ).toFixed(0)}
                % off
              </span>
            </div>
          </div>

          {/* Remove button stays at the right end */}
          <button
            onClick={() => handleRemove(product._id)}
            className="text-red-600 hover:text-red-800 font-semibold px-3 py-1 border border-red-600 rounded whitespace-nowrap"
            aria-label={`Remove ${product.name} from liked items`}
          >
            Unlike
          </button>
        </div>
      ))}
    </div>
  );
};

export default MytListContent;
