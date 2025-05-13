import { useEffect, useState } from 'react';
import DataTable,{createTheme} from 'react-data-table-component'


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

export function CreatePedidosDetails({ setSelectServices, selectServices }) {
const [precio,setPrecio]=useState(0)
useEffect(()=>{  
  setPrecio(selectServices.reduce((acc,item)=>acc+ parseInt(item.priceItem),0))
},[selectServices])

 
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
            name: 'Price',
            selector: row => row.priceItem,
            sortable: true,
        }


    ]
return (
    
    <div className='card shadow-sm mt-1'>
        <h4 className='mb-2 d-flex justify-content-center'>Lista de Servicios</h4>
        <DataTable
            columns={column}
            data={selectServices}
            pagination
            highlightOnHover
            striped
            theme="custom"
            
          
        />  
        <div>
            <h4 className='mt-1 d-flex justify-content-end align-content-end p-2'>Total:{precio}</h4>
        </div>
    </div>

)

}