import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        useEffect(() => {
            const url=new URL('http://localhost:5289/api/GetUsuarios')
            url.searchParams.append('username',username);
            url.searchParams.append('password',password);
            if (isAuthenticated) {
              fetch(url) 
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error("Error fetching data:", error));
            }
          }, [isAuthenticated]); // Este efecto solo se ejecutará cuando cambie el estado de autenticación

        if (username === "admin" && password === "password") {
            onLogin(true); // Cambia el estado de autenticación
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body p-5">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Usuario:</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingrese su usuario"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default LoginForm;
