import React from "react";
import { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../context/ServicesContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
         toast.success("✅ Elemento creado con éxito!");

      setFormDataCustomer({
              FirstName: '',
           LastName: '',
           Email: '',
           Phone: '',
            Address: ''
      })
        setTimeout(() => {
        navigate("/ListaCustomer");
      }, 500);
    } catch (error) {
      toast.error("Error al obtener los datos:", error);
    }
  };

  return (
    <div className="container mt-3">
  <div className="row justify-content-center">
    <div className="col-lg-7 col-md-8 col-sm-10">
      <div className="card">
        <div className="card-body">
          <form>
            {/* Nombre */}
            <div className="mb-3 row align-items-center">
              <label htmlFor="firstName" className="col-sm-3 col-form-label">
                Nombre
              </label>
              <div className="col-sm-9">
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
            </div>

            {/* Apellido */}
            <div className="mb-3 row align-items-center">
              <label htmlFor="lastName" className="col-sm-3 col-form-label">
                Apellido
              </label>
              <div className="col-sm-9">
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
            </div>

            {/* Correo */}
            <div className="mb-3 row align-items-center">
              <label htmlFor="email" className="col-sm-3 col-form-label">
                Correo
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
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
            </div>

            {/* Teléfono */}
            <div className="mb-3 row align-items-center">
              <label htmlFor="phone" className="col-sm-3 col-form-label">
                Teléfono
              </label>
              <div className="col-sm-9">
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
            </div>

            {/* Dirección */}
            <div className="mb-3 row align-items-center">
              <label htmlFor="address" className="col-sm-3 col-form-label">
                Dirección
              </label>
              <div className="col-sm-9">
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
            </div>

            {/* Botón */}
            <div className="text-end">
              <button
                type="button"
                onClick={EnvioDatos}
                className="btn btn-primary"
              >
                Crear Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default CreateCustomer;
