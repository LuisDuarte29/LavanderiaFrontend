import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Define el estado de autenticación

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar las credenciales
        if (username === "admin" && password === "password") {
            setIsAuthenticated(true); // Cambia el estado de autenticación
            onLogin(true); // Notifica al componente padre
        } else {
            alert("Credenciales incorrectas");
        }
    };

    // Efecto para manejar autenticación y llamada a la API
    React.useEffect(() => {
        if (isAuthenticated) {
            const url = new URL('http://localhost:5289/api/GetUsuarios');
            url.searchParams.append('username', username);
            url.searchParams.append('password', password);

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("Datos obtenidos:", data);
                    // Maneja los datos aquí
                })
                .catch(error => console.error("Error fetching data:", error));
        }
    }, [isAuthenticated, username, password]); // Dependencias del efecto

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
