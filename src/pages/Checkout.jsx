import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { resetCart } from "../redux/reducer/cartReducer";

const stripePromise = loadStripe(
  "pk_test_51P6rJpSFLumvHxSQkNEy7Rlj9j3p8Khl5m9kF2WpLEFGAzuZcQZJGqzxqsCmonSlokybsCaUi6hQTM6UYKw0CsQ500Ke8K9Mbe"
);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);
  const {
    shippingInfo,
    cartItem,
    subTotal,
    tax,
    shippingCharges,
    discount,
    total,
  } = useSelector((state) => state.cartReducer);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!stripe || !elements) return;
      setProcessing(true);

      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin },
        redirect: "if_required",
      });

      if (error) {
        setProcessing(false);
        return toast.error(error.message, { position: "top-center" });
      }

      if (paymentIntent.status === "succeeded") {
        const { data } = await axios.post(
          "",
          {
            shippingInfo,
            subtotal: subTotal,
            tax,
            shippingCharges,
            discout: discount,
            total,
            orderItems: cartItem,
          },
          {
            headers: {
              Authorization: user?.token,
            },
          }
        );
        if (data.success == true) {
          dispatch(resetCart());
          navigate("/orders");
          toast.success("Order placed successfully", {
            position: "top-center",
          });
        }
      }
      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[400px] w-full m-auto my-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <PaymentElement />
        <button
          disabled={processing}
          className="w-full text-xl bg-teal-700 p-2 text-white rounded-md"
        >
          {processing ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();
  const clientSecret = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout;
