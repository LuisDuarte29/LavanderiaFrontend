import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';

const CreatePedidos = ({}) => {
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
        <form onSubmit={handleSubmit}>
            <div>
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
                <TextField
                    select
                    label="Vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    {vehicles.map((vehicle) => (
                        <MenuItem key={vehicle} value={vehicle}>
                            {vehicle}
                        </MenuItem>
                    ))}
                </TextField>
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
    );
};

export default CreatePedidos;