import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LoginForm = ({ onLogin }) => {
    const [Usuario, setUsername] = useState("");
    const [PasswordString, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5289/api/GetUsuarios', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Usuario, PasswordString }),
            });

            if (response.ok) {
            
            
                alert("Inicio de sesión exitoso");
                onLogin(true); // Notifica al componente padre que la autenticación fue exitosa
            } else if (response.status === 400) {
                alert("Credenciales incorrectas");
            } else {
                alert("Error al iniciar sesión. Inténtalo nuevamente.");
            }
        } catch (error) {
            console.error("Error al comunicarse con la API:", error);
            alert("Ocurrió un error. Verifica tu conexión e inténtalo de nuevo.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body p-5">
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Usuario" className="form-label">Usuario:</label>
                            <input
                                type="text"
                                id="Usuario"
                                className="form-control"
                                value={Usuario}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingrese su usuario"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="PasswordString" className="form-label">Contraseña:</label>
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
                        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
