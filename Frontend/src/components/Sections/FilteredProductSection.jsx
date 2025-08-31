import React from "react";
import Product from "../product/Product";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  getProductsStatus,
  getProductsError,
} from "../../Store/Slices/productSlice";
import { fetchProducts } from "../../Store/ApiCalls";

import {
  selectFilters,
  selectSearchQuery,
} from "../../Store/Slices/filterSlice";
const FilteredProductSection = () => {
  const products = useSelector(selectAllProducts);
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  const filters = useSelector(selectFilters);
  const searchQuery = useSelector(selectSearchQuery);
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category.toUpperCase());

    const price = parseFloat(product.price.toString().replace(/[^\d.]/g, ""));

    const matchesPrice =
      price >= filters.priceRange[0] && price <= filters.priceRange[1];
    const productRating = Math.round(product.ratings || 0);
    const matchesRating =
      filters.ratings.length === 0 || filters.ratings.includes(productRating);

    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  return (
    <div className="mb-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
      {" "}
      {filteredProducts.map((product) => (
        <Product key={product._id} product={product} verticleSort={true} />
      ))}
    </div>
  );
};

export default FilteredProductSection;
