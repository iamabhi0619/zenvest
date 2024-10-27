import React from "react";
import axios from 'axios';

export const CheckOut = ({data}) => {

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
        }
    };

  return (
    <div className="flex justify-center bg-white items-center my-auto h-full rounded-3xl min-w-lg">
      <div className="font-normal p-8 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <img
            src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&hairColor=Black&facialHairType=BeardLight&clotheType=BlazerShirt&clotheColor=Gray01&accessoriesType=Glasses&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light&seed=12303842"
            alt=""
            className="rounded-full h-24"
          />
          <div>
            <p className="text-3xl text-center">{data.name}</p>
          </div>
        </div>
        <div className="gap-2">
          <div className="flex items-center justify-center gap-2">
            <p>Registration Number: </p>
            <p className="text-center text-xl">{data.regNumber}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>WhatsApp Number: </p>
            <p className="text-center text-xl">{data.whatsapp}</p>
          </div>
          <div className="flex items-center flex-col justify-center">
            <p>Email Address: </p>
            <p className="text-center text-xl">{data.email}</p>
          </div>
        </div>
        <button
          onClick={initiatePayment}
          className="w-full py-3 mt-4 bg-blue hover:bg-green text-white font-semibold rounded-lg shadow-md transition duration-200"
        >
          Confirm & pay 99/-
        </button>
      </div>
    </div>
  );
};
