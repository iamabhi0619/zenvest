import React, { useState } from "react";
import QRScanner from "../components/QRScanner";
import { motion } from "framer-motion";
import axios from "axios";

function TicketCheck() {
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for API fetch
  const [userData, setUserData] = useState(null); // Store user data on success

  const handleScanSuccess = async (data) => {
    try {
      setLoading(true); // Start loading

      const payload = JSON.parse(data); // Parse the scanned QR code data
      const { regNumber } = payload;

      if (regNumber) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/event/verify?regNumber=${regNumber}` //TODO change to production URL
        );

        const { success, message, user } = response.data;

        if (success) {
          setStatus("success");
          setMessage(message);
          setUserData(user); // Store user data for the profile card
        } else {
          setStatus("error");
          setMessage(message);
        }
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(error.response?.data?.message || "An error occurred while validating the ticket.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const resetStatus = () => {
    setStatus(null);
    setMessage("");
  };

  const handleButtonClick = () => {
    if (status === "success" || status === "error") {
      resetStatus(); // Reset to allow scanning another ticket
    } else if (status === null && !loading) {
      console.log("Start scanning or waiting for QR code...");
    }
  };

  return (
    <div className="min-h-screen bg-green text-white flex flex-col items-center justify-between pb-20">
      <div className="flex items-center justify-center mb-4 w-full px-4">
        <img
          src="https://res.cloudinary.com/dd4m8j8um/image/upload/v1743147410/atpkrbfjeij0pvmf9dly.png"
          alt="Logo"
          className="w-30 h-30 rounded-b-full mr-2"
        />

        <motion.h1
          className="text-3xl sm:text-5xl font-extrabold mb-8 font-heading tracking-widest"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Trade-A-Rythm
        </motion.h1>
      </div>

      {status === null && !loading && (
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <QRScanner onScanSuccess={handleScanSuccess} scanInterval={100} />
          <p className="text-center text-blueWhite mt-4">
            Align the QR code within the frame to scan.
          </p>
        </motion.div>
      )}

      {loading && (
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blueWhite mt-4">Validating ticket...</p>
        </motion.div>
      )}

      {status === "success" && userData && (
        <motion.div
          className="bg-blueWhite text-green p-6 rounded-lg shadow-lg text-center w-full max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
          <p className="mb-2">{userData.email}</p>
          <p className="mb-2">Phone: {userData.number}</p>
          <p className="mb-2">Reg. Number: {userData.regNumber}</p>
          <p className="mb-2">Course: {userData.course}</p>
          <p className="mb-2">Year: {userData.year}</p>
          <p className="text-green-400 font-semibold mt-4">
            Payment Status: {userData.payment.status}
          </p>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          className="bg-red text-white p-6 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-2">Error!</h2>
          <p>{message}</p>
        </motion.div>
      )}

      {/* Dynamic Button */}
      <motion.button
        className={`mt-4 px-6 py-3 rounded-lg font-semibold text-lg ${
          loading
            ? "bg-gray-500 text-white cursor-not-allowed"
            : status === "success"
            ? "bg-green-500 text-white hover:bg-green-400"
            : status === "error"
            ? "bg-red-500 text-white hover:bg-red-400"
            : "bg-blue-500 text-white hover:bg-blue-400"
        }`}
        whileHover={!loading ? { scale: 1.1 } : {}}
        whileTap={!loading ? { scale: 0.9 } : {}}
        onClick={handleButtonClick}
        disabled={loading}
      >
        {loading
          ? "Validating..."
          : status === "success"
          ? "Scan Another Ticket"
          : status === "error"
          ? "Retry Scanning"
          : "Start Scanning"}
      </motion.button>
    </div>
  );
}

export default TicketCheck;
