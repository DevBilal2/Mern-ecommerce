import React from "react";

import visa from "../../assets/visa.png";
import paypal from "../../assets/paypal.png";
import mastercard from "../../assets/mastercard.png";
import amex from "../../assets/amex.png";
import {
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

const LastSection = () => {
  return (
    <div className="mb-13 lg:mb-0 border border-gray-300 w-full">
      {" "}
      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-sm text-gray-600 m-2">
        {/* Social Media Icons */}
        <div className="flex gap-4 mb-4 md:mb-0">
          {[FaFacebookF, FaYoutube, FaPinterestP, FaInstagram].map(
            (Icon, index) => (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer hover:bg-gray-100"
              >
                <Icon className="text-gray-700" size={16} />
              </div>
            )
          )}
        </div>

        {/* Copyright */}
        <p>© 2024 - Ecommerce Template</p>

        {/* Payment Methods */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <img src={visa} alt="Visa" className="h-6" />
          <img src={mastercard} alt="MasterCard" className="h-6" />
          <img src={amex} alt="American Express" className="h-6" />
          <img src={paypal} alt="PayPal" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default LastSection;
