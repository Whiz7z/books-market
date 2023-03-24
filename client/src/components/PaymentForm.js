import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/payment.css";
import { createOrder } from "../redux/actions/orderActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  removeAllItems,
  clearOrderAddress,
  clearOrderInfo,
} from "../redux/store";

export default function PaymentForm({ totalPrice }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page

        return_url: "http://localhost:3000/payment",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    console.log(clientSecret);

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          //set post request to server to create the new order in the database
          const buyer = JSON.parse(localStorage.getItem("orderInfo")).buyer;
          const items = JSON.parse(localStorage.getItem("cartItems"));
          const address = JSON.parse(localStorage.getItem("orderAddress"));

          console.log("aaaaa - ", buyer, items, address);
          dispatch(createOrder({ buyer, items, address }));

          dispatch(removeAllItems());
          dispatch(clearOrderInfo());
          dispatch(clearOrderAddress());
          navigate("/products");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="pay-form">
      <h2 className="price-title">You are paying - ${totalPrice}</h2>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
