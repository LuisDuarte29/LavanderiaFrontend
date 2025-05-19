import DataTable, { createTheme } from "react-data-table-component";
import { useEffect, useState } from "react";
import {NavLink,useNavigate} from  'react-router-dom'

// Creamos el tema custom una vez
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

// Componente de fila expandible para ver servicios
const DetallePedido = ({ data }) => {
  return (
    <div className="p-3">
      <h6>Servicios:</h6>
      <ul>
        {data.services && data.services.length > 0 ? (
          data.services.map((servicio) => (
            <li key={servicio.serviceId}>
              {servicio.serviceName} - ${servicio.price} -{" "}
            
            </li>
          ))
        ) : (
          <p>No hay servicios.</p>
        )}
      </ul>
    </div>
  );
};

const ListadoPedidos = ({ isAuthenticated }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ListaPedidos = async () => {
      try {
        const tokenRecibido = localStorage.getItem("token");

        const response = await fetch("https://localhost:7184/api/Pedidos", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenRecibido}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Ha ocurrido un error");
        }

        const data = await response.json();
        setData(data);
        console.log("Esta es la data del customer:", data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    if (isAuthenticated) {
      ListaPedidos();
    }
  }, [isAuthenticated]);

  const columnas = [
    {
      name: "ID",
      selector: (row) => row.appointmentId,
      sortable: true,
    },
    {
      name: "Vehículo",
      selector: (row) => row.vehicle,
      sortable: true,
    },
    {
      name: "Empleado",
      selector: (row) => row.employee,
    },
    {
      name: "Comentarios",
      selector: (row) => row.comments,
    },
       {
        name:"Acciones",
        cell:(row)=>(
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
  const handleEditar=(row)=>{
    navigate("/CreatePedidos/"+row.appointmentId)
  }
  const handleVer=()=>{
    console.log("este es el boton de ver")
    
  }

  return (
    <div className="card shadow-sm p-2 mt-3">
      <h2 className="mb-4">Lista de Pedidos</h2>
      <DataTable
        columns={columnas}
        data={data}
        pagination
        highlightOnHover
        striped
        theme="custom"
        expandableRows
        expandableRowsComponent={DetallePedido}
        
      />
      <button className="col-md-2 btn btn-primary">
      <NavLink className="nav-link" to="/CreatePedidos">Crear Pedido</NavLink>
      </button>
      
    </div>
  );
};

export default ListadoPedidos;
