import React from "react";
import ProductDetailSection from "../components/Sections/ProductDetailSection";
import GeneralProductShow from "../components/product/GeneralProductShow";

const ProductDetail = () => {
  return (
    <>
      <div className="h-full w-full">
        <ProductDetailSection />
      </div>
      <div className="mb-10  ">
        <GeneralProductShow title="Related Products" />
      </div>
    </>
  );
};

export default ProductDetail;
