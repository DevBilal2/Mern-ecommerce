import React from "react";
import { Truck } from "lucide-react"; // Using Lucide for the truck icon

const FreeShippingBanner = () => {
  return (
    <div className="border border-red-300 p-4 rounded-md w-full flex flex-col md:flex-row items-center justify-between text-gray-700 mt-10 ">
      {/* Left Side - Icon & Title */}
      <div className="flex items-center gap-2">
        <Truck className="w-6 h-6 text-gray-600" />
        <span className="text-lg font-semibold">FREE SHIPPING</span>
      </div>

      {/* Middle Text */}
      <p className="text-sm text-center md:text-left">
        Free Delivery Now On Your First Order and over $200
      </p>

      {/* Right Side - Price */}
      <span className="text-lg font-bold text-gray-800">- Only $200*</span>
    </div>
  );
};

export default FreeShippingBanner;
