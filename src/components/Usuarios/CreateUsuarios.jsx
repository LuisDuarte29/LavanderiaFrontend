// CreateUsuarios.jsx
import React, { useState } from "react";
import Select from "react-select"; // <— aquí
import { useCustomerGet } from "../../Hooks/useCustomerGet";
import { useRolesGet } from "../../Hooks/useRolesGet";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateUsuarios({ isAuthenticated }) {
  const [formDataUsuario, setFormDataUsuario] = useState({
    Correo: "",
    Rol: null,
    Customer: null,
  });

  const { dataCustomer } = useCustomerGet(isAuthenticated);
  const { dataRoles } = useRolesGet(isAuthenticated);
  const navigate = useNavigate();
  const CreateUsuario = async () => {
    const tokenRecibido = localStorage.getItem("token");
    const url = "https://localhost:7184/api/Usuarios/CreateUsuario";
    try {
      const createUsuario = {
        CustomerID: formDataUsuario.Customer?.value, // Asegúrate de enviar el ID
        RoleId: formDataUsuario.Rol?.value, // Asegúrate de enviar el ID del rol
        correo: formDataUsuario.Correo,
      };

      console.log("bodyUsuario →", createUsuario);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenRecibido}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(createUsuario),
      });
      if (!response.ok) {
        throw new Error("Error al crear el usuario");
      }
      toast.success("Usuario creado exitosamente");
      setFormDataUsuario({
        Correo: "",
        Rol: null,
        Customer: null,
      });
      setTimeout(() => {
        navigate("/ListaUsuarios"); // Asegúrate de importar useNavigate desde react-router-dom
      }, 500);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert("Error al crear el usuario: " + error.message);
    }
  };

  console.log("dataRoles →", dataRoles, Array.isArray(dataRoles));
  console.log("dataCust →", dataCustomer, Array.isArray(dataCustomer));

  return (
    <div className="container mt-5 w-50 mx-auto bg-white bg-opacity-100 p-4 rounded">
      <h5>Datos del Usuario</h5>
      <div className="mb-3 mt-5 row align-items-center">
        <label htmlFor="correo" className="col-sm-3 col-form-label">
          Correo
        </label>
        <div className="col-sm-9">
          <input
            type="email"
            id="correo"
            className="form-control"
            value={formDataUsuario.Correo}
            onChange={(e) =>
              setFormDataUsuario({
                ...formDataUsuario,
                Correo: e.target.value,
              })
            }
          />
        </div>
      </div>
      {/* Rol */}
      <div className="mb-3 row align-items-center">
        <label htmlFor="rolSelect" className="col-sm-3 col-form-label">
          Rol
        </label>
        <div className="col-sm-9">
          <Select
            id="rolSelect"
            options={dataRoles}
            value={formDataUsuario.Rol}
            onChange={(Rol) => setFormDataUsuario((prev) => ({ ...prev, Rol }))}
            placeholder="Elige rol…"
            isSearchable
            isClearable
          />
        </div>
      </div>
      {/* Customer */}
      <div className="mb-3 row align-items-center">
        <label htmlFor="customerSelect" className="col-sm-3 col-form-label">
          Cliente
        </label>
        <div className="col-sm-9">
          <Select
            id="customerSelect"
            options={dataCustomer}
            value={formDataUsuario.Customer}
            onChange={(Customer) =>
              setFormDataUsuario((prev) => ({ ...prev, Customer }))
            }
            placeholder="Elige cliente…"
            isSearchable
            isClearable
          />
        </div>
      </div>
      <div className="text-end">
        <button
          type="button"
          onClick={CreateUsuario}
          className="btn btn-primary"
        >
          Crear Cliente
        </button>
      </div>
    </div>
  );
}
