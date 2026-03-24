import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./app/routes/AppRoutes";
import CambioClave from "./components/Login/CambioClave";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn);
  };

  return (
    <Router>
      <div className="container-fluid min-vh-100 min-vw-100 d-flex flex-column">
        <CambioClave />
        <AppRoutes
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          handleLogin={handleLogin}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </Router>
  );
}

export default App;
