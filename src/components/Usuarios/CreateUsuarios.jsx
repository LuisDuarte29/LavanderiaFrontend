import { formControlClasses } from '@mui/material'
import React, { useState } from 'react'

function CreateUsuarios() {
    const [formDataUsuario, setFormDataUsuario]= useState({
        Correo:"",
        Rol:0,
        Customer:0
    })


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
                Correo
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
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

               <div>
                  <Select
                    className="bg-white mt-2"
                    options={dataRol}
                    value={formDataUsuario.Rol}
                    onChange={(selectedOption) =>
                      setFormDataUsuario({ ...formDataUsuario, Rol: selectedOption })
                    }
                    placeholder="Elige..."
                    isSearchable
                    noOptionsMessage={() => "No hay opciones"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: "2px solid #4a90e2",
                        backgroundColor: "#fff", // fondo del control
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#fff", // fondo del menú
                        opacity: 1, // asegura que no sea transparente
                        zIndex: 100, // por si se oculta detrás de otros elementos
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#f0f8ff" : "#fff",
                        color: "#000",
                      }),
                    }}
                  />
                </div>

            {/* Correo */}
               <div>
                  <Select
                    className="bg-white mt-2"
                    options={dataCustomer}
                    value={formDataUsuario.Customer}
                    onChange={(selectedOption) =>
                      setFormDataUsuario({ ...formDataUsuario, Customer: selectedOption })
                    }
                    placeholder="Elige..."
                    isSearchable
                    noOptionsMessage={() => "No hay opciones"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: "2px solid #4a90e2",
                        backgroundColor: "#fff", // fondo del control
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#fff", // fondo del menú
                        opacity: 1, // asegura que no sea transparente
                        zIndex: 100, // por si se oculta detrás de otros elementos
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#f0f8ff" : "#fff",
                        color: "#000",
                      }),
                    }}
                  />
                </div>
        
            <div className="text-end">
              <button
                type="button"
                onClick={EnvioDatos}
                className="btn btn-primary"
              >
                Crear Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

