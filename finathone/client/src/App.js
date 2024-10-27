import { useState } from "react";
import { CheckOut } from "./components/CheckOut";
import EventRegistrationForm from "./components/EventRegistrationForm";

function App() {
  const [data, setData] = useState({});
  const setdata = (e) => {
    setData(e);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#3e688c] p-3">
      <header className="w-full text-white text-center font-semibold text-xl flex flex-col items-center justify-center">
        <p className="text-5xl font-outline font-bold md:tracking-widest outline-1 outline-white">
          FIN-A-THON
        </p>
      </header>
      <main className="flex-grow w-full flex items-center justify-center h-[calc(100vh-80px)]">
        {/* Adjust the height calculation if needed */}
        {Object.keys(data).length === 0 ? (
          <EventRegistrationForm submit={setdata} />
        ) : (
          <CheckOut data={data} />
        )}
      </main>
      <footer className="w-full p-4 bg-[#3e688c] text-white text-center text-sm">
        © 2024 ZENVEST. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
