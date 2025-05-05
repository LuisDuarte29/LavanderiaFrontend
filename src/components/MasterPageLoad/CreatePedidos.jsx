import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from 'react-select'

const CreatePedidos = ({isAuthenticated}) => {
    const [formData, setFormData] = useState({
        input: '',
        comments: '',
        vehicle: '',
        employee: null,
    });

    const vehicles = ['Car', 'Truck', 'Bike'];
    const employees = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
    ];
    const options = employees.map(emp => ({
        value: emp.id,
        label: emp.name
      }));

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
        <div className='d-flex justify-content-center align-content-center mt-2 vw-100'>
 <div className='card col-md-6 '>
 <div className=' card-body shadow-lg d-flex justify-content-center'>
<form onSubmit={handleSubmit} className='col-md-8'>
            <div className=''>
                <TextField
                    label="Input"
                    name="input"
                    value={formData.input}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
            </div>
            <div>
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
  options={options}
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
                <Autocomplete
                    options={employees}
                    getOptionLabel={(option) => option.name}
                    value={formData.employee}
                    onChange={handleEmployeeChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Employee" margin="normal" fullWidth />
                    )}
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>

        </div>
    </div>
        </div>
   
       
        
    );
};

export default CreatePedidos;