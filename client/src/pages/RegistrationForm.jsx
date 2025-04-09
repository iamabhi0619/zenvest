import { useEffect } from "react";
import { motion } from "framer-motion";

export default function RegistrationForm() {
  useEffect(() => {
    document.title = "Registration Closed | Trade-A-Rithm";
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-[url('https://res.cloudinary.com/dd4m8j8um/image/upload/v1742995648/assets/p0fsklxltgmjxj27vvcl.jpg')] bg-cover bg-center relative px-4 sm:px-32">
      {/* Soft overlay for vignette and contrast */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-red/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/20 w-full max-w-xl text-center text-white"
      >
        <h2 className="mb-6 sm:mb-8 font-heading text-5xl sm:text-6xl font-bold text-blue-100 tracking-wide drop-shadow-md">
          Trade-A-Rithm
        </h2>

        <p className="text-xl sm:text-2xl text-gray-200 mb-4 font-medium">
          Thank you for your interest!
        </p>

        <p className="text-lg sm:text-xl text-gray-300 mb-6">
          Registrations are now{" "}
          <span className="text-red-400 font-semibold">officially closed</span>.
        </p>

        <p className="text-sm sm:text-base text-gray-400">
          For further assistance, feel free to reach out at <br />
          <span className="text-gray-300 underline underline-offset-4 font-semibold">+91 6284609196</span>
        </p>
      </motion.div>
    </div>
  );
}
