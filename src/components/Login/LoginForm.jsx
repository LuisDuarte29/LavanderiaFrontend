import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ServicesContext } from "../../context/ServicesContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
const LoginForm = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const {setUsername} = useContext(ServicesContext);
  useEffect(() => {
    setFocus("Usuario");
  }, [setFocus]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://localhost:7184/api/Autenticacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: data.Usuario,
          clave: data.PasswordString,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((dataResponse) => {
          setUsername(data.Usuario);
          const token = dataResponse.tokenRol.token;
          const rolId = dataResponse.tokenRol.rolId;
          console.log("La data recibida:", dataResponse);
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
      console.log("este es el usuario:",data.Usuario);
      console.log("este es el password:",data.PasswordString);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="Usuario" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                id="Usuario"
                className="form-control"
                {...register("Usuario", { required: true })}
                placeholder="Ingrese su usuario"
              />
              {errors.Usuario && (
                <span className="text-danger">El usuario es requerido</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="PasswordString" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="PasswordString"
                className="form-control"
                {...register("PasswordString", {
                  required: "El valor es requerido",
                  minLength: {
                    value: 2,
                    message: "El valor debe ser mayor a dos",
                  },
                  maxLength: {
                    value: 7,
                    message: "El valor debe ser menor a cincuenta",
                  }
                })}
                placeholder="Ingrese su contraseña"
              />
              {errors.PasswordString && (
                <span className="text-danger">{errors.PasswordString.message}</span>
              )}
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
