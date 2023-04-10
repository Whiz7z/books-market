import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useCancelOrderMutation } from "../redux/store";

const CancelOrderModal = ({ orderId, onCloseModal }) => {
  const [cancelOrder, results] = useCancelOrderMutation();

  const cancelOrderHandler = async () => {
    const payload = { orderId: orderId, status: "Canceled" };
    await cancelOrder(payload);
  };
  return (
    <div className="confirm-cancel-order-container">
      <div className="confirm-cancel-order-form">
        <h3 className="cancel-order-title">Are you sure?</h3>
        <button
          onClick={() => onCloseModal()}
          className="cancel_order-back-btn"
        >
          Go back
        </button>
        <button
          onClick={() => cancelOrderHandler()}
          className="cancel_order-confirm-btn"
        >
          Confirm and cancel
        </button>
      </div>
    </div>
  );
};

export default CancelOrderModal;
