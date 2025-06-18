import React, { useEffect, useState } from "react";
import {DataTable,createTheme} from "react-data-table-component";

function ListaUsuarios({isAutenticated}) {
  const [dataUsuarios, setDataUsuarios] = useState();
  const URL_GET_USUARIOS = "https://localhost:7184/api/Usuarios/GetUsuarios";
  useEffect(() => {
    const ListaUsuarios = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(URL_GET_USUARIOS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenRecibido}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new error("Este seria un nuevo error");
      }
       setDataUsuarios(response.json);
    };

   ListaUsuarios;
},[isAutenticated]);
createTheme("custom", {
  text: {
    primary: "#2c3e50",
    secondary: "#7f8c8d",
  },
  background: {
    default: "#f8f9fa",
  },
  context: {
    background: "#d6f3ff",
    text: "#2c3e50",
  },
  divider: {
    default: "#e0e0e0",
  },
  action: {
    button: "#3498db",
    hover: "#2980b9",
    disabled: "#bdc3c7",
  },
  highlight: {
    primary: "#e74c3c",
    secondary: "#2ecc71",
  },
});
 const columns=[
  {
    name:"ID",
    selector: (row)=>row.idUsuario,
    sortable: true
  },
    {
    name:"Correo",
    selector: (row)=>row.correo,
    sortable: true
  },
    {
    name:"Rol",
    selector: (row)=>row.rolName,
    sortable: true
  }
,
    {
    name:"Empleado",
    selector: (row)=>row.CustomerName,
    sortable: true
  }
 ]


  return <div>
    <DataTable
    columns={columns}
    data={dataUsuarios}
        pagination
        highlightOnHover
        striped
        theme="custom"/>

  </div>;
}

export default ListaUsuarios;


