import React, { useState } from "react";
import axios from "axios";
import FinathonHeading from "./FinathonHeading";
import { FaIdCard, FaUser } from "react-icons/fa6";
const RegistrationForm = () => {
  const fdata = {
    name: "",
    registrationNumber: "",
    email: "",
    number: "",
    gender: "",
    course: "",
    courseYear: "",
  };
  const [formData, setFormData] = useState(fdata);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/payment", formData);
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
          alert("payment Done");
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
    }
    setFormData(fdata);
  };
  return (
    <div className="flex items-center my-auto justify-center flex-col h-full dark:bg-blue-lightDark rounded-xl shadow-lg bg-blue-light">
      <div>
        <FinathonHeading />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-2xl text-blue-dark dark:text-white font-normal">
          <div className="flex items-center justify-start gap-2">
            <FaUser size={30} className="dark:text-blue-300 text-blue-950"/>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full bg-white bg-opacity-20 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 dark:focus:ring-blue-300 focus:ring-blue-950 placeholder:text-gray-800"
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FaIdCard size={30} className="dark:text-red-300 text-red-950"/>
            <div>
              <input
                type="text"
                name="registrationNumber"
                placeholder="Registration Numar"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
                className="mt-1 w-full bg-white bg-opacity-20 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 dark:focus:ring-red-300 focus:ring-blue-950 placeholder:text-gray-800"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
