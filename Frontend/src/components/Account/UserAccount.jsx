import { useState, useEffect } from "react";
import FloatingLabelInput from "../Sections/FLoatingInput";
import ProfileContent from "./ProfileContent";
import AddressContent from "./AddressContent";
import OrdersContent from "./OrdersContent";
import MyListContent from "./MytListContent";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Store/Slices/userSlice";
import { useSearchParams } from "react-router-dom";

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  const [selectedTab, setSelectedTab] = useState(initialTab);
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedTab(tab);
    }
  }, [searchParams]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full  min-h-1/2 bg-gray-100 p-2 lg:p-10">
      {/* Sidebar */}
      <aside className="w-full lg:w-[30%] lg:sticky lg:top-38 h-fit bg-white shadow-lg p-4 ">
        <div className="flex flex-col items-center border-b pb-4">
          <div className="w-20 h-20 bg-gray-400 text-white flex items-center justify-center text-2xl font-semibold rounded-full">
            M
          </div>
          <h2 className="mt-2 text-lg font-semibold">Muhammad Bilal</h2>
          <p className="text-gray-500 text-sm">m.bilalasif2004@gmail.com</p>
        </div>

        <ul className="mt-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer p-3 rounded-lg text-gray-700 flex items-center space-x-3 transition ${
                selectedTab === item.id
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => {
                if (item.id === "logout") {
                  const confirmed = window.confirm(
                    "Do you really want to logout?"
                  );
                  if (confirmed) {
                    dispatch(logoutUser()).then(() => {
                      navigate("/login");
                    });
                  }
                } else {
                  setSelectedTab(item.id);
                  setSearchParams({ tab: item.id });
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content Area */}
      <main className="h-fit w-full lg:w-[70%] ">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          {selectedTab === "profile" && <ProfileContent />}
          {selectedTab === "address" && <AddressContent />}
          {selectedTab === "list" && <MyListContent />}
          {selectedTab === "orders" && <OrdersContent />}
          {selectedTab === "logout" && <LogoutContent />}
        </div>
      </main>
    </div>
  );
};

// Menu items with icons (using Heroicons)
const menuItems = [
  { id: "profile", label: "My Profile", icon: "👤" },
  { id: "address", label: "Address", icon: "📍" },
  { id: "list", label: "My List", icon: "❤️" },
  { id: "orders", label: "My Orders", icon: "📦" },
  { id: "logout", label: "Logout", icon: "🚪" },
];

// Content Components
export default Profile;
