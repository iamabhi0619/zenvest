import { useState, useEffect } from "react";
import { CheckOut } from "./components/CheckOut";
import EventRegistrationForm from "./components/EventRegistrationForm";

function App() {
  const [data, setData] = useState({});

  const setdata = (e) => {
    setData(e);
  };

  // Set the --vh property for mobile browsers
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div className="flex flex-col max-h-screen items-center bg-[#3e688c] p-3 justify-between min-h-screen app">
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
      <footer className="w-full p-4 text-white text-center text-sm">
        © 2024 ZENVEST. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
