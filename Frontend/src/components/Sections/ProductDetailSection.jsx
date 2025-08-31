import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/Slices/cartSlice";
import { fetchProductById } from "../../Store/ApiCalls";
import { useEffect } from "react";
import {
  selectedProduct,
  getProductsError,
  getProductsStatus,
  clearSelectedProduct,
} from "../../Store/Slices/productSlice";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";

export default function ProductDetailSection() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectedProduct);
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };
  async function handleAddItemToCart() {
    if (!product || product.stock <= 0 || isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      const result = await dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.images[0]?.url || "",
          quantity: 1,
          selectedOptions: {},
        })
      ).unwrap(); // This will throw if the action was rejected

      console.log("Item added to cart:", result);
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert(`Failed to add to cart: ${error.message}`);
    } finally {
      setIsAddingToCart(false);
    }
  }
  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="min-h-screen flex items-start justify-start flex-col md:flex-row bg-white p-6">
      {/* Left Side: Thumbnails and Main Image */}
      <div className="w-full md:w-1/2 items-end">
        <div
          className="w-full h-96 max-w-md relative overflow-hidden border border-gray-300 p-3 cursor-zoom-in ml-4"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={product.images[0].url}
            alt="Main Product"
            className={`w-full h-full object-contain rounded-lg transition-transform duration-300 ease-in-out ${
              hovered ? "scale-150" : "scale-100"
            }`}
            style={{ transformOrigin: `${position.x}% ${position.y}%` }}
          />
        </div>
      </div>

      {/* Right Side: Product Details */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

        <div className="flex items-center mt-2 text-gray-600">
          <div className="flex ml-4 text-yellow-500">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>

        <div className="flex items-center mt-3">
          {product.oldPrice && (
            <span className="text-lg line-through text-gray-500 mr-2">
              ₹{product.price}
            </span>
          )}
          <span className="text-2xl font-bold text-red-600">
            ₹{product.discountPrice}
          </span>
        </div>

        <p className="text-gray-600 mt-4">{product.description}</p>

        <div className="mt-2">
          <span
            className={`font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `In Stock: ${product.stock} items`
              : "Out of Stock"}
          </span>
        </div>

        <p className="text-gray-600 mt-4">
          Free Shipping (Estimated Delivery Time: 2-3 Days)
        </p>

        <div className="flex items-center mt-4">
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const value = Math.max(
                1,
                Math.min(product.stock, Number(e.target.value) || 1)
              );
              setQuantity(value);
            }}
            min={1}
            max={product.stock}
            className="border border-gray-300 rounded-lg p-2 w-16 text-center"
          />
          <button
            onClick={handleAddItemToCart}
            disabled={product.stock <= 0 || isAddingToCart}
            className={`ml-4 flex items-center justify-center px-6 py-3 rounded-lg transition duration-300 ${
              product.stock > 0
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            } ${isAddingToCart ? "opacity-50" : ""}`}
          >
            <FaShoppingCart className="mr-2" />
            {isAddingToCart
              ? "ADDING..."
              : product.stock > 0
              ? "ADD TO CART"
              : "OUT OF STOCK"}
          </button>
        </div>

        <div className="flex items-center mt-4 text-gray-700">
          <button className="flex items-center hover:text-red-500">
            <FaHeart className="mr-2" /> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
