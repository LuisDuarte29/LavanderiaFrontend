import { useEffect, useState } from 'react';
import DataTable,{createTheme} from 'react-data-table-component'
import { useContext } from 'react';
import { ServicesContext } from '../../../context/ServicesContext';




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

export function CreatePedidosDetails() {
  const { servicesSelect, setServicesSelect } = useContext(servicescontext);



    const column= [
        {
            name: 'ServiceId',
            selector: row => row.value,
            sortable: true
        }
        ,
        {
            name: 'ServiceName',
            selector: row => row.label,
            sortable: true,
        },

        {
          name:'Acciones',
          cell:row=>(
            <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-sm btn-primary me-1"
          onClick={() =>
          setFormData(prev=> ({...prev, Services:formData.Services.filter(item => item.value !== row.value)}))
        }
            >Eliminar</button>
            </div>
          )
        }


    ]
return (
    
    <div className='card shadow-sm mt-1'>
        <h4 className='mb-2 d-flex justify-content-center'>Lista de Servicios</h4>
        <DataTable
            columns={column}
            data={formData.Services}
            pagination
            highlightOnHover
            striped
            theme="custom"
            noDataComponent={
          <div className="text-center m-2">
            <p>No hay pedidos disponibles</p>
          </div>
        }
          
        />  
        <div>
        <PrecioTotalPedidos/>
        </div>
    </div>

)

}