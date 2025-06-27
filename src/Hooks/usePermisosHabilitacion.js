// useRolesGet.js
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ServicesContext } from "../context/ServicesContext";

export function usePermisosHabilitacion(isAuthenticated, componentsFormSelect, roleId) {
  const {habilitacionPermisos, setHabilitacionPermisos} = useContext(ServicesContext);
  const URL = `https://localhost:7184/api/Usuarios/GetListPermisos/${roleId}/${componentsFormSelect}`;

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
        console.log("Permisos obtenidos: ", json);
        json.forEach((permiso) => {
            switch (permiso.permisoId) {
                case 1:
                    setHabilitacionPermisos((prev) => ({ ...prev, Crear: true }));
                    break;
                case 2:
                    setHabilitacionPermisos((prev) => ({ ...prev, Leer: true }));
                    break;
                case 3:
                    setHabilitacionPermisos((prev) => ({ ...prev, Actualizar: true }));
                    break;
                case 4:
                    setHabilitacionPermisos((prev) => ({ ...prev, Eliminar: true }));
                    break;
                default:
                    console.warn(`Permiso desconocido: ${permiso.permisoId}`);
            }
        });
    
      console.log("Permisos habilitados: ", habilitacionPermisos);
      } catch (e) {
        toast.error(e.message);
      }
    };
fetchPermisos(); 
  }, [isAuthenticated]);

  return { habilitacionPermisos };
}
