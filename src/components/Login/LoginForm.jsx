import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LocalCarWashOutlinedIcon from "@mui/icons-material/LocalCarWashOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ServicesContext } from "../../context/ServicesContext";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const { setUsername } = useContext(ServicesContext);

  useEffect(() => {
    setFocus("Usuario");
  }, [setFocus]);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (formValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://localhost:7184/api/Autenticacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: formValues.Usuario,
          clave: formValues.PasswordString,
        }),
      });

      const dataResponse = await response.json();
      const token = dataResponse?.tokenRol?.token;
      const rolId = dataResponse?.tokenRol?.rolId;

      if (!response.ok || !token) {
        toast.error("Credenciales incorrectas. Por favor, intentalo de nuevo.");
        return;
      }

      setUsername(formValues.Usuario);
      localStorage.setItem("token", token);
      localStorage.setItem("rolId", rolId);
      onLogin(true);
    } catch (error) {
      console.error("Error al comunicarse con la API:", error);
      toast.error("Ocurrio un error al iniciar sesion. Verifica tu conexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login-shell">
      <div className="login-orb login-orb-left" />
      <div className="login-orb login-orb-right" />

      <div className="login-panel">
        <div className="login-brand">
          <div className="login-brand-badge">
            <LocalCarWashOutlinedIcon fontSize="medium" />
          </div>

          <div>
            <span className="login-kicker">Gestion operativa</span>
            <h1 className="login-title">Accede a tu panel de trabajo</h1>
            <p className="login-subtitle">
              Controla clientes, pedidos y operacion diaria desde una sola
              plataforma.
            </p>
          </div>

          <div className="login-feature-list">
            <article className="login-feature-card">
              <ShieldOutlinedIcon />
              <div>
                <strong>Acceso seguro</strong>
                <p>Ingreso protegido con credenciales y roles del sistema.</p>
              </div>
            </article>

            <article className="login-feature-card">
              <BoltOutlinedIcon />
              <div>
                <strong>Flujo rapido</strong>
                <p>Accede en segundos a tus tareas frecuentes del dia.</p>
              </div>
            </article>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-header">
            <span className="login-chip">Inicio de sesion</span>
            <h2>Bienvenido nuevamente</h2>
            <p>Ingresa tus credenciales para continuar.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-field">
              <label htmlFor="Usuario">Correo o usuario</label>
              <TextField
                id="Usuario"
                fullWidth
                placeholder="ejemplo@empresa.com"
                error={Boolean(errors.Usuario)}
                helperText={errors.Usuario?.message || " "}
                disabled={isSubmitting}
                {...register("Usuario", {
                  required: "El usuario es requerido",
                })}
              />
            </div>

            <div className="login-field">
              <label htmlFor="PasswordString">Contrasena</label>
              <TextField
                id="PasswordString"
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contrasena"
                error={Boolean(errors.PasswordString)}
                helperText={errors.PasswordString?.message || " "}
                disabled={isSubmitting}
                {...register("PasswordString", {
                  required: "La contrasena es requerida",
                  minLength: {
                    value: 2,
                    message: "La contrasena debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "La contrasena no puede superar 50 caracteres",
                  },
                })}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "Ocultar contrasena"
                              : "Mostrar contrasena"
                          }
                          onClick={handleTogglePassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            <div className="login-meta">
              <span className="login-status-dot" />
              <span>Sistema listo para autenticacion</span>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ingresando..." : "Ingresar al sistema"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
