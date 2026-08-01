// React Router
import { Outlet } from "react-router";
// utils
import { AuthProvider } from "./utils/AuthContext";
// Styles
import "./App.css";

// Main
function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
