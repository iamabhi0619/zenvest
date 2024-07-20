import Home from "./components/Home";
import UserReg from "./components/UserReg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newreg" element={<UserReg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
