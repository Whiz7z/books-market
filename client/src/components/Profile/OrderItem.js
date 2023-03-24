import React from "react";
import { Field, Form, Formik } from "formik";

const OrderItem = ({ order }) => {
  return (
    <div className="order_item-container">
      <div className="order-id">{order._id}</div>
      <div className="order-titles">
        {order.orderItems.map((item) => (
          <p key={item.title}>
            {item.title} - ({item.quantity})
          </p>
        ))}
      </div>
      <div className="order-user-id-gmails">
        <p>{`User E-mail - ${order.user.email}`}</p>
        <p>{`User Id - ${order.user._id}`}</p>
      </div>
      <div className="order-total-price">
        <p>Total price - ${order.totalPrice}</p>
      </div>
      <div className="order_change_status-container">
        <p>Status - {order.status}</p>
        <Formik
          initialValues={{ status: "" }}
          onSubmit={(values, actions) => {}}
        >
          {({ errors, touched, values, handleChange, setFieldValue }) => (
            <Form className="order_change_status-form">
              <button className="order_cancel-btn">Cancel order</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OrderItem;
