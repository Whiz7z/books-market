import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import CategoriesBar from "../components/CategoriesBar";
import ProductsList from "../components/ProductsList";

const ProductsPage = () => {
  return (
    <div className="products-wrapper">
      <div className="products-sidebar">
        <CategoriesBar />
      </div>
      <div className="products-content">
        <ProductsList />
      </div>
    </div>
  );
};

export default ProductsPage;
