import React, { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { ServicesContext } from "../../context/ServicesContext";
import { usePermisosGet } from "../../Hooks/usePermisosGet";
import { DatatableRolePermiso } from "./DatatableRolePermiso";
import { toast } from "react-toastify";

function AsignarPermisosRoles({ isAuthenticated }) {
  const { rolId } = useParams();
  const { dataPermisos } = usePermisosGet(isAuthenticated);
  const { rolesSelect, setRolesSelect } = useContext(ServicesContext);
  useEffect(() => {
    console.log("Este es el rolId:", rolId);

    // Si no hay rol seleccionado, vacía el array y sal del efecto
    if (!rolId) {
      setRolesSelect([]);
      return;
    }

    const tokenRecibido = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7184/api/Usuarios/GetListPermisos/${rolId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenRecibido}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // Si el servidor responde con un estado de error
          const errorText = await response.text();
          toast.error("Error al obtener los permisos del rol");
          setRolesSelect([]);
          return;
        }

        // ¡No olvides el await aquí!
        const data = await response.json();

        const ApiPermiso = data.map((item) => item.permisoId);

        const roleOption = dataPermisos.filter((item) =>
          ApiPermiso.includes(item.value)
        );

        if (roleOption) {
          // Guarda un array plano con el objeto encontrado
          setRolesSelect(roleOption);
        } else {
          // Si no encuentra coincidencia, vacía
          setRolesSelect([]);
        }
      } catch (error) {
        setRolesSelect([]);
      }
    };

    fetchData();
  }, [rolId]);

  return (
    <div className="mt-5 mb-3">
      <div className="mt-5 me-2 col-md-4">
        <div className="mt-5 mb-3">
          <Select
            className="bg-white"
            options={dataPermisos}
            value={rolesSelect.selectedOption}
            onChange={(selectedOption) => setRolesSelect(selectedOption)}
            placeholder="Elige..."
            isSearchable
            isMulti
            noOptionsMessage={() => "No hay opciones"}
            styles={{
              control: (base) => ({
                ...base,
                border: "2px solid #4a90e2",
                backgroundColor: "#fff", // fondo del control
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#fff", // fondo del menú
                opacity: 1, // asegura que no sea transparente
                zIndex: 100, // por si se oculta detrás de otros elementos
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#f0f8ff" : "#fff",
                color: "#000",
              }),
            }}
          />
        </div>
      </div>
      <DatatableRolePermiso />
    </div>
  );
}

export default AsignarPermisosRoles;
