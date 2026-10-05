import { Routes, Route } from "react-router-dom";

import AdminLogin from "./AdminLogin";
import Admin from "./Admin";
import PatientHome from "./PatientHome";

function App() {
  return (
    <Routes>
      {/* Patient Website */}
      <Route
        path="/"
        element={<PatientHome />}
      />

      {/* Admin Login */}
      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={<Admin />}
      />
    </Routes>
  );
}

export default App;