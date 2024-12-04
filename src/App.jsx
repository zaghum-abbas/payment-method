import React from "react";
import StripeCheckout from "./components/elements";
import CheckoutForm from "./components/form";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Stripe Test Payment
        </h1>
        {/* <CheckoutForm /> */}
        <StripeCheckout />
      </div>
    </div>
  );
};

export default App;
