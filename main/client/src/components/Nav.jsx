import React, { useState } from "react";
import logo from "../assets/Logo.png";
import { TfiAlignLeft, TfiAngleDoubleDown } from "react-icons/tfi";
import { useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-themColor-blue drop-shadow-md">
      <div className="flex justify-between items-center text-black py-2 px-1 md:px-10">
        <a href="/" className="flex items-center hover:scale-105 transition-all">
          <img src={logo} className="h-16 mr-2 rounded-full" alt="logo" />
          <p className="font-bold text-2xl text-themColor-white font-suse">ZENVEST</p>
        </a>
        <ul className="hidden md:flex items-center gap-12 md:gap-6 font-semibold">
          <li
            className={`px-4 py-1 rounded-xl text-lg transition-all hover:cursor-pointer ${
              isActive("/") ? "bg-themColor-ligthblue text-themColor-blue" : "hover:bg-themColor-white hover:text-themColor-blue text-themColor-ligthblue"
            }`}
            onClick={() => handleNavigation("/")}
          >
            Home
          </li>
          <li
            className={`px-4 py-1 rounded-xl text-lg transition-all hover:cursor-pointer ${
              isActive("/service") ? "bg-themColor-ligthblue text-themColor-blue" : "hover:bg-themColor-white hover:text-themColor-blue text-themColor-ligthblue"
            }`}
            onClick={() => handleNavigation("/service")}
          >
            Service
          </li>
          <li
            className={`px-4 py-1 rounded-xl text-lg transition-all hover:cursor-pointer ${
              isActive("/contact") ? "bg-themColor-ligthblue text-themColor-blue" : "hover:bg-themColor-white hover:text-themColor-blue text-themColor-ligthblue"
            }`}
            onClick={() => handleNavigation("/contact")}
          >
            Contact
          </li>
          <li
            className={`px-4 py-1 rounded-xl text-lg transition-all hover:cursor-pointer ${
              isActive("/join") ? "bg-themColor-ligthblue text-themColor-blue" : "hover:bg-themColor-white hover:text-themColor-blue text-themColor-ligthblue"
            }`}
            onClick={() => handleNavigation("/join")}
          >
            Join
          </li>
          
        </ul>
        <div
          className="md:hidden block text-2xl text-themColor-ligthblue cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <TfiAngleDoubleDown /> : <TfiAlignLeft />}
        </div>
      </div>
      <ul
        className={`absolute top-20 left-0 w-full bg-themColor-blue flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${
          isMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <li
          className={`list-none w-full py-2 rounded-3xl text-center hover:cursor-pointer ${
            isActive("/") ? "bg-themColor-ligthblue text-themColor-blue" : "hover:bg-themColor-white hover:text-themColor-blue text-themColor-ligthblue"
          }`}
          onClick={() => handleNavigation("/")}
        >
          Home
        </li>
        <li
          className={`list-none w-full py-2 rounded-3xl text-center hover:cursor-pointer ${
            isActive("/service") ? "bg-themColor-ligthblue text-themColor-blue" : "hover:bg-themColor-white hover:text-themColor-blue text-themColor-ligthblue"
          }`}
          onClick={() => handleNavigation("/service")}
        >
          Service
        </li>
        <li
          className={`list-none w-full py-2 rounded-3xl text-center hover:cursor-pointer ${
            isActive("/contact") ? "bg-themColor-ligthblue text-themColor-blue" : "hover:bg-themColor-white hover:text-themColor-blue text-themColor-ligthblue"
          }`}
          onClick={() => handleNavigation("/contact")}
        >
          Contact
        </li>
        <li
          className={`list-none w-full py-2 rounded-3xl text-center hover:cursor-pointer ${
            isActive("/join") ? "bg-themColor-ligthblue text-themColor-blue" : "hover:bg-themColor-white hover:text-themColor-blue text-themColor-ligthblue"
          }`}
          onClick={() => handleNavigation("/join")}
        >
          Join
        </li>
        
      </ul>
    </header>
  );
}

export default Nav;
