// useRolesGet.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function useComponentsFormGet(isAuthenticated) {
  const [dataComponents, setDataComponents] = useState([]);
  const URL = "https://localhost:7184/api/Usuarios/GetComponentsForms";

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Error al cargar roles");
        const json = await res.json();
        const components = json.map((i) => ({
          value: i.componentsId,
          label: i.componentsName,
        }));
        setDataComponents(components);
        console.log("estos serian los roles: " + json);
      } catch (e) {
        toast.error(e.message);
      }
    };
    fetchComponents();
  }, [isAuthenticated]);

  return { dataComponents };
}
