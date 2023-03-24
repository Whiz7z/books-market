import React from "react";
import CartListItem from "./CartListItem";
import { useSelector } from "react-redux";

const CartList = () => {
  const items = useSelector((state) => state.cart.items);
  return (
    <div className="cart-list">
      {items &&
        items.map((item) => {
          return <CartListItem key={item.item._id} product={item} />;
        })}
    </div>
  );
};

export default CartList;
