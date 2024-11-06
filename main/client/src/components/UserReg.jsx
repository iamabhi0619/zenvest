import React, { useState } from "react";
import { FaMars, FaVenus } from "react-icons/fa";
function UserReg() {
  const form = {
    id: "",
    name: "",
    email: "",
    dateofbirth: "",
    gender: "",
    number: "",
    course: "1st Year",
    courseYear: "",
    interest: "",
    work: "",
  };
  const [formData, setFormData] = useState(form);
  const [apiWork, setApiWork] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiWork(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.status === "ok") {
        window.alert(`Thanks for Registering..!!\nCheck Your mail for updates`);
        setFormData(form);
      } else {
        window.alert("Please Enter the correct data..!!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      window.alert("Sorry, the server is not responding..!!");
    } finally {
      setApiWork(false);
    }
  };
  return (
    <div
      className="flex items-center justify-center p-5 text-white"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #051937, #002440, #002e3a, #003427, #05390d)",
      }}
    >
      <section className="bg- w-full p-5 rounded-lg h-full md:flex md:gap-4 justify-between font-Poppins tracking-wide">
        <div className="flex flex-row items-center md:w-3/6 md:flex-col my-auto md:gap-8 border-b pb-2 md:border-0 md:pb-0 gap-2">
          <div className="">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/Designer%20(7).png?alt=media&token=1902f931-1d5f-4319-8a94-1348094d756f"
              alt=""
              className="w-20 h-20 md:w-40 md:h-40 p-0.5 border border-white rounded-full shadow shadow-white sm:w-24 sm:h-24"
            />
          </div>
          <div className="md:pl-0">
            <header className="text-xl sm:text-3xl pb-2 font-semibold text-center">
              Registration Form
            </header>
            <header className="text-md sm:text-xl text-center">
              Welcome to Team Zenvest
            </header>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-3 w-full text-xl md:flex md:flex-col md:gap-2"
        >
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-5 mb-2">
            <div className="w-full">
              <label className="block ">Registration Number</label>
              <input
                type="number"
                value={formData.id}
                placeholder="Enter Your Registration Number"
                name="id"
                onChange={handleChange}
                required
                className="w-full py-2 px-4 mt-2 border border-white rounded-lg bg-transparent text-white placeholder:text-sm focus:outline-white"
              />
            </div>

            <div className="w-full">
              <label className="block">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                required
                className="w-full py-2 px-4 mt-2 border border-white rounded-lg bg-transparent text-white placeholder:text-sm focus:outline-white"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-5 mb-2">
            <div className="w-full">
              <label className="block">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                required
                className="w-full py-2 px-4 mt-2 border border-white rounded-lg bg-transparent text-white placeholder:text-sm focus:outline-white"
              />
            </div>
            <div className="w-full">
              <label className="block">Phone Number</label>
              <input
                type="number"
                value={formData.number}
                onChange={handleChange}
                name="number"
                placeholder="Enter phone number"
                required
                className="w-full py-2 px-4 mt-2 border border-white rounded-lg bg-transparent text-white placeholder:text-sm focus:outline-white"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-5 mb-2">
            <div className="md:w-3/6 flex md:flex-col items-center gap-2 md:gap-0 ">
              <h3 className="md:text-center items-center">Gender</h3>
              <div className="flex gap-14 mt-6 md:justify-between items-center my-auto">
                <label className="flex items-center cursor-pointer md:gap-40">
                  <input
                    type="radio"
                    value="Male"
                    onChange={handleChange}
                    name="gender"
                    className="peer h-4 w-4 cursor-pointer opacity-0"
                  />
                  <FaMars
                    className="absolute text-xl peer-checked:text-white peer-checked:bg-[#2986cc] bg-white p-2 rounded-full text-[#2986cc]"
                    size={45}
                  />
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    id="check-female"
                    onChange={handleChange}
                    name="gender"
                    value="Female"
                    className="peer h-4 w-4 cursor-pointer opacity-0"
                  />
                  <FaVenus
                    className="absolute text-xl peer-checked:text-white peer-checked:bg-[#c90076] bg-white p-2 rounded-full text-[#c90076]"
                    size={45}
                  />
                </label>
              </div>
            </div>
            <div className="w-full">
              <label className="block">Interest</label>
              <select
                onChange={handleChange}
                name="interest"
                required
                className="w-full py-2 px-4 mt-2 border border-white rounded-lg bg-transparent text-white placeholder:text-sm focus:outline-white focus:text-white focus:bg-slate-600"
              >
                <option hidden>Your Field Of Interest</option>
                <option value="Graphic Design And Video Editing">
                  Graphic Design And Video Editing
                </option>
                <option value="Social Media and Content Creation">
                  Social Media and Content Creation
                </option>
                <option value="Technical Team">Technical Team</option>
                <option value="Event Management and Marketing">
                  Event Management and Marketing
                </option>
                <option value="Public Speaking">Public Speaking</option>
                <option value="Fine Arts">Fine Arts</option>
                <option value="Photography">Photography</option>
                <option value="Fund Management">Fund Management</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-5 mb-2">
            <div className="w-full">
              <label className="block">Courses</label>
              <select
                onChange={handleChange}
                name="course"
                required
                className="w-full py-2 px-4 mt-2 border border-white rounded-lg bg-transparent text-white placeholder:text-sm focus:outline-white focus:text-white focus:bg-slate-600"
              >
                <option disabled selected hidden className="text-sm" value="">
                  Select your Course
                </option>
                <option value="B.Tech">B.Tech</option>
                <option value="BBA">BBA</option>
                <option value="MBA">MBA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                <option value="BioTech">BioTech</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block">Course Year</label>
              <select
                onChange={handleChange}
                name="courseYear"
                required
                className="w-full py-2 px-4 mt-2 border border-white rounded-lg bg-transparent text-white placeholder:text-sm focus:outline-white focus:text-white focus:bg-slate-600"
              >
                <option hidden>Course Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>
          <button
            disabled={apiWork}
            type="submit"
            className="py-2 text-black font-semibold mt-2 w-full rounded-lg cursor-pointer bg-white hover:bg-gray-300"
          >
            {!apiWork ? "Submit" : "Submitting..."}
          </button>
        </form>
      </section>
    </div>
  );
}
export default UserReg;
