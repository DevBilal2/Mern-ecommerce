import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from "../../Store/Slices/cartSlice";
import { removeFromCart, updateQuantity } from "../../Store/Slices/cartSlice"; // Make sure you have these actions

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price || 0);
  };
  const handleQuantityChange = (productId, newQuantity) => {
    console.log("Updating:", productId, "New quantity:", newQuantity);
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-sm flex flex-col md:flex-row justify-center gap-5">
      {/* Cart Items */}
      <div className="space-y-6 border p-3 border-gray-300 rounded w-full md:w-[70%]">
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.spec}`}
              className="flex border-b pb-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-25 h-25 object-contain rounded mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-700 text-sm my-1 line-clamp-1">
                  {item.description}
                </p>
                <div className="text-sm text-gray-500">
                  {item.size && <span>{item.size} • </span>}
                  {item.spec && <span>{item.spec} • </span>}
                  <span>Qty: {item.quantity}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold">{formatPrice(item.price)}</span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                {item.discountPrice && (
                  <div className="mt-1">
                    <span className="text-gray-500 line-through text-sm">
                      {formatPrice(item.originalPrice)}
                    </span>
                    <span className="text-green-600 text-sm ml-2">
                      {item.discountPrice}% off
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Totals */}
      {cartItems.length > 0 && (
        <div className="md:sticky top-35 h-fit border p-2 border-gray-300 rounded w-full md:w-[30%]">
          <h3 className="text-lg font-semibold mb-4">Cart Totals</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="text-sm text-gray-500">
              Estimate for <span className="font-medium">Pakistan</span>
            </div>
          </div>

          <div className="flex justify-between border-t pt-3 mb-6">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">
              {formatPrice(totalAmount)}
            </span>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            CHECKOUT ({totalQuantity})
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
