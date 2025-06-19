// CreateUsuarios.jsx
import React, { useState } from "react";
import Select from "react-select"; // <— aquí
import { useCustomerGet } from "../../Hooks/useCustomerGet";
import { useRolesGet } from "../../Hooks/useRolesGet";

export default function CreateUsuarios({ isAuthenticated }) {
  const [formDataUsuario, setFormDataUsuario] = useState({
    Correo: "",
    Rol: null,
    Customer: null,
  });

  const { dataCustomer } = useCustomerGet(isAuthenticated);
  const { dataRoles } = useRolesGet(isAuthenticated);

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
      {/* …otros campos… */}
    </div>
  );
}
