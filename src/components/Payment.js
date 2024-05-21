import React, { useState, useEffect } from "react";
import product1 from "../photo/muscleblage.webp";
import product2 from "../photo/mamearth.webp";
import product3 from "../photo/shopping.webp";

const PaymentButton = () => {
  const [paymentURL, setPaymentURL] = useState("");
  const [paymentURL2, setPaymentURL2] = useState("");
  const [paymentURL3, setPaymentURL3] = useState("");

  useEffect(() => {
    // Construct the payment URL when the component mounts

    const merchantId = "21de0f4c91";
    const merchantSecret = "c656922abaea68c102f68993";
    const totalAmount = 100;
    const transactionType = "purchase";
    const displayName = "test";
    const user_id = "atulblockcoders@gmail.com";
    const currency = "USD";
    // Assuming you want to set billing interval to 0, change as needed

    const url = `https://test.payken.io/invoice/merchant_id=${merchantId}&merchant_secret=${merchantSecret}?display_name=${displayName}&total=${totalAmount}&type=${transactionType}&user_id=${user_id}&currency_code=${currency}`;
    setPaymentURL(url);
  }, []);

  useEffect(() => {
    const merchantId2 = "22dbe0e01a";
    const merchantSecret2 = "8faa5d6526b20aaadc79b0e9";
    const totalAmount2 = 100;
    const transactionType2 = "purchase";
    const displayName2 = "test";
    const user_id2 = "atulblockcoders@gmail.com";
    const billingInterval = 1; // Assuming you want to set billing interval to 1, change as needed
    const currency2 = "USD"
    const url2 = `https://test.payken.io/invoice/merchant_id=${merchantId2}&merchant_secret=${merchantSecret2}?display_name=${displayName2}&total=${totalAmount2}&type=${transactionType2}&interval=${billingInterval}&user_id=${user_id2}&currency_code=${currency2}`;
    setPaymentURL2(url2);
  }, []);
  useEffect(() => {


    const merchant_id3 = "21de0f4c91";
    const merchant_secret3 = "c656922abaea68c102f68993";
    const totalAmount3 = 30;
    const transactionType3 = 'recurring';
    const billingInterval3 = 7;
    const displayName3 = "test";
    const orderId3 = Math.floor(Math.random() * 1000);
    const userId3 = "atulblockcoders@gmail.com";
    const URL3 = `https://test.payken.io/invoice/merchant_id=${merchant_id3}&merchant_secret=${merchant_secret3}?display_name=${displayName3}&user_id=${userId3}&total=${totalAmount3}&type=${transactionType3}&interval=${billingInterval3}&order_id=${orderId3}`

    setPaymentURL3(URL3);
  }, []);
  const handleButtonClick = () => {
    // Redirect to the payment URL when the button is clicked
    window.location.href = paymentURL;
  };
  const handleButtonClick2 = () => {
    // Redirect to the payment URL when the button is clicked
    window.location.href = paymentURL2;
  };
  const handleButtonClick3 = () => {
    // Redirect to the payment URL when the button is clicked
    window.location.href = paymentURL3;
  };
  return (
    <div className="container">
      <div className="product-container">
        <div className="products">
          <div className="product-img">
            <img src={product1} alt="first_product" />
            <button
              className="btn btn-primary long"
              onClick={handleButtonClick}
            >
              Price $1
            </button>
          </div>
          <div className="product-img">
            <img src={product2} alt="first_product2" />
            <button
              className="btn btn-primary long"
              onClick={handleButtonClick2}
            >
              Price $1
            </button>
          </div>
          <div className="product-img">
            {" "}
            <img src={product3} alt="first_product3" />
            <button
              className="btn btn-primary long"
              onClick={handleButtonClick3}
            >
              Price $1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentButton;
