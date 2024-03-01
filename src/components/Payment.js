import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [formData, setFormData] = useState({
        merchant_id: '',
        merchant_secret: '',
        user_id: '',
        id: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.payken.io/api/v1/auth/paymentData', formData);
            console.log('Payment data:', response.data);
            // Handle the payment data here
        } catch (error) {
            console.error('Error fetching data:', error.message);
            // Handle errors here
        }
    };

    return (
        <div>
            <h1>this is payment page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Merchant ID:
                    <input
                        type="text"
                        name="merchant_id"
                        value={formData.merchant_id}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Merchant Secret:
                    <input
                        type="text"
                        name="merchant_secret"
                        value={formData.merchant_secret}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    User ID:
                    <input
                        type="text"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    ID:
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Payment;
