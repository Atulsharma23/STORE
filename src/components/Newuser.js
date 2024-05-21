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

    const merchantId = "22dbe0e01a";
    const merchantSecret = "18af00cbedd9f6b73c713ef2";
    const totalAmount = 100;
    const transactionType = "purchase";
    const displayName = "test";
    const user_id = "zindermahal@gmail.com";
    const currency = "KGS";
    // Assuming you want to set billing interval to 0, change as needed

    const url = `https://test.payken.io/invoice/merchant_id=${merchantId}&merchant_secret=${merchantSecret}?display_name=${displayName}&total=${totalAmount}&type=${transactionType}&user_id=${user_id}&currency_code=${currency}`;
    setPaymentURL(url);
  }, []);

  useEffect(() => {
    const merchantId2 = "22dbe0e01a";
    const merchantSecret2 = "18af00cbedd9f6b73c713ef2";
    const totalAmount2 = 30;
    const transactionType2 = "recurring";
    const displayName2 = "test";
    const user_id2 = "benten@yopmail.com";
    const billingInterval = 1; // Assuming you want to set billing interval to 1, change as needed
    const currency2 = "KGS	"
    const url2 = `https://test.payken.io/invoice/merchant_id=${merchantId2}&merchant_secret=${merchantSecret2}?display_name=${displayName2}&total=${totalAmount2}&type=${transactionType2}&interval=${billingInterval}&user_id=${user_id2}&currency_code=${currency2}`;
    setPaymentURL2(url2);
  }, []);
  useEffect(() => {
    const merchantId3 = "22dbe0e01a";
    const merchantSecret3 = "18af00cbedd9f6b73c713ef2";
    const totalAmount3 = 10;
    const transactionType3 = "purchase";
    const displayName3 = "Conversion  testing";
    const user_id3 = "benten@yopmail.com";
    const billingInterval = 1; // Assuming you want to set billing interval to 1, change as needed
    const currency3 = "KGS"
    const url3 = `https://test.payken.io/invoice/merchant_id=${merchantId3}&merchant_secret=${merchantSecret3}?display_name=${displayName3}&total=${totalAmount3}&type=${transactionType3}&interval=${billingInterval}&user_id=${user_id3}&currency_code=${currency3}`;
    setPaymentURL3(url3);
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
