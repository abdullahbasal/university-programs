import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./pages/error/Error";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
