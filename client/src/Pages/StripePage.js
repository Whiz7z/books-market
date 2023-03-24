import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "../components/PaymentForm";
import axios from "axios";
import { useSelector } from "react-redux";

const PUBLIC_KEY =
  "pk_test_51Mj4g5AqeUFu6vBIark0tlBPID9ZsbqtJEx1YdL4dLDSeKdkhFwHVTE4Iz4HV1ITyOBVxokyc6YmfhynKgjT8Udd008ShFAr3a";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripePage = () => {
  const items = useSelector((state) => state.cart.items);
  const [clientSecret, setClientSecret] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const createPayment = async () => {
      const response = await axios.post("/api/payment/create-payment-intent", {
        items,
      });
      console.log(response.data.totalPrice);
      setTotalPrice(response.data.totalPrice);
      setClientSecret(response.data.clientSecret);
    };

    createPayment();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      {clientSecret && (
        <Elements stripe={stripeTestPromise} options={options}>
          <PaymentForm totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
};

export default StripePage;
