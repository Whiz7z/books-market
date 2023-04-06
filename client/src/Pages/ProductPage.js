import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/store";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/store";
import { useSelectedTags } from "../components/zustand/store";
import "../styles/productPage.css";

const ProductPage = () => {
  const { setTags } = useSelectedTags((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: product, isError } = useGetProductByIdQuery(id);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };
  const clickTagHandler = (tag) => {
    setTags([tag]);
    navigate("/products");
  };

  return (
    <div className="product-wrapper">
      <button className="go-back-btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      {product && (
        <div className="product-content">
          <div className="product_image-block">
            <img
              src={`http://localhost:5000/images/${product.imagePath}`}
              className="product_image"
              alt="product"
            />
          </div>
          <div className="product_info">
            <h2 className="product_info-title">{product.title}</h2>
            <h4 className="product_info-author">
              Author: <span>{product.author}</span>
            </h4>
            <h4 className="product_info-category">
              Category: <span>{product.category}</span>
            </h4>

            <div className="product_tags">
              <h4>Tags:</h4>
              {product.tags.map((tag) => (
                <div
                  key={tag}
                  className="product_tag-item"
                  onClick={() => {
                    clickTagHandler(tag);
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="product_add-to-cart">
            <h4 className="product_add-to-cart-price">${product.price}</h4>
            <button
              className="product_page-btn"
              onClick={() => addToCartHandler(product)}
            >
              Add to cart
            </button>
          </div>
          <div className="product_description">
            <h3 className="product_description-title">Description</h3>
            <p className="product_description-content">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
