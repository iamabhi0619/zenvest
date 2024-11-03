import { useEffect, useState } from "react";
import { CheckOut } from "./components/CheckOut";
import EventRegistrationForm from "./components/EventRegistrationForm";

function App() {
  const [data, setData] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);

  const enableFullScreen = async () => {
    if (document.documentElement.requestFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullScreen(true);
      } catch (error) {
        console.warn("Failed to enter fullscreen:", error);
      }
    } else {
      console.warn("Fullscreen API is not supported on this browser.");
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const setdata = (e) => {
    setData(e);
  };

  return (
    <div className="flex flex-col h-screen items-center bg-[#3e688c] p-3">
      <header className="w-full text-white text-center font-semibold text-xl flex flex-col items-center justify-center">
        <p className="text-5xl font-outline font-bold md:tracking-widest outline-1 outline-white">
          FIN-A-THON
        </p>
      </header>

      <main className="flex-grow w-full flex items-center justify-center">
        {Object.keys(data).length === 0 ? (
          <EventRegistrationForm submit={setdata} />
        ) : (
          <CheckOut data={data} />
        )}
      </main>

      <footer className="w-full p-4 bg-[#3e688c] text-white text-center text-sm">
        © 2024 ZENVEST. All rights reserved.
      </footer>

      {/* Fullscreen Button */}
      {!isFullScreen && (
        <button
          onClick={enableFullScreen}
          className="absolute bottom-5 right-5 bg-blue-500 text-white p-2 rounded"
        >
          Enter Fullscreen
        </button>
      )}
      {isFullScreen && (
        <button
          onClick={exitFullScreen}
          className="absolute bottom-5 right-5 bg-red-500 text-white p-2 rounded"
        >
          Exit Fullscreen
        </button>
      )}
    </div>
  );
}

export default App;
