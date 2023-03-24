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
        {data &&
          data.map((order) => <AdminOrderItem key={order._id} order={order} />)}
      </div>
    </div>
  );
};

export default AdminOrdersList;
