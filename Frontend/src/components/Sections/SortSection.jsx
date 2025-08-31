import { useState } from "react";
import { List, Grid, ChevronDown } from "lucide-react";

export default function SortSection() {
  const [sortOption, setSortOption] = useState("Name, Z To A");

  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg ">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded hover:bg-gray-200">
          <List className="w-5 h-5" />
        </button>
        <button className="p-2 rounded hover:bg-gray-200">
          <Grid className="w-5 h-5 text-red-500" />
        </button>
        <p className="hidden sm:block text-gray-700">There are 9 products.</p>
      </div>

      {/* Right Side - Sort Dropdown */}
      <div className="flex items-center gap-2 relative">
        <span className="text-gray-600">Sort By</span>
        <button className="text-sm flex items-center border px-1 py-1 rounded-lg bg-white shadow-sm hover:bg-gray-200">
          {sortOption}
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md hidden group-hover:block">
          <button
            onClick={() => setSortOption("Name, A To Z")}
            className="block w-full px-4 py-2 text-left hover:bg-gray-200"
          >
            Name, A To Z
          </button>
          <button
            onClick={() => setSortOption("Name, Z To A")}
            className="block w-full px-2 py-1 text-left hover:bg-gray-200"
          >
            Name, Z To A
          </button>
        </div>
      </div>
    </div>
  );
}
