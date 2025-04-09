import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TradeARythmLanding from "./pages/TradeARythmLanding";
import RegistrationForm from "./pages/RegistrationForm";
import TermsAndConditions from "./pages/TermsAndConditions";
import Successful from "./pages/Successful";
import TicketCheck from "./pages/TicketCheck";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect all users to /tradeRythm */}
        <Route path="/" element={<Navigate to="/event" replace />} />
        <Route path="/event" element={<TradeARythmLanding />} />
        <Route path="/event/register" element={<RegistrationForm />} />
        <Route path="/t&c" element={<TermsAndConditions />} />
        <Route path="/success" element={<Successful />} />
        <Route path="/ticket" element={<TicketCheck />} />
      </Routes>
    </Router>
  );
}

export default App;
