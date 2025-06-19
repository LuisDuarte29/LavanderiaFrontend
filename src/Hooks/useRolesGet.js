// useRolesGet.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function useRolesGet(isAuthenticated) {
  const [dataRoles, setDataRoles] = useState([]);
  const URL = "https://localhost:7184/api/Usuarios/GetRoles";

  useEffect(() => {
    const fetchRoles = async () => {
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
        const roles = json.map((i) => ({
          value: i.roleId,
          label: i.roleName,
        }));
        setDataRoles(roles);
        console.log("estos serian los roles: " + json);
      } catch (e) {
        toast.error(e.message);
      }
    };
fetchRoles(); 
  }, [isAuthenticated]);

  return { dataRoles };
}
