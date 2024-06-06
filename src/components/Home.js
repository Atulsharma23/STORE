import React, { useState, useEffect } from 'react';

const ApiIntegration = () => {
  const [paymentURL, setPaymentURL] = useState("");
  const [paymentURL2, setPaymentURL2] = useState("");

  useEffect(() => {

    const url = "http://beta.payken.io/hosted-payment/merchant_id=21de0f4c91&merchant_secret=2a865287964647abc59edaa8";
    setPaymentURL(url);
  }, []);
  useEffect(() => {

    const url2 = "http://beta.payken.io/hosted-payment/merchant_id=22dbe0e01a&merchant_secret=d674e430f6d7afd428731550";
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
    <div className='container'>
      <div className="flex-box">
        <h1>Hosted Payment Links</h1>
        <div className="product-box">
          <button
            className="btn btn-primary long"
            onClick={handleButtonClick}
          >
            Payment Link without Fee
          </button>
          <button
            className="btn btn-primary long"
            onClick={handleButtonClick2}
          >
            Payment Link with fee
          </button>
        </div>

      </div>
    </div>
  );
}

export default ApiIntegration;
