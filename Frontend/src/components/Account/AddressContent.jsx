import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressPopup from "./AddressPopUp";
import { FaEllipsisV } from "react-icons/fa";
import {
  fetchAddresses,
  addAddress,
  deleteAddress,
  selectAddresses,
  selectAddressStatus,
} from "../../Store/Slices/address";

const AccountPage = () => {
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const addresses = useSelector(selectAddresses) || [];
  const addressStatus = useSelector(selectAddressStatus);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  console.log(editingAddress);

  console.log("status:", addressStatus, "addresses:", addresses);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }

    if (activeMenuIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenuIndex]);
  const removeAddress = (id) => {
    dispatch(deleteAddress(id));
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
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-bold mb-4">Address Details</h2>
      <button
        onClick={openPopup}
        className="w-full border border-dotted p-4 bg-blue-200 hover:bg-blue-100 cursor-pointer rounded"
      >
        Add address
      </button>

      <div className="   mt-5 space-y-3">
        {addresses.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-col text-sm border border-dotted rounded p-2 gap-1 bg-gray-100 relative"
          >
            <div className="flex justify-between">
              <p className="w-fit p-1 rounded bg-gray-300">
                {item.addressType}
              </p>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(index);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <FaEllipsisV className="text-gray-500" />
                </button>

                {activeMenuIndex === index && (
                  <ul
                    ref={menuRef} // ✅ This is the fix
                    className="absolute right-0 mt-1 w-24 border border-gray-300 rounded bg-white shadow-lg z-10"
                  >
                    <li
                      onClick={() => {
                        setEditingAddress(item);
                        setIsPopupOpen(true);
                        closeMenu();
                      }}
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      Edit
                    </li>
                    <li
                      onClick={() => {
                        removeAddress(item._id);
                        closeMenu();
                      }}
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      Delete
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <p className="font-bold">Muhammad Bilal {item.phone}</p>
            <div className="flex flex-wrap gap-2 text-gray-400 text-sm break-words whitespace-normal">
              <p>{item.addressLine1}</p>
              <p>{item.city}</p>
              <p>{item.country}</p>
              <p>{item.state}</p>
              <p>{item.pincode}</p>
            </div>
          </div>
        ))}
      </div>

      <AddressPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        editingAddress={editingAddress} // 🟢 Add this
        initialValues={editingAddress}
      />
    </div>
  );
};

export default AccountPage;
