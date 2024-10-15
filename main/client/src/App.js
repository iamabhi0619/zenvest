import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserReg from "./components/UserReg";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newreg" element={<UserReg />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;