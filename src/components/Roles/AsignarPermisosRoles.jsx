import { useEffect } from "react";
import { useContext } from "react";
import { data, useParams } from "react-router-dom";
import Select from "react-select";
import { ServicesContext } from "../../context/ServicesContext";
import { usePermisosGet } from "../../Hooks/usePermisosGet";
import { DatatableRolePermiso } from "./DatatableRolePermiso";
import { toast } from "react-toastify";
import { useComponentsFormGet } from "../../Hooks/useComponentsForm";

function AsignarPermisosRoles({ isAuthenticated }) {
  const { rolId, rolName } = useParams();
  const { dataPermisos } = usePermisosGet(isAuthenticated);
  const { dataComponents } = useComponentsFormGet(isAuthenticated);
  const { rolesSelect, setRolesSelect } = useContext(ServicesContext);
  const { componentsFormSelect, setComponentsFormSelect } =
    useContext(ServicesContext);
  useEffect(() => {
    console.log("Este es el rolId:", rolId);
    if (!rolId) {
      setRolesSelect([]);
      return;
    }
    const tokenRecibido = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7184/api/Usuarios/GetListPermisos/${rolId}/${componentsFormSelect}`,
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
  }, [rolId, dataPermisos, componentsFormSelect]);

  const selectedComponentOption =
    dataComponents.find((opt) => opt.value === componentsFormSelect) || null;

  const GuardarDatosPermisos = async () => {
    console.log("funciona el boton GuardarDatosPermisos");
    const tokenRecibido = localStorage.getItem("token");
    const url = `https://localhost:7184/api/Usuarios/CreatePermisosRole`;
    try {
      const bodyPermisos = {
        RoleId: parseInt(rolId),
        PermisosId: rolesSelect.map((permiso) => permiso.value), // Asegúrate de enviar un array de IDs
        ComponentsFormId: componentsFormSelect, // Asegúrate de enviar el ID del componente
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
  console.log("dataComponentes: →", dataComponents);
  return (
    <div className="mt-5 mb-3 d-flex justify-content-center align-items-center">
      {/* Le damos un ancho razonable al form */}
      <div className="w-75 mt-4">
        <div className="mb-3">
          <label className="form-label fs-4 text-center d-block">
            Asignar permisos al rol: <strong>{rolName}</strong>
          </label>
        </div>

        {/* Aquí el card ocupa todo el ancho (w-100) y dentro usamos row/col */}
        <div className="card p-3 w-100 mb-4">
          <div className="row gx-3">
            <div className="col-md-6">
              <Select
                className="bg-white"
                options={dataPermisos}
                value={rolesSelect}
                onChange={(selectOption) => setRolesSelect(selectOption)}
                placeholder="Elige permisos..."
                isSearchable
                isMulti
                noOptionsMessage={() => "No hay opciones"}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "2px solid #4a90e2",
                  }),
                  menu: (base) => ({ ...base, zIndex: 100 }),
                }}
              />
            </div>
            <div className="col-md-6">
              <Select
                className="bg-white"
                options={dataComponents}
                value={selectedComponentOption} // Usa la variable que ya calculaste
                onChange={(selectOption) =>
                  setComponentsFormSelect(
                    selectOption ? selectOption.value : null
                  )
                }
                placeholder="Elige componente..."
                isSearchable
                noOptionsMessage={() => "No hay opciones"}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "2px solid #4a90e2",
                  }),
                  menu: (base) => ({ ...base, zIndex: 100 }),
                }}
              />
            </div>
          </div>
        </div>

        <DatatableRolePermiso />

        <div className="text-center">
          <button
            className="btn btn-primary mt-3 mb-3"
            onClick={GuardarDatosPermisos}
            type="button"
          >
            Guardar los permisos
          </button>
        </div>
      </div>
    </div>
  );
}

export default AsignarPermisosRoles;
