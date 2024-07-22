import Home from "./components/Home";
import Interview from "./components/Interview";
import NewReg from "./components/NewReg";
import UserDetails from "./components/UserDetails";
import UserReg from "./components/UserReg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newreg" element={<UserReg />} />
        <Route path="/vnewreg" element={<NewReg />} />
        <Route path="/user" element={<UserDetails />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
