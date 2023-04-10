import React from "react";
import { useGetMyOrdersQuery } from "../../redux/store";
import OrderItem from "./OrderItem";

import "../../styles/adminOrder.css";

const Orders = () => {
  const { data, error, isFetching } = useGetMyOrdersQuery();

  console.log(data);
  return (
    <div className="orders-wrapper">
      <div className="order_list-page">
        <h2 className="order-title">Orders</h2>
        <div className="order_list-container">
          <div className="order-main-titles">
            <div className="order-title-id">Order Id</div>
            <div className="order-title-date">Date</div>
            <div className="order-items">Items</div>

            <div className="order-price">Price</div>
            <div className="order-status">Status</div>
          </div>
          {data &&
            data.map((order) => <OrderItem key={order._id} order={order} />)}
        </div>
      </div>
    </div>
  );
};

export default Orders;
