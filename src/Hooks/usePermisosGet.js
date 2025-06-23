// useRolesGet.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function usePermisosGet(isAuthenticated) {
  const [dataPermisos, setDataPermisos] = useState([]);
  const URL = "https://localhost:7184/api/Usuarios/GetPermisosList";

  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Error al cargar Permisos");
        const json = await res.json(); 
        const permisos = json.map((i) => ({
          value: i.permisoId,
          label: i.permisoName,
        }));
        setDataPermisos(permisos);
        console.log("estos serian los Permisos: " + json);
      } catch (e) {
        toast.error(e.message);
      }
    };
fetchPermisos(); 
  }, [isAuthenticated]);

  return { dataPermisos };
}
