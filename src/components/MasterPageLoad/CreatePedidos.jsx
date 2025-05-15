import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import {setDefaultLocale,registerLocale} from 'react-datepicker'
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import {CreatePedidosDetails} from '../PedidosDetails/CreatePedidosDetails.jsx'
import {useNavigate} from 'react-router-dom'

const CreatePedidos = ({isAuthenticated}) => {

  const {id} =useParams();

    const [formData, setFormData] = useState({
        AppointmentDate: new Date(),
        Comments  : '',
        Vehicle: 0,
        Employee: 0,
        Services:[]
    });
    const [dataVehicle, setDataVehicle] = useState([]);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [dataServicio,setDataServicio]=useState([])

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

    const navigate=useNavigate()
      const EnvioData = async () => {
        try {
          console.log("Este es el formData: ", formData);

          const tokenRecibido = localStorage.getItem("token");
          const response = await fetch("https://localhost:7184/api/Appointment", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenRecibido}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              appointmentdate: formData.AppointmentDate,
              comments: formData.Comments,
              vehicle: formData.Vehicle?.value || formData.Vehicle,
              employee: formData.Employee?.value || formData.Employee,
              services: formData.Services.map((service) => ({
                serviceId: service.value,
              })),
            }),
          });

          if (!response.ok) {
            throw new Error("Ha ocurrido un error");
          }

          navigate("/ListaPedidos");
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };
      

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
      
    const handleChange = (e,value) => {
        
        setFormData({ ...formData, Comments: value });
    };

    const handleEmployeeChange = (event, value) => {
        setFormData({ ...formData, Employee: value });
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
            selected={formData.AppointmentDate}
            onChange={(select=> setFormData({...formData,AppointmentDate:select}))} 
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
                <textarea
                    type="text"
                    placeholder="Comentarios"
                    className="bg-white form-control"
                    label="Comments"
                    name="comments"
                    value={formData.Comments}
                    onChange={(e)=>setFormData({...formData,Comments:e.target.value})}
           
                    margin="normal"
                    rows={4}
                />
            </div>
            <div>
            <Select
  className="bg-white mt-2"
  options={dataVehicle}
  value={formData.Vehicle}
  onChange={(selectedOption) => setFormData({ ...formData, Vehicle: selectedOption })}
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
  value={formData.Employee}
  onChange={(selectedOption) => setFormData({ ...formData, Employee: selectedOption })}
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
           
      
            <div className='d-flex justify-content-center mt-2'>
                <button onClick={EnvioData} type="button">Submit</button>
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
  value={formData.Services}
  onChange={(selectedOption) => setFormData({ ...formData, Services: selectedOption })}
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
  <CreatePedidosDetails setSelectServices={(selectOption)=>setFormData({...formData, Services:selectOption})} 
  selectServices={formData.Services}/>
   </div>
   <div>
 

   </div>
      </div>

    );
};

export default CreatePedidos;