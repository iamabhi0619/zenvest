import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import QrScanner from "./QrScanner";

const AttendancePortal = ({ setNavBar }) => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [scan, setScan] = useState(false);

  useEffect(() => {
    setNavBar(false);
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = currentDateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const handleClose = () => {
    setNavBar(true);
    navigate(-1);
  };
  const camera = (e) => {
    setScan(e)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mb-14">
      <div className="bg-white w-full h-full">
        <div className="fixed top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 flex items-center gap-12">
          <button
            onClick={handleClose}
            className=" flex gap-2 items-center text-xl bg-themColor-ligthblue text-themColor-blue px-3 py-1 rounded-full hover:gap-3 font-suse font-semibold z-10"
          >
            <FaArrowLeft /> Close
          </button>
          <p className="text-3xl tracking-widest font-suse font-bold">
            ZENVEST
          </p>
        </div>
        <div className="flex flex-col items-center h-full mt-20 gap-2">
          <div>
            <p className="font-outline text-5xl text-themColor-blue font-bold">
              FIN-A-THON
            </p>
          </div>
          <div className="text-xl font-Poppins text-themColor-blue font-bold text-center">
            <p>
              <span className="">Hello,</span>{" "}
              <span className="text-red-500">Abhishek Kumar</span>
            </p>
            <p>
              {formattedDate}
              {", "}
              <span className="text-red-500">{formattedTime}</span>
            </p>
            <p></p>
          </div>
          <div className="flex-grow items-center my-auto text-center m-2">
            <div className="h-80 w-80">
              <QrScanner open={scan} setCamera={camera} />
            </div>
            <div className="mt-20">
              <button
                onClick={() => {
                  setScan(!scan);
                }}
                className="text-center bg-themColor-blue px-3 py-0.5 text-themColor-ligthblue text-xl rounded-xl"
              >
                {!scan ? "Start Marking Attendance" : "Stop Marking Attendance"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePortal;
