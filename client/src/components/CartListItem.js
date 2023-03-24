import React from "react";
import { useDispatch } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { changeQuantity, removeItem } from "../redux/store";

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
    <div className="cart_list-item">
      <img
        className="cart_item_img"
        src={`http://localhost:5000/images/${product.item.imagePath}`}
        alt="product"
      />
      <div className="cart_item-info">
        <h3>{product.item.title}</h3>
        <p>{product.item.description}</p>
        <p>Price - ${product.item.price}</p>
      </div>
      <div className="cart_item-actions">
        <button
          className="cart_item-close-btn"
          onClick={() => removeItemHandler(product.item._id)}
        >
          Remove
        </button>
        <h3 className="cart-item-priceTotal">
          Total price - ${product.item.price * product.quantity}
        </h3>
        <div className="cart_item-count-block">
          <button
            className="cart_item_count-btn"
            onClick={() =>
              changeQuantityHandler(product.item._id, null, "subtract")
            }
          >
            -
          </button>
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
          <button
            className="cart_item_count-btn"
            onClick={() => changeQuantityHandler(product.item._id, null, "add")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartListItem;
