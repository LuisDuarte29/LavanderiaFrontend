import React from "react";
import { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../context/ServicesContext";
import { useNavigate } from "react-router-dom";

function CreateCustomer() {
  const { formDataCustomer, setFormDataCustomer } = useContext(ServicesContext);
const navigate = useNavigate();
  const EnvioDatos = async () => {
    const tokenRecibido = localStorage.getItem("token");
    const url = "https://localhost:7184/api/Customer";
    try {
        const bodyCustomer = {
          FirstName : formDataCustomer.FirstName,
          LastName : formDataCustomer.LastName,
          Email : formDataCustomer.Email,
          Phone : formDataCustomer.Phone,
          Address : formDataCustomer.Address
            }
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${tokenRecibido}`,
          "Content-Type": "application/json",
        },
    
        body: JSON.stringify(bodyCustomer),
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Error al crear el cliente");
      }
      const data = response.json();
      navigate("/ListaCustomer");
      console.log(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  return (
    <div>
      <form action="">
        <div className="">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={formDataCustomer.FirstName}
            onChange={(e) =>
              setFormDataCustomer({
                ...formDataCustomer,
                FirstName: e.target.value,
              })
            }
          />
        </div>
        <div className="">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={formDataCustomer.LastName}
            onChange={(e) =>
              setFormDataCustomer({
                ...formDataCustomer,
                LastName: e.target.value,
              })
            }
          />
        </div>
        <div className="">
          <label htmlFor="email">Correo</label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={formDataCustomer.Email}
            onChange={(e) =>
              setFormDataCustomer({
                ...formDataCustomer,
                Email: e.target.value,
              })
            }
          />
        </div>
        <div className="">
          <label htmlFor="phone">Telefono</label>
          <input
            type="text"
            id="phone"
            className="form-control"
            value={formDataCustomer.Phone}
            onChange={(e) =>
              setFormDataCustomer({
                ...formDataCustomer,
                Phone: e.target.value,
              })
            }
          />
        </div>
        <div className="">
          <label htmlFor="address">Direccion</label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={formDataCustomer.Address}
            onChange={(e) =>
              setFormDataCustomer({
                ...formDataCustomer,
                Address: e.target.value,
              })
            }
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            onClick={EnvioDatos}
            className="btn btn-primary mt-2"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCustomer;
