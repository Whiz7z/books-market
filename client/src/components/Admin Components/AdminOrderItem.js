import React from "react";
import "../../styles/adminOrder.css";

import { Field, Form, Formik, FormikProps } from "formik";
import { useUpdateOrderStatusMutation } from "../../redux/store";
import { createGlobalStyle } from "styled-components";

const AdminOrderItem = ({ order }) => {
  const [changeStatus, results] = useUpdateOrderStatusMutation();
  const createdAt = new Date(order.createdAt).toISOString().slice(0, 10);
  return (
    <div
      className={`order_item-container-admin ${
        order.status === "Prepearing"
          ? "status-prepearing"
          : order.status === "Dispatched"
          ? "status-dispatched"
          : order.status === "Delivered"
          ? "status-delivered"
          : order.status === "Canceled"
          ? "status-canceled"
          : null
      }`}
    >
      <div className="order-id">{order._id}</div>
      <div className="order-date">{createdAt}</div>
      <div className="order-titles">
        {order.orderItems.map((item) => (
          <p key={item.title}>
            {item.title} - ({item.quantity})
          </p>
        ))}
      </div>
      <div className="order-user-id-gmails">
        <p>{`E-mail - ${order.user.email}`}</p>
        <p>{`Id - ${order.user._id}`}</p>
      </div>
      <div className="order-total-price">
        <p>${order.totalPrice.toFixed(2)}</p>
      </div>
      <div className="order_change_status-container">
        <p>{order.status}</p>
        {order.status !== "Canceled" && (
          <Formik
            initialValues={{ status: "" }}
            onSubmit={(values, actions) => {
              console.log(values.status, order._id);
              if (values.status.length > 1) {
                const payload = { orderId: order._id, status: values.status };
                changeStatus(payload);
              }
              actions.resetForm();
            }}
          >
            {({ errors, touched, values, handleChange, setFieldValue }) => (
              <Form className="order_change_status-form">
                <Field
                  as="select"
                  name="status"
                  className="admin_order_change_status-field"
                >
                  <option value="blanc"></option>
                  <option value="prepearing">Prepearing</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                </Field>

                <button className="admin_order_change_status-btn" type="submit">
                  Change status
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default AdminOrderItem;
