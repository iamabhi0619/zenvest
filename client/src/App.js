import Home from "./components/Home";
import NewReg from "./components/NewReg";
import RegTable from "./components/RegTable";
import UserDetails from "./components/UserDetails";
import UserReg from "./components/UserReg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newreg" element={<UserReg />} />
        <Route path="/notifi" element={<NewReg />} />
        <Route path="/user121" element={<UserDetails />} />
        <Route path="/regtable" element={<RegTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;