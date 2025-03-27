import { useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

export default function TradeARythmLanding() {
  useEffect(() => {
    document.title = "Trade-A-Rithm | ZENVEST";
  }, []);

  return (
    <div className="relative h-screen text-gray-900 bg-cover bg-no-repeat overflow-hidden px-4 md:px-10 flex items-center justify-center bg-[url(https://res.cloudinary.com/dd4m8j8um/image/upload/q_auto/v1742995649/assets/nzzchdlbr6seb0gd3ior.jpg)]">
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center px-4 md:px-0">
        <motion.h1
          className="text-white font-heading text-5xl md:text-8xl font-bold tracking-widest drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Trade-A-Rithm
        </motion.h1>
        <motion.p
          className="text-white text-3xl md:text-4xl font-heading mt-2 tracking-wider drop-shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ZENVEST
        </motion.p>

        <motion.p
          className="mt-4 text-lg md:text-2xl max-w-2xl text-blueWhite text-opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          A hands-on Trading Workshop covering Technical & Fundamental Analysis, Systematic Trading,
          and Python-based Algo Trading.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col md:flex-row items-center gap-4 text-blueWhite text-lg md:text-xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg shadow-md backdrop-blur-md">
            <CalendarDays /> April 10 - 11, 2025
          </p>
          <p className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg shadow-md backdrop-blur-md">
            <IndianRupee /> ₹199 per head
          </p>
        </motion.div>

        <Link
          to="/event/register"
          className="mt-8 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white py-3 px-8 text-lg font-semibold shadow-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
