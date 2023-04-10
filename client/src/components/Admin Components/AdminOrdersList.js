import React from "react";
import { useGetAllOrdersQuery } from "../../redux/store";
import AdminOrderItem from "./AdminOrderItem";

const AdminOrdersList = () => {
  const { data, error, isFetching } = useGetAllOrdersQuery();
  console.log(data);
  return (
    <div className="order_list-page">
      <h2 className="order-title">Orders</h2>
      <div className="order_list-container">
        <div className="order-main-titles-admin">
          <div className="order-title-id">Order Id</div>
          <div className="order-title-date">Date</div>
          <div className="order-items">Items</div>
          <div className="order-user-info">User info</div>
          <div className="order-price">Price</div>
          <div className="order-status">Status</div>
        </div>
        {data &&
          data.map((order) => <AdminOrderItem key={order._id} order={order} />)}
      </div>
    </div>
  );
};

export default AdminOrdersList;
