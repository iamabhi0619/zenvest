import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mars, Venus } from "lucide-react";
import { useRegistrationForm } from "../utility/useRegistrationForm";

export default function RegistrationForm() {
  const { formData, loading, error, handleChange, handleSubmit } = useRegistrationForm();
  useEffect(() => {
    document.title = "Register | Trade-A-Rithm";
  }, []);

  return (
    <div className="h-screen flex items-start justify-between bg-[url(https://res.cloudinary.com/dd4m8j8um/image/upload/v1742995648/assets/p0fsklxltgmjxj27vvcl.jpg)] bg-cover text-white px-4 sm:px-32 overflow-y-hidden w-full flex items-center justify-center flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-slate-950/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20 w-full"
      >
        <h2 className="mb-6 sm:mb-8 font-heading text-blueWhite text-5xl tracking-wider">
          Trade-A-Rythm
        </h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center mb-4 bg-red-500/10 p-2 rounded-lg"
          >
            {error}
          </motion.p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 md:space-y-4 gap-2"
        >
          {/* Name */}
          <div className="space-y-0.5">
            <label className="block text-sm font-medium text-gray-200">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-white outline-1"
              placeholder="Enter your full name"
            />
          </div>
          {/* Registration Number */}
          <div className="space-y-0.5">
            <label className="block text-sm font-medium text-gray-200">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-white outline-1"
              placeholder="Enter your registration number"
            />
          </div>

          {/* WhatsApp Number */}
          <div className="space-y-0.5">
            <label className="block text-sm font-medium text-gray-200">WhatsApp Number</label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-white outline-1"
              placeholder="Enter your WhatsApp number"
            />
          </div>

          {/* Email */}
          <div className="space-y-0.5">
            <label className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-white outline-1"
              placeholder="Enter your email"
            />
          </div>

          {/* Gender Selection */}
          <div className="space-y-0.5">
            <label className="block text-sm font-medium text-gray-200">Gender</label>
            <div className="flex gap-4 ">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 peer-checked:bg-blue-600 peer-checked:border-blue-500 transition-all duration-200 group-hover:border-blue-400">
                  <Mars className="w-5 h-5 text-gray-300 peer-checked:text-white" />
                  <span className="text-sm text-gray-300 peer-checked:text-white">Male</span>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 peer-checked:bg-pink-600 peer-checked:border-pink-500 transition-all duration-200 group-hover:border-pink-400">
                  <Venus className="w-5 h-5 text-gray-300 peer-checked:text-white" />
                  <span className="text-sm text-gray-300 peer-checked:text-white">Female</span>
                </div>
              </label>
            </div>
          </div>

          {/* Course */}
          <div className="space-y-0.5">
            <label className="block text-sm font-medium text-gray-200">Current Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="" disabled className="bg-gray-800">
                Select your course
              </option>
              <option value="Computer Science" className="bg-gray-800">
                Computer Science
              </option>
              <option value="Mechanical Engineering" className="bg-gray-800">
                Mechanical Engineering
              </option>
              <option value="Electrical Engineering" className="bg-gray-800">
                Electrical Engineering
              </option>
              <option value="Civil Engineering" className="bg-gray-800">
                Civil Engineering
              </option>
              <option value="Business Administration" className="bg-gray-800">
                Business Administration
              </option>
              <option value="Other" className="bg-gray-800">
                Other
              </option>
            </select>
          </div>

          {/* Year */}
          <div className="space-y-0.5">
            <label className="block text-sm font-medium text-gray-200">Year of Study</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="" disabled className="bg-gray-800">
                Select your year
              </option>
              <option value={1} className="bg-gray-800">
                1st Year
              </option>
              <option value={2} className="bg-gray-800">
                2nd Year
              </option>
              <option value={3} className="bg-gray-800">
                3rd Year
              </option>
              <option value={4} className="bg-gray-800">
                4th Year
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-red/90 hover:bg-red cursor-pointer text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed md:col-span-2"
          >
            {loading ? "Registering..." : "Pay ₹199"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
