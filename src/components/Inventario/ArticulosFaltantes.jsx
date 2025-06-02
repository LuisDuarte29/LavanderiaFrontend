import { set } from 'date-fns';
import React from 'react'
import { useState,useEffect } from 'react';
import DataTable,{createTheme} from 'react-data-table-component'
import  Select  from 'react-select';
import { Counter } from '../../Utils/Counter';


function ArticulosFaltantes() {
    
    const [articulos, setArticulos] = useState([]); 
    const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
    console.log("Estos son los articulos seleccionados:", articulosSeleccionados);
    const FECH_API_ARTICULOS="https://localhost:7184/api/Service/Articulos";
    useEffect(()=>{
        const tokenRecibido = localStorage.getItem("token");
           const fetchArticulos=async()=>{
            try {
                const response=await fetch(FECH_API_ARTICULOS,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    Authorization:`Bearer ${tokenRecibido}`
                    }
                })
                if (!response.ok){
                    throw new Error("Error al obtener los articulos")
                }
                const data =await response.json();

                const dataArticulosSelect=data.map(item=>({
                    value:item.idArticulo,
                    label:item.nombreArticulo,
                    precio:item.precio
                }));
                setArticulos(dataArticulosSelect);
                console.log("Estos son los articulos todos:", data);
            }catch (error) {
                console.error("Error al obtener los artículos:", error);
            }
           } 
if (tokenRecibido) {
    fetchArticulos();
}

    },[])


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
            name: 'IdArticulo',
            selector:row=>row.value,
            sortable:true
        },
        {
            name:'NombreArticulo',
            selector:row=>row.label,
            sortable:true
        }
        ,
      {
      name:'Cantidad',
      cell:row=>(
        <Counter />
      ), 
      },
        {
            name:'PrecioTotal',
            selector:row=>row.precio,
            sortable:true
        },
          {
          name:'Acciones',
          cell:row=>(
            <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-sm btn-primary me-1"
          onClick={() =>
        setArticulos(articulosSeleccionados.filter(articulo=>articulo.value!==row.value))
        }
            >Eliminar</button>
            </div>
          )
        }

    ]

  return (
      <div className='card shadow-sm mt-1'>
        <h4 className='mb-2 d-flex justify-content-center'>Lista de Servicios</h4>
        <Select
          className="bg-white"
          options={articulos}
          value={articulosSeleccionados}
          onChange={(selectedOption) =>
            setArticulosSeleccionados( selectedOption )
          }
        
          placeholder="Elige..."
          isSearchable
          isMulti
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

            <DataTable
            columns={columns}
            data={articulosSeleccionados}
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

    </div>
  )
}

export default ArticulosFaltantes
