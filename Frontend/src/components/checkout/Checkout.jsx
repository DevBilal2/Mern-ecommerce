import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEllipsisV } from "react-icons/fa";
import {
  selectCartItems,
  selectTotalAmount,
} from "../../Store/Slices/cartSlice";
import {
  selectAddresses,
  selectAddressStatus,
  fetchAddresses,
  addAddress,
  deleteAddress,
} from "../../Store/Slices/address";
import AddressPage from "../Account/AddressContent";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  // Redux selectors
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  const handleSaveAddress = async (newAddress) => {
    const addressData = {
      addressLine1: newAddress.addressLine1,
      addressLine2: newAddress.addressLine2 || "",
      city: newAddress.city,
      state: newAddress.state,
      pincode: newAddress.pincode,
      country: newAddress.country,
      phone: newAddress.phone,
      countryCode: newAddress.countryCode || "+91",
      landmark: newAddress.landmark || "",
      addressType: newAddress.addressType,
    };

    dispatch(addAddress(addressData));
    setIsPopupOpen(false);
  };

  const handleDeleteAddress = async (addressId, index) => {
    dispatch(deleteAddress(addressId));
    if (selectedAddressIndex === index) {
      setSelectedAddressIndex(0);
    }
  };

  const toggleMenu = (index) => {
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditingAddress(null);
  };

  const closeMenu = () => {
    setActiveMenuIndex(null);
  };

  return (
    <div className="flex flex-col md:flex-row mx-auto p-4 max-w-[90%]">
      {/* Address Section */}
      <div className="w-full md:w-[55%] mb-6 md:mb-0 md:mr-4">
        <AddressPage />
      </div>

      {/* Order Summary Section */}
      <div className="w-full md:w-[45%] lg:sticky lg:top-20">
        <h2 className="text-xl font-bold mb-4">Your Order</h2>
        <div className="max-h-[80vh] overflow-auto border rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Product</th>
                <th className="text-right py-3 px-4 font-medium">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={`${item.id}-${index}`} className="border-t">
                  <td className="py-3 px-4">
                    <div className="font-medium">
                      {item.name.length > 20
                        ? `${item.name.substring(0, 20)}...`
                        : item.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4 font-medium transition-colors"
              onClick={() => console.log("Place order clicked")}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
