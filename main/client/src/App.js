import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import FinTable from "./components/FinTable";
import UserReg from "./components/UserReg";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-gradient-to-r from-blue-400 to-emerald-400">
        <Nav className="fixed top-0 left-0 w-full z-50" />
        <div className="flex-grow h-full pt-24 mx-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/join" element={<UserReg />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/finathone1.0" element={<FinTable />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
