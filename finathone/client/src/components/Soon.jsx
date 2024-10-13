import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelopeOpen, FaEnvelopeOpenText, FaLinkedinIn, FaPhone } from "react-icons/fa6";

function Soon() {
  return (
    <div>
      <div className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-center px-5">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>

        <div className="z-50 flex flex-col justify-center text-white w-full h-screen items-center">
            <img src="/logo.png" alt="" className="w-24 rounded-full p-0.5 border-white border" />
          <span className="font-bold text-4xl">ZENVEST</span>
          <h1 className="text-5xl">
            We are <b>Almost</b> there!
          </h1>
          <p>Stay tuned for something amazing!!!</p>
          <div className="max-w-sm mt-4 flex flex-col gap-2">
            <p className="w-sm flex items-center justify-center gap-2">
              <span>
                <FaPhone size={20} />
              </span>
              <a className="text-xl" href="tel:+919915575999">
                +91 99155 75999
              </a>
            </p>
            <p className="w-sm flex items-center justify-center gap-2">
              <span>
                <FaEnvelopeOpenText size={20} />
              </span>
              <a href="mailto:official@zenvest.live" className="text-xl">
                ZENVEST
              </a>
            </p>
          </div>

          <div className="mt-6 flex text-white mx-auto gap-2 text-xl items-center">
            <a href="https://www.instagram.com/zenvest_lpu/" className="p-2 rounded-full bg-white">
              <FaInstagram className="text-gray-900 font-bold"/>
            </a>
            <a href="https://www.linkedin.com/company/zenvest-lpu/" className="p-2 rounded-full bg-white">
              <FaLinkedinIn className="text-gray-900 font-bold"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Soon;
