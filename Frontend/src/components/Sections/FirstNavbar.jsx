import React from "react";

const FirstNavbar = () => {
  return (
    <div className=" hidden sm:flex items-center justify-between p-2 ">
      <p className="text-sm">
        Get up to 50% off new season styles, limited time only
      </p>
      <ul className="flex gap-2 items-center text-sm ">
        <li className="mr-2 ">Help center</li>
        <li className="mr-2">Order Tracking</li>
      </ul>
    </div>
  );
};

export default FirstNavbar;
