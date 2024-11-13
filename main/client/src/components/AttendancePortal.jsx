import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import QrScanner from "./QrScanner";

const AttendancePortal = ({ setNavBar }) => {
  const navigate = useNavigate();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSlot, setIsSlot] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch("/api/finathone/slots");
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setAvailableSlots(data);
        setIsSlot(true);
        setError(null);
      } else {
        setIsSlot(false);
        setError(data.message || "No slots available for today.");
      }
    } catch (err) {
      setIsSlot(false);
      setError("Error fetching slots.");
      console.error(err);
    }
  };

  useEffect(() => {
    setNavBar(false);
    fetchAvailableSlots();
  }, [setNavBar]);

  const handleClose = () => {
    setNavBar(true);
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-white w-full h-full">
        <div className="fixed top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 flex items-center gap-12">
          <button
            onClick={handleClose}
            className="flex gap-2 items-center text-xl bg-themColor-ligthblue text-themColor-blue px-3 py-1 rounded-full hover:gap-3 font-suse font-semibold z-10"
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
            <h1>Slot</h1>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              availableSlots.map((slot) => (
                <p key={slot.slot} className="text-red-500">
                  {slot.slot} ({slot.start} - {slot.end})
                </p>
              ))
            )}
          </div>
          <div className="">
            {isSlot && (
              <div className="items-center text-center">
                <QrScanner slot={availableSlots[0].slot} />
              </div>
            )}
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePortal;
