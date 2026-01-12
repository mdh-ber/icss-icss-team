import { Routes, Route, Link, Navigate } from "react-router-dom";
import RoomsPage from "./pages/Roomspages";

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <nav style={{ marginBottom: 16 }}>
        <Link to="/rooms">Rooms</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/rooms" replace />} />
        <Route path="/rooms" element={<RoomsPage />} />
      </Routes>
    </div>
  );
}
