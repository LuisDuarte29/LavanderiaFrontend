import DataTable, { createTheme } from "react-data-table-component";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";

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

const Lista = ({ data }) => {      
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
    navigate("/CreatePedidos/"+row.id)
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
    </div>
  );
};

export default Lista;
