import React from "react";
import CartListItem from "./CartListItem";
import { useSelector } from "react-redux";

const CartList = () => {
  const items = useSelector((state) => state.cart.items);
  return (
    <div className="cart-list">
      <div className="cart-titles">
        <div className="cart-description">Description</div>
        <div className="cart-quantity">Quantity</div>
        <div className="cart-remove">Remove</div>
        <div className="cart-price">Subtotal price</div>
      </div>

      {items &&
        items.map((item) => {
          return <CartListItem key={item.item._id} product={item} />;
        })}
    </div>
  );
};

export default CartList;
