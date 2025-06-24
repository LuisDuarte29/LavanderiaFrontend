import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { ServicesContext } from "../../context/ServicesContext";
import { usePermisosGet } from "../../Hooks/usePermisosGet";
import { DatatableRolePermiso } from "./DatatableRolePermiso";
import { toast } from "react-toastify";

function AsignarPermisosRoles({ isAuthenticated }) {
  const { rolId, rolName } = useParams();
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
          toast.error(errorText);
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
        console.log("Permisos del rol:", roleOption);

        if (roleOption) {
          // Guarda un array plano con el objeto encontrado
          setRolesSelect(roleOption);
        } else {
          setRolesSelect([]);
        }
      } catch (error) {
        setRolesSelect([]);
      }
    };

    fetchData();
  }, [rolId, dataPermisos]);

  const GuardarDatosPermisos = async () => {
    console.log("funciona el boton GuardarDatosPermisos");
    const tokenRecibido = localStorage.getItem("token");
    const url = `https://localhost:7184/api/Usuarios/CreatePermisosRole`;
    try {
      const bodyPermisos = {
        RoleId: parseInt(rolId),
        PermisosId: rolesSelect.map((permiso) => permiso.value), // Asegúrate de enviar un array de IDs
      };
      console.log("bodyPermisos →", bodyPermisos);
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${tokenRecibido}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPermisos),
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Error al asignar los permisos al rol");
      }
      toast.success("✅ Permisos asignados con éxito!");
    } catch (error) {
      toast.error("Error al asignar los permisos:", error);
    }
  };

  return (
    <div className="mt-5 mb-3 d-flex justify-content-center flex-column align-items-center">
      <div className="mt-5 me-2 col-md-4 ">
        <div className="mb-3">
          <label className="form-label fs-4 text-center">
            Asignar permisos al rol: <strong>{rolName}</strong>
          </label>
        </div>
        <div>
          <Select
            className="bg-white"
            options={dataPermisos}
            value={rolesSelect}
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

      <div className="">
        <DatatableRolePermiso />
      </div>
      <div>
        <button
          className="btn btn-primary mt-3 mb-3"
          onClick={GuardarDatosPermisos}
          type="button"
        >
          Guardar los permisos
        </button>
      </div>
    </div>
  );
}

export default AsignarPermisosRoles;
