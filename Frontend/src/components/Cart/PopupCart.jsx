import { useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeFromCart } from "../../Store/Slices/cartSlice";

const PopupCart = ({ isOpen = true, onClose }) => {
  const dispatch = useDispatch();
  const cartRef = useRef();
  const {
    items: cartItems,
    totalQuantity,
    totalAmount,
    status,
    error,
  } = useSelector((state) => state.cart || {});

  // Debounce setup
  const handleRemoveItem = useMemo(
    () =>
      debounce((id) => {
        console.log(id);
        dispatch(removeFromCart(id));
      }, 300),
    [dispatch]
  );

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Cleanup debounce
  useEffect(() => {
    return () => {
      handleRemoveItem.cancel();
    };
  }, [handleRemoveItem]);

  // Early return if not open
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-25 backdrop-blur-lg z-40" />

      <div
        ref={cartRef}
        className="fixed right-0 top-0 h-full w-full sm:w-90 bg-white shadow-xl z-50 flex flex-col transition-transform duration-300"
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg">Your Cart ({cartItems.length})</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {status === "loading" ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center py-8">Loading cart items...</div>
            </div>
          ) : status === "failed" ? (
            <div className="text-center py-8 text-red-500">Error: {error}</div>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.productId}-${item.quantity}`}
                className="flex items-center py-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <div className="ml-3 flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="flex justify-between mt-1">
                    <span>
                      ${item.price.toFixed(2)} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="self-start cursor-pointer ml-2 text-red-500 text-xl hover:text-red-700"
                  aria-label="Remove item"
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {status !== "loading" &&
          status !== "failed" &&
          cartItems.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}

        <div className="p-4 flex gap-3">
          <Link
            to="/cart"
            onClick={onClose}
            className="flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg transition"
          >
            Full Cart
          </Link>
          {status !== "loading" &&
            status !== "failed" &&
            cartItems.length > 0 && (
              <Link
                to="/checkout"
                onClick={onClose}
                className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition"
              >
                Checkout
              </Link>
            )}
        </div>
      </div>
    </>
  );
};

export default PopupCart;
