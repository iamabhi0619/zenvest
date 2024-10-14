import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [amount] = useState(100);
    const data = {name:"Abhishek Kumar"}
    const [responseMessage, setResponseMessage] = useState('');

    const initiatePayment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/payment', data);
            const { id: orderId } = response.data;
            const options = {
                key: 'rzp_test_03LXELXxAaFSja',
                amount: response.data.amount,
                currency: response.data.currency,
                name: 'ZENVEST',
                description: 'Finathon',
                order_id: orderId,
                handler: function (response) {
                    console.log('Payment successful:', response);
                    // axios.get(`https://finathon.zenvest.live/api/payment/details/${orderId}`);
                    // console.log(paymentDetailsResponse.data);
                },
                prefill: {
                    name: 'ZENVEST',
                    email: 'official@zenvest.live',
                    contact: '9999999999'
                },
                theme: {
                    color: '#005246'
                },
                // callback_url: `http://localhost:5000/api/payment/details/${orderId}`,
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Error initiating payment:', error);
            setResponseMessage('Payment initiation failed. Please try again.');
        }
    };

    return (
        <div className="payment-container">
            <h2>Initiate Payment</h2>
            <p>Amount: ₹{amount}</p>
            <button onClick={initiatePayment}>Pay Now</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default Payment;
