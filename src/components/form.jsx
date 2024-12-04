import React, { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Formik, Form, Field } from "formik";

const stripePromise = loadStripe(
  "pk_test_51OpTtxCvD3bM4DNloYVDLFBW3kKEgYmFt1DPSoLrG1pE9G2NwKuankww45q8HXatdbcpXnm3z53D7rEdyeGlzzm500IwHBFISn"
);

const InjectedCheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const mockClientSecret =
      "pi_3QMs7sCvD3bM4DNl1NCUxkkf_secret_WSaZT1CSZuBPo8iXtpdGrr8U4";
    setClientSecret(mockClientSecret);
  }, []);

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    )
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (!stripe || !elements) {
      setErrors({ submit: "Stripe is not initialized." });
      setSubmitting(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
    });

    if (result.error) {
      console.log("Payment error:", result.error.message);
      setErrors({ submit: result.error.message });
    } else {
      console.log("Payment succeeded:", result.paymentIntent);
      alert("Payment successful!");
    }

    setSubmitting(false);
  };

  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {({ isSubmitting, errors }) => (
        <Form>
          <div>
            <PaymentElement />
          </div>
          {errors.submit && (
            <div className="text-red-500 text-sm mt-2">{errors.submit}</div>
          )}
          <button
            type="submit"
            className="bg-blue-700 p-3 rounded-lg text-white mx-auto mt-3 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default InjectedCheckoutForm;
