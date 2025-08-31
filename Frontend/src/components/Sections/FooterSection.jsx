import React from "react";
import { FaComments } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-10 px-6 ">
      <div className="container mx-auto flex flex-col gap-10">
        {/* Contact & Links Section */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row items-start gap-10">
          {/* Contact Section */}
          <div className="w-full">
            <h2 className="text-lg font-bold mb-3">Contact us</h2>
            <p>Classyshop - Mega Super Store</p>
            <p>507-Union Trade Centre France</p>
            <p className="mt-2 text-red-500 font-semibold">
              sales@yourcompany.com
            </p>
            <p className="text-red-500 text-xl font-bold mt-2">
              (+91) 9876-543-210
            </p>
            <div className="flex items-center gap-2 mt-4 text-red-500 font-semibold cursor-pointer">
              <FaComments size={20} />
              <span>Online Chat</span>
            </div>
            <p className="text-gray-600">Get Expert Help</p>

            <div className="md:hidden sm:block border-b border-gray-300 mt-10"></div>
          </div>

          {/* Products & Company Section */}
          <div className="w-full flex flex-col sm:flex-row gap-10">
            <div className="hidden lg:block border-l border-gray-400"></div>
            {/* Products Section */}
            <div className="w-full sm:w-1/2">
              <h2 className="text-lg font-bold mb-3">Products</h2>
              <ul className="space-y-2">
                {[
                  "Prices drop",
                  "New products",
                  "Best sales",
                  "Contact us",
                  "Sitemap",
                  "Stores",
                ].map((item) => (
                  <li key={item} className="hover:text-red-500 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l border-gray-400"></div>
            {/* Our Company Section */}
            <div className="w-full sm:w-1/2">
              <h2 className="text-lg font-bold mb-3">Our company</h2>
              <ul className="space-y-2">
                {[
                  "Delivery",
                  "Legal Notice",
                  "Terms and conditions of use",
                  "About us",
                  "Secure payment",
                  "Login",
                ].map((item) => (
                  <li key={item} className="hover:text-red-500 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider - Full width for separation */}
        <div className="border-t border-gray-300"></div>

        {/* Newsletter Section */}
        <div className="w-full md:w-3/4 lg:w-2/3 mx-auto text-center">
          <h2 className="text-lg font-bold mb-3">Subscribe to newsletter</h2>
          <p className="text-gray-600 text-sm mb-4">
            Subscribe to our latest newsletter to get news about special
            discounts.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-auto"
            />
            <button className="bg-red-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-600 w-full sm:w-auto">
              SUBSCRIBE
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <input type="checkbox" id="terms" className="w-4 h-4" />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              I agree to the terms and conditions and the privacy policy
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
