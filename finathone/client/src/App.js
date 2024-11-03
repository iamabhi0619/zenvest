import { useState } from "react";
import { CheckOut } from "./components/CheckOut";
import EventRegistrationForm from "./components/EventRegistrationForm";

function App() {
  const [data, setData] = useState({});
  const setdata = (e) => {
    setData(e);
  };

  return (
    <>
      <header className="w-full text-white text-center font-semibold text-xl flex flex-col items-center justify-center h-[10vh]">
        <p className="text-5xl font-outline font-bold md:tracking-widest outline-1 outline-white">
          FIN-A-THON
        </p>
      </header>
      <main className="w-full flex items-center justify-center h-[80vh] overflow-auto">
        {Object.keys(data).length === 0 ? (
          <EventRegistrationForm submit={setdata} />
        ) : (
          <CheckOut data={data} />
        )}
      </main>
      <footer className="w-full p-4 text-white text-center text-sm h-[10vh]">
        © 2024 ZENVEST. All rights reserved.
      </footer>
    </>
  );
}

export default App;
