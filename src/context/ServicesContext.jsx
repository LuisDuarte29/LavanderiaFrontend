import React from 'react';

import { createContext, useState } from 'react';

export const ServicesContext=createContext();

export function ServicesProvider ({children}){

 
       const [formData, setFormData] = useState({
           AppointmentDate: new Date(),
           Comments  : '',
           Vehicle: 0,
           Employee: 0,
           Services:[]
       });

    return(
        <ServicesContext.Provider value={{formData, setFormData}}>
            {children}
        </ServicesContext.Provider>
    )

}
