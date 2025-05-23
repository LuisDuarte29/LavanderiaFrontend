import React from 'react';

import { createContext, useState,useEffect } from 'react';

export const ServicesContext=createContext();

export function ServicesProvider ({children}){

 const [precio,setPrecio]=useState(0)
       const [formData, setFormData] = useState({
           AppointmentDate: new Date(),
           Comments  : '',
           Vehicle: 0,
           Employee: 0,
           Services:[]
       });
       const [formDataCustomer, setFormDataCustomer] = useState({
           FirstName: '',
           LastName: '',
           Email: '',
           Phone: '',
            Address: '',
       });
useEffect(()=>{  
  setPrecio(formData.Services.reduce((acc,item)=>acc+ parseInt(item.priceItem),0))
},[formData.Services])

    return(
        <ServicesContext.Provider value={{formData, setFormData,precio,setPrecio, formDataCustomer, setFormDataCustomer}}>
            {children}
        </ServicesContext.Provider>
    )

}
