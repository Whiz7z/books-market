import React from "react";
import { useDispatch } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { changeQuantity, removeItem } from "../redux/store";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { IconContext } from "react-icons/lib";

const CartListItem = ({ product }) => {
  const dispatch = useDispatch();

  const changeQuantityHandler = (id, quantity, operation) => {
    dispatch(changeQuantity({ id, quantity, operation }));
  };

  const removeItemHandler = (id) => {
    dispatch(removeItem(id));
  };
  console.log(product);
  return (
    <IconContext.Provider value={{ backgroundColor: "#000" }}>
      <div className="cart_list-item">
        <div className="cart_item-description">
          <img
            className="cart_item_img"
            src={`http://localhost:5000/images/${product.item.imagePath}`}
            alt="product"
          />
          <div className="cart_item-info">
            <h3>{product.item.title}</h3>
            <p className="cart_item_info-price">
              Price - ${product.item.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="cart_item-quantity">
          <div className="cart_item-count-block">
            <HiOutlineMinus
              className="cart_item_count-btn"
              onClick={() =>
                changeQuantityHandler(product.item._id, null, "subtract")
              }
            />
            <input
              type="number"
              value={product.quantity === 0 ? "" : product.quantity.toString()}
              onChange={(e) => {
                changeQuantityHandler(
                  product.item._id,
                  parseInt(e.target.value),
                  null
                );
              }}
              min={0}
              className="cart_item-input"
            />

            <HiOutlinePlus
              className="cart_item_count-btn"
              onClick={() =>
                changeQuantityHandler(product.item._id, null, "add")
              }
            />
          </div>
        </div>
        <div className="cart_item-remove">
          <button
            className="cart_item-close-btn"
            onClick={() => removeItemHandler(product.item._id)}
          >
            Remove
          </button>
        </div>
        <div className="cart_item-price">
          <h3 className="cart-item-priceTotal">
            ${(product.item.price * product.quantity).toFixed(2)}
          </h3>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default CartListItem;
