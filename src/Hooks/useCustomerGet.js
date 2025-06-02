import { useEffect,useState } from "react";

export function useCustomerGet(isAuthenticated) {
  const [dataCustomer, setDataCustomer] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const tokenRecibido = localStorage.getItem("token");
  
          const response = await fetch(
            "https://localhost:7184/api/PaginaBase/customer",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenRecibido}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          if (!response.ok) {
            throw new Error("Ha ocurrido un error");
          }
  
          const data = await response.json();
          console.log("Esta es la data del Customer bruto:", data);
          const dataCustomerBruto = data.map((item) => ({
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

    return { dataCustomer };
}