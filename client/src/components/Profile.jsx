import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa"; // Correct Instagram icon
import { FaGithub } from "react-icons/fa";

function Profile({ data }) {
  return (
    <div className="relative min-w-[300px] h-[400px] mx-2 overflow-hidden shadow-[0_30px_30px_-20px_rgba(0,0,0,1),_inset_0_0_0_1000px_rgba(67,52,109,0.6)] rounded-[15px] flex flex-col justify-center items-center group">
      <div className="w-full h-full">
        <img
          src={data.image}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-9 w-full flex flex-col justify-center items-center transition-all duration-500 ease-in-out group-hover:opacity-0 opacity-100">
        <h3 className="text-white text-2xl font-medium text-center uppercase tracking-wider mb-2 transition-transform duration-500">
          {data.name}
          <br />
          <span className="text-xl font-light not-italic">{data.post}</span>
        </h3>
      </div>
      <div className="absolute bottom-0 w-full h-[160px] flex flex-col justify-center items-center bg-opacity-60 bg-black rounded-b-[15px] transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 group-hover:bottom-0">
        <h3 className="text-white text-2xl font-medium text-center uppercase tracking-wider mb-2 transition-transform duration-500 group-hover:translate-y-0 translate-y-10 opacity-0 group-hover:opacity-100">
          {data.name}
          <br />
          <span className="text-xl font-light not-italic">{data.post}</span>
        </h3>
        <ul className="flex transition-opacity duration-500 opacity-0 group-hover:opacity-100">
          <li className="list-none mx-2 transition-transform transform translate-y-10 group-hover:translate-y-0">
            <a
              href={data.socialLinks[0]}
              aria-label="LinkedIn"
              className="text-white text-[24px] transition-colors duration-300 hover:text-blue-500"
            >
              <BsLinkedin />
            </a>
          </li>
          <li className="list-none mx-2 transition-transform transform translate-y-10 group-hover:translate-y-0">
            <a
              href={data.socialLinks[1]}
              aria-label="Instagram"
              className="text-white text-[24px] transition-colors duration-300 hover:text-pink-500"
            >
              <FaInstagram />
            </a>
          </li>
          <li className="list-none mx-2 transition-transform transform translate-y-10 group-hover:translate-y-0">
            <a
              href={data.socialLinks[2]}
              aria-label="GitHub"
              className="text-white text-[24px] transition-colors duration-300 hover:text-gray-900"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
