import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/store";
import {
  useGetAllProductsQuery,
  useGetCategoriesAndPreviewQuery,
} from "../redux/store";
import { createGlobalStyle } from "styled-components";

const ProductsList = ({ products }) => {
  const choosenCategory = useSelector(
    (state) => state.products.categoryChoosen
  );
  const { data, error, isFetching } = useGetAllProductsQuery(choosenCategory);
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <h2 className="products-title">Products</h2>

      {products && products.length > 0 ? (
        <div className="product_list-container">
          {products.map((product) => (
            <div key={product._id} className="product_list-item">
              <img
                src={`http://localhost:5000/images/${product.imagePath}`}
                alt="product"
                className="product_item-image"
              />
              <p className="product_item-title">{product.title}</p>
              <p className="product_item-description">{product.description}</p>
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
      ) : (
        <h3 className="products_title-notfound">Products not found</h3>
      )}
    </>
  );
};

export default ProductsList;
