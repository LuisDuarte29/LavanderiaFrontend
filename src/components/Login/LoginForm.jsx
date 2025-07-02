import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ServicesContext } from "../../context/ServicesContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const LoginForm = ({ onLogin }) => {
  const { Usuario, setUsername } = useContext(ServicesContext);
  const [PasswordString, setPassword] = useState("");

  const usuarioRef = useRef(null);
  useEffect(() => {
    //Current apunta al elemento actual del ref
    usuarioRef.current.focus();
  }, []);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7184/api/Autenticacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: Usuario, clave: PasswordString }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const token = data.tokenRol.token;
          const rolId = data.tokenRol.rolId;
          console.log("La data recibida:", data);
          console.log("Token recibido:", token);
          if (!token) {
            toast.error(
              "Credenciales incorrectas. Por favor, inténtalo de nuevo."
            );
            return;
          }
          localStorage.setItem("token", token);
          localStorage.setItem("rolId", rolId);
          onLogin(true);
        });
    } catch (error) {
      console.error("Error al comunicarse con la API:", error);
      alert("Ocurrió un error. Verifica tu conexión e inténtalo de nuevo.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0">Iniciar Sesión</h2>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Usuario" className="form-label">
                Usuario
              </label>
              <input
                ref={usuarioRef}
                type="text"
                id="Usuario"
                className="form-control"
                value={Usuario}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingrese su usuario"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="PasswordString" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="PasswordString"
                className="form-control"
                value={PasswordString}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 btn-lg">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
