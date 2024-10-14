import React, { useState } from "react";
import axios from "axios";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full flex flex-col md:flex-row bg-white shadow-md rounded-lg p-6 gap-6">
          <div className="flex-1 flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex space-x-4 mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    checked={formData.gender === "male"}
                    required
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Male</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                    checked={formData.gender === "female"}
                    required
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Female</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    onChange={handleChange}
                    checked={formData.gender === "other"}
                    required
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Other</label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Course</option>
                <option value="computer science">Computer Science</option>
                <option value="information technology">
                  Information Technology
                </option>
                <option value="business administration">
                  Business Administration
                </option>
                <option value="engineering">Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course Year
              </label>
              <select
                name="courseYear"
                value={formData.courseYear}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Pay
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
