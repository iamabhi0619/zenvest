import React, { useState } from "react";
import axios from "axios";

import { FaRegIdCard } from "react-icons/fa6";

function Cirtificate({ submit }) {
  const [regNumber, setRegNumber] = useState();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !regNumber
    ) {
      alert("Please fill all fields.");
      return;
    }
    const response = await axios.get(
        `api/finathone/${regNumber}`
      );
    if(response.data.status == "error"){
        setMessage(response.data.message)
    }else{
        submit(response.data)
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full my-auto bg-white max-w-lg md:max-w-md p-6 rounded-3xl shadow-lg font-normal h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full"
        
      >
        <h1 className="text-2xl font-semibold text-center text-blue mb-6 w-full">
          Get Your Certificate
        </h1>
        <div className="relative items-center justify-center flex">
          <FaRegIdCard className="absolute left-3 text-[#3e688c] text-xl" />
          <input
            type="text"
            name="regNumber"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            placeholder="Registration Number"
            className={`pl-10 w-full py-3 rounded-lg border border-gray-300 ${
              regNumber === "" ? "outline-red-600" : "outline-green"
            }`}
            required
            aria-label="Registration Number"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-[#3e688c] hover:bg-[#5ba66e] text-white font-semibold rounded-lg shadow-md transition duration-200"
        >
          Next
        </button>
        <p className="text-red-700 text-xl mt-6 text-center">
        {message}
        </p>
      </form>
    </div>
  );
}

export default Cirtificate;