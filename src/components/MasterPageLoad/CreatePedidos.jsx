import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import {setDefaultLocale,registerLocale} from 'react-datepicker'
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import {CreatePedidosDetails} from '../PedidosDetails/CreatePedidosDetails.jsx'

const CreatePedidos = ({isAuthenticated}) => {
    const [formData, setFormData] = useState({
        fecha: new Date(),
        comments: '',
        vehicle: '',
        employee: null,
        servicio:[]
    });
    const [dataVehicle, setDataVehicle] = useState([]);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [dataServicio,setDataServicio]=useState([])
    const [selectServices, setSelectServices] = useState([]);

registerLocale('es', es); // Registra el locale español
setDefaultLocale('es'); // Establece el locale por defecto a español
    useEffect(() => {
        const fetchData = async () => {
          try {
            const tokenRecibido = localStorage.getItem("token");
      
            const response = await fetch("https://localhost:7184/api/PaginaBase/vehicle", {
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
      console.log("Esta es la data del vehicle bruto:", data);
            const dataVehicleBruto = data.map(item => ({
              value: item.idVehicle,
              label: item.vehicleName,
            }));
            setDataVehicle(dataVehicleBruto);
      
            console.log("Esta es la data del vehicle:", dataVehicleBruto);
        
      
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };
      
        fetchData();
      }, [isAuthenticated]);



          useEffect(() => {
        const fetchData = async () => {
          try {
            const tokenRecibido = localStorage.getItem("token");
      
            const response = await fetch("https://localhost:7184/api/PaginaBase/customer", {
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
      console.log("Esta es la data del Customer bruto:", data);
            const dataCustomerBruto = data.map(item => ({
              value: item.customerId,
              label: item.nombreCustomer,
            }));
            setDataCustomer(dataCustomerBruto);
      
            console.log("Esta es la data del customer:", dataCustomerBruto);
        
      
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };
      
        fetchData();
      }, [isAuthenticated]);



            useEffect(() => {
        const fetchData = async () => {
          try {
            const tokenRecibido = localStorage.getItem("token");
      
            const response = await fetch("https://localhost:7184/api/PaginaBase/servicios", {
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
      console.log("Esta es la data del Servicio bruto:", data);
            const dataServicioBruto = data.map(item => ({
              value: item.serviceId,
              label: item.serviceName,
              priceItem: item.precio,
            }));
            setDataServicio(dataServicioBruto);
      
            console.log("Esta es la data del servicio:", dataServicioBruto);
        
      
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };
      
        fetchData();
      }, [isAuthenticated]);
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEmployeeChange = (event, value) => {
        setFormData({ ...formData, employee: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };



    return (
      <div className=' mt-5 row'>
        <div className='col-md-7 col-sm-8 col-lg-7'> 
 <div className='d-flex justify-content-center align-content-center mt-2 vw-90'>
 <div className='card col-md-8'>
 <div className=' card-body shadow-lg d-flex justify-content-center'>
<form onSubmit={handleSubmit} className='col-md-11'>
            <div className=''>
            <DatePicker
            selected={formData.fecha}
            onChange={(select=> setFormData({...formData,fecha:select}))} 
            dateFormat="dd-MM-yyyy"
            className='form-control'
                 locale="es"  // Aplica el locale en español
                dropdownMode="select"
                  styles={{
    control: (base) => ({
      ...base,
      border: '2px solid #4a90e2',
      backgroundColor: '#fff' // fondo del control
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#fff', // fondo del menú
      opacity: 1,              // asegura que no sea transparente
      zIndex: 100              // por si se oculta detrás de otros elementos
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#f0f8ff' : '#fff',
      color: '#000'
    })
  }}
            ></DatePicker>
            </div>
            <div className='mt-2'>
                <TextField
                    label="Comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
            </div>
            <div>
            <Select
  className="bg-white"
  options={dataVehicle}
  value={formData.vehicle}
  onChange={(selectedOption) => setFormData({ ...formData, vehicle: selectedOption })}
  placeholder="Elige..."
  isSearchable
  noOptionsMessage={() => "No hay opciones"}
  styles={{
    control: (base) => ({
      ...base,
      border: '2px solid #4a90e2',
      backgroundColor: '#fff' // fondo del control
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#fff', // fondo del menú
      opacity: 1,              // asegura que no sea transparente
      zIndex: 100              // por si se oculta detrás de otros elementos
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#f0f8ff' : '#fff',
      color: '#000'
    })
  }}
/>

            </div>
<div className='mt-2'>
              <Select
  className="bg-white"
  options={dataCustomer}
  value={formData.customer}
  onChange={(selectedOption) => setFormData({ ...formData, customer: selectedOption })}
  placeholder="Elige..."
  isSearchable
  noOptionsMessage={() => "No hay opciones"}
  styles={{
    control: (base) => ({
      ...base,
      border: '2px solid #4a90e2',
      backgroundColor: '#fff' // fondo del control
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#fff', // fondo del menú
      opacity: 1,              // asegura que no sea transparente
      zIndex: 100              // por si se oculta detrás de otros elementos
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#f0f8ff' : '#fff',
      color: '#000'
    })
  }}
/>




</div>
           
      
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>

        </div>
    </div>
        </div>
        </div>
       
    <div className='mt-2 me-2 col-md-4'>
              <Select
  className="bg-white"
  options={dataServicio}
  value={formData.servicio}
  onChange={(selectedOption) => setFormData({ ...formData, servicio: selectedOption })}
  placeholder="Elige..."
  isSearchable
  isMulti
  noOptionsMessage={() => "No hay opciones"}
  styles={{
    control: (base) => ({
      ...base,
      border: '2px solid #4a90e2',
      backgroundColor: '#fff' // fondo del control
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#fff', // fondo del menú
      opacity: 1,              // asegura que no sea transparente
      zIndex: 100              // por si se oculta detrás de otros elementos
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#f0f8ff' : '#fff',
      color: '#000'
    })
  }}
/>
  <CreatePedidosDetails setSelectServices={(selectOption)=>setFormData(...formData, services=selectOption)} 
  selectServices={formData.servicio}/>
   </div>
   <div>
 

   </div>
      </div>

    );
};

export default CreatePedidos;