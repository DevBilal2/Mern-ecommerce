import React from "react";
import Sidebar from "../components/Sections/SideBarSection";
import SortSection from "../components/Sections/SortSection";
import FilteredProductSection from "../components/Sections/FilteredProductSection";

const FilterProductPage = () => {
  return (
    <div className="relative w-full h-full flex">
      {/* Sidebar - Fixed on the left */}
      <div className="hidden lg:block h-screen md:w-[20%]">
        <Sidebar />
      </div>

      {/* Content Section - Takes remaining width */}
      <div className="flex flex-col w-full  h-screen">
        {/* Sort Section - STICKY instead of fixed */}
        <div className=" w-full h-fit z-10">
          <SortSection />
        </div>

        {/* Product List - Scrollable */}
        <div className="w-full h-full overflow-auto ">
          <FilteredProductSection />
        </div>
      </div>
    </div>
  );
};

export default FilterProductPage;
