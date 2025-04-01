import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Successful = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-[url(https://res.cloudinary.com/dd4m8j8um/image/upload/q_auto/v1742995649/assets/nzzchdlbr6seb0gd3ior.jpg)] bg-cover text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md text-center"
      >
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Payment Successful!
        </motion.h1>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Thank you for registering for <strong>Trade-A-Rythm</strong>. We look forward to seeing you at the event!
        </motion.p>
        <motion.p
          className="text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Your ticket has been sent to the provided email address. Please check your inbox and spam folder. If you do not receive the ticket, kindly contact us at <strong>+91 6284609196</strong>. For any queries, feel free to reach out.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/event"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Successful;