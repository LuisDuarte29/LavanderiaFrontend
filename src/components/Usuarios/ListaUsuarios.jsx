import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

function ListaUsuarios() {
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
      const data = response.json;
    };
  });

  return <div></div>;
}

export default ListaUsuarios;
