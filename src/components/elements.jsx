import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Formik, Form, Field, ErrorMessage } from "formik";

const stripePromise = loadStripe(
  "pk_test_51OpTtxCvD3bM4DNloYVDLFBW3kKEgYmFt1DPSoLrG1pE9G2NwKuankww45q8HXatdbcpXnm3z53D7rEdyeGlzzm500IwHBFISn"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement || !cardElement._complete) {
      setErrors({ card: "Please fill in the card details" });
      setSubmitting(false);
      return;
    }
    const { error, token } = await stripe.createToken(cardElement);
    if (error) {
      console.error("Error:", error);
      setErrors({ card: error.message });
    } else {
      console.log("Success! Token:", token);
      alert("Payment token generated. Check the console.");
    }
    setSubmitting(false);
  };

  return (
    <Formik initialValues={{ card: "" }} onSubmit={handleSubmit}>
      {({ isSubmitting, errors }) => (
        <Form>
          <div>
            <label>Card Details</label>
            <CardElement />
            <ErrorMessage
              name="card"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !stripe}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Pay
          </button>
        </Form>
      )}
    </Formik>
  );
};

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeCheckout;
