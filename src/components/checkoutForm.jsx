import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OpTtxCvD3bM4DNloYVDLFBW3kKEgYmFt1DPSoLrG1pE9G2NwKuankww45q8HXatdbcpXnm3z53D7rEdyeGlzzm500IwHBFISn"
);

const CheckOutForm = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "pi_3QMsP8CvD3bM4DNl1ReQ520w_secret_FvNoynwciOjgz7OsfeSMtEVSX",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};
