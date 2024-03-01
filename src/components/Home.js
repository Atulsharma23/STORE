import React, { useState, useEffect } from "react";

const PaymentButton = () => {
  const [paymentURL, setPaymentURL] = useState("");
  const [paymentURL2, setPaymentURL2] = useState("");

  useEffect(() => {
    // Construct the payment URL when the component mounts
    
    const merchantId = "22dbe0e01a";
    const merchantSecret = "3a913482a50fd5eee395c0da";
    const totalAmount = 100;
    const transactionType = "invoice";
    const billingInterval = 0; // Assuming you want to set billing interval to 0, change as needed

    const url = `https://test.payken.io/invoice/merchant_id=${merchantId}&merchant_secret=${merchantSecret}?total=${totalAmount}&type=${transactionType}&interval=${billingInterval}`;

    setPaymentURL(url);
  }, []);

  useEffect(() => {
    const merchantId = "22dbe0e01a";
    const merchantSecret = "dc25cb8eda2766d7e1f8d882";
    const totalAmount = 200;
    const transactionType = "recurring";
    const billingInterval = 1; // Assuming you want to set billing interval to 0, change as needed

    const url2 = `https://test.payken.io/invoice/merchant_id=${merchantId}&merchant_secret=${merchantSecret}?total=${totalAmount}&type=${transactionType}&interval=${billingInterval}`;

    setPaymentURL2(url2);
  }, []);

  const handleButtonClick = () => {
    // Redirect to the payment URL when the button is clicked
    window.location.href = paymentURL;
  };

  const handleButtonClick2 = () => {
    // Redirect to the payment URL when the button is clicked
    window.location.href = paymentURL2;
  };

  return (
    <div className="container">
      <div className="btn-container">
      <button className="btn btn-primary" onClick={handleButtonClick}>
        Invoice $100{" "}
      </button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button className="btn btn-primary" onClick={handleButtonClick2}>
        Recurring inoice $200{" "}
      </button>
      </div>
    </div>
  );
};

export default PaymentButton;
