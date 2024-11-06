import React, { useState } from "react";
import { FaEnvelope, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Form submitted successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Error submitting the form. Please try again.");
      }
    } catch (error) {
      setStatus("There was a problem submitting the form.");
      console.error("Submission error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col md:flex-row items-start mx-auto font-suse bg-themColor-ligthblue p-6 rounded-xl">
        <div className="flex flex-col items-start md:space-y-8">
          <h1 className="text-themColor-blue text-4xl font-extrabold">Let's Talk</h1>
          <p className="text-sm text-themColor-blue max-w-lg">
            Have some big idea or brand to develop and need help? Then reach out
            — we'd love to hear about your project and provide help.
          </p>
          <div>
            <h2 className="text-gray-800 text-lg font-semibold">Email</h2>
            <ul className="md:mt-4">
              <li className="flex items-center">
                <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                  <FaEnvelope size={20} className="text-themColor-blue" />
                </div>
                <a href="mailto:official@zenvest.live" className="text-themColor-blue text-sm ml-4">
                  <small className="block">Mail</small>
                  <strong>official@zenvest.live</strong>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex md:block items-center gap-2 my-2">
            <h2 className="text-themColor-blue text-lg font-semibold">Socials</h2>
            <ul className="flex md:mt-4 space-x-4">
              <li className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                <a href="https://www.linkedin.com/company/zenvest-lpu/"><FaLinkedinIn size={20} /></a>
              </li>
              <li className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                <a href="https://www.instagram.com/zenvest_lpu/"><FaInstagram size={20} /></a>
              </li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-1/2 gap-1 md:gap-4 items-center">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-4 bg-transparent border border-gray-900 text-themColor-blue text-sm outline-none focus:ring-2 focus:ring-themColor-blue"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-4 bg-transparent border border-gray-900 text-themColor-blue text-sm outline-none focus:ring-2 focus:ring-themColor-blue"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-4 bg-transparent border border-gray-900 text-themColor-blue text-sm outline-none focus:ring-2 focus:ring-themColor-blue"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-4 bg-transparent border border-gray-900 text-themColor-blue text-sm outline-none focus:ring-2 focus:ring-themColor-blue"
          />
          <button
            type="submit"
            className="text-white bg-themColor-blue hover:bg-themColor-green tracking-wide rounded-md text-xl px-4 py-2 w-full"
          >
            Send
          </button>
          {status && <p className="mt-4 text-center text-sm text-themColor-blue">{status}</p>}
        </form>
      </div>
    </div>
  );
}

export default Contact;
