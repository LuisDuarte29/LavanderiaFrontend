import React, { createContext, useState, useEffect, useMemo } from "react";

export const ServicesContext = createContext();

export function ServicesProvider({ children }) {
  const [precio, setPrecio] = useState(0);
  const [counts, setCounts] = useState({}); // Ahora es un objeto vacío
    const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    AppointmentDate: new Date(),
    Comments: "",
    Vehicle: 0,
    Employee: 0,
    Services: [],
  });
  const [formDataCustomer, setFormDataCustomer] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Address: "",
  });


  // Calcula el precio total a partir de formData.Services
  const totalPrecio = useMemo(() => {
    return formData.Services.reduce(
      (acc, item) => acc + parseInt(item.priceItem, 10),
      0
    );
  }, [formData.Services]);

  // Función para actualizar la cantidad de un artículo específico
  const setCountFor = (id, newCount) => {
    setCounts((prev) => ({
      ...prev,
      [id]: newCount,
    }));
  };

  useEffect(() => {
    setPrecio(totalPrecio);
  }, [totalPrecio]);

  return (
    <ServicesContext.Provider
      value={{
        formData,
        setFormData,
        precio,
        setPrecio,
        formDataCustomer,
        setFormDataCustomer,
        counts,
        setCountFor,
        show,
        setShow
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}
