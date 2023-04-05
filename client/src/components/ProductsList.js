import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/store";
import {
  useGetAllProductsQuery,
  useGetCategoriesAndPreviewQuery,
} from "../redux/store";
import { createGlobalStyle } from "styled-components";

import { useSelectedTags } from "./zustand/store";

const ProductsList = ({ products, searchByCategory, clearSearch }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const choosenCategory = useSelector(
    (state) => state.products.categoryChoosen
  );
  const { data, error, isFetching } = useGetAllProductsQuery(category);
  const { tags, setTags, resetTags } = useSelectedTags((state) => state);
  const dispatch = useDispatch();

  const addToCartHandler = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const goBackHandler = () => {
    if (tags.length === 0) {
      navigate("/products");
    } else {
      resetTags();
      clearSearch();
    }
  };

  const moveToProductPage = (productId) => {
    // e.stopPropagation();
    navigate(`${productId}`);
  };

  return (
    <>
      <div className="products-content">
        <h2 className="products-title">Products</h2>
        <button onClick={goBackHandler} className="products_goback-btn">
          back to collections
        </button>
        {!searchByCategory && products && products.length > 0 ? (
          <div className="product_list-container">
            {products.map((product) => (
              <div
                key={product._id}
                className="product_list-item"
                onClick={() => moveToProductPage(product._id)}
              >
                <img
                  src={`http://localhost:5000/images/${product.imagePath}`}
                  alt="product"
                  className="product_item-image"
                />
                <p className="product_item-title">{product.title}</p>
                <p className="product_item-description">
                  {product.description}
                </p>
                <div className="product-add-to-cart">
                  <button
                    className="addtocart-btn"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </button>
                  <span className="product_item-price">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : searchByCategory && data ? (
          <div className="product_list-container">
            {data.map((product) => (
              <div
                key={product._id}
                className="product_list-item"
                onClick={() => moveToProductPage(product._id)}
              >
                <img
                  src={`http://localhost:5000/images/${product.imagePath}`}
                  alt="product"
                  className="product_item-image"
                />
                <p className="product_item-title">{product.title}</p>
                <p className="product_item-description">
                  {product.description}
                </p>
                <div className="product-add-to-cart">
                  <button
                    className="addtocart-btn"
                    onClick={(e) => addToCartHandler(e, product)}
                  >
                    Add to cart
                  </button>
                  <span className="product_item-price">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="products_title-notfound">Products not found</h3>
        )}
      </div>
    </>
  );
};

export default ProductsList;
