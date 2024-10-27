import React, { useState } from "react";
import PaymentConf from "./PaymentConf";
import axios from "axios";

export const CheckOut = ({ data }) => {
  const [payment, setPayment] = useState(false);
  const [payStatus, setPayStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:5000/api/payment",
        data
      );
      const { id: orderId } = response.data;

      const options = {
        key: "rzp_test_03LXELXxAaFSja",
        amount: response.data.amount,
        currency: response.data.currency,
        name: "ZENVEST",
        description: "Finathon",
        order_id: orderId,
        handler: function (response) {
          console.log("Payment successful:", response);
          setPayment(!payment);
          setPayStatus(true);
        },
        prefill: {
          name: "ZENVEST",
          email: "official@zenvest.live",
          contact: "9999999999",
        },
        theme: {
          color: "#005246",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      setPayment(!payment);
      setPayStatus(false);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center bg-white items-center my-auto rounded-3xl w-full max-w-lg md:max-w-md">
      {!payment ? (
        <div className="font-normal p-8 flex flex-col gap-5">
          <div className="flex items-center w-full justify-center">
            <img src={data.dp} alt="" className="rounded-full h-24" />
            <p className="text-3xl text-center">{data.name}</p>
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
            disabled={loading}
          >
            {!loading ? "Confirm & pay 99/-" : "Loading....!"}
          </button>
        </div>
      ) : (
        <PaymentConf status={payStatus} />
      )}
    </div>
  );
};
