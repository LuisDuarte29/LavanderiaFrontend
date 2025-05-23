import DataTable, { createTheme } from "react-data-table-component";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate,NavLink} from "react-router-dom";

// 1. Crear el tema personalizado FUERA del componente
createTheme('custom', {
  text: {
    primary: '#2c3e50',
    secondary: '#7f8c8d',
  },
  background: {
    default: '#f8f9fa',
  },
  context: {
    background: '#d6f3ff',
    text: '#2c3e50',
  },
  divider: {
    default: '#e0e0e0',
  },
  action: {
    button: '#3498db',
    hover: '#2980b9',
    disabled: '#bdc3c7',
  },
  highlight: {
    primary: '#e74c3c',
    secondary: '#2ecc71',
  },
});
  useEffect(() => {
    const fechData=async ()=>{


      const tokenRecibido=localStorage.getItem("token");
      console.log(tokenRecibido)
    await fetch('https://localhost:7184/api/Customer', {
        method:"GET",
        headers:{
          "Authorization":`Bearer ${tokenRecibido}`,
          "Content-Type":"application/json"
        }
      }).then(response=>{
          if(!response.ok){
            throw new Error("Ha ocurrido un error")
          }
          return response.json();
      }).then(data=>{
       setData(data)
        console.log("Este es la data del customer: " + data)
      })
      .catch(error=>{
        console.error("Error al obtener los datos:", error)
      })
    }
    if (isAuthenticated){
      fechData();
    }

      

  }, [isAuthenticated]); // Este efecto solo se ejecutará cuando cambie el estado de autenticación

const Lista = ({ }) => {      
  const columnas = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: "Correo",
      selector: row => row.email,
    },
    {
        name:"Acciones",
        cell:row=>(
            <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-sm btn-primary me-1"
              onClick={() => handleVer(row)}
            >
              Ver
            </button>
            <button
              className="btn btn-sm btn-warning me-1"
              onClick={() => handleEditar(row)}
            >Editar</button>
            </div>
        )
    }
  ];
 const navigate=useNavigate()
  const handleEditar=()=>{
     console.log("este es el boton de ver")
  }
  const handleVer=()=>{
    console.log("este es el boton de ver")
    
  }

  return (
    <div className="card shadow-sm p-2 mt-3">
      <h2 className="mb-4">Lista de Clientes</h2>
      <DataTable
        columns={columnas}
        data={data}
        pagination
        highlightOnHover
        striped
        theme="custom"
      />
      <div>
              <button className="col-md-2 btn btn-primary">
      <NavLink className="nav-link" to="/CreateCustomer">Crear Cliente</NavLink>
      </button>
      </div>
    </div>

  );
};

export default Lista;
