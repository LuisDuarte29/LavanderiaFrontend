import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { ServicesContext } from "../../context/ServicesContext";
import { usePermisosGet } from "../../Hooks/usePermisosGet";
import { useComponentsFormGet } from "../../Hooks/useComponentsForm";
import { toast } from "react-toastify";
import { DatatableRolePermiso } from "./DatatableRolePermiso";

function AsignarPermisosRoles({ isAuthenticated }) {
  const { rolId, rolName } = useParams();
  const { dataPermisos } = usePermisosGet(isAuthenticated);
  const { dataComponents } = useComponentsFormGet(isAuthenticated);

  // Estados locales para manejar la selección
  const [localComponentsFormSelect, setLocalComponentsFormSelect] =
    useState(null);
  const [localRolesSelect, setLocalRolesSelect] = useState([]);

  const { setRolesSelect } = useContext(ServicesContext);

  // Inicializar el componente seleccionado
  useEffect(() => {
    if (
      dataComponents &&
      dataComponents.length > 0 &&
      !localComponentsFormSelect
    ) {
      setLocalComponentsFormSelect(dataComponents[0].value);
    }
  }, [dataComponents]);

  // Obtener los permisos cuando cambia el rol o el componente
  useEffect(() => {
    if (!rolId || !localComponentsFormSelect) {
      setLocalRolesSelect([]);
      return;
    }

    const tokenRecibido = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7184/api/Usuarios/GetListPermisosAsignacion/${rolId}/${localComponentsFormSelect}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenRecibido}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          toast.error(errorText || "Error al obtener los permisos del rol");
          setLocalRolesSelect([]);
          return;
        }

        const data = await response.json();
        const ApiPermiso = data.map((item) => item.permisoId);
        const roleOption = dataPermisos.filter((item) =>
          ApiPermiso.includes(item.value)
        );

        setLocalRolesSelect(roleOption || []);
        setRolesSelect(roleOption || []);
      } catch (error) {
        toast.error("Error en la conexión");
        setLocalRolesSelect([]);
      }
    };

    fetchData();
  }, [rolId, dataPermisos, localComponentsFormSelect]);

  const selectedComponentOption =
    dataComponents?.find((opt) => opt.value === localComponentsFormSelect) ||
    null;

  const GuardarDatosPermisos = async () => {
    const tokenRecibido = localStorage.getItem("token");
    const url = `https://localhost:7184/api/Usuarios/CreatePermisosRole`;

    try {
      const bodyPermisos = {
        RoleId: parseInt(rolId),
        PermisosId: localRolesSelect.map((permiso) => parseInt(permiso.value)),
        ComponentsFormId: parseInt(localComponentsFormSelect),
      };

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${tokenRecibido}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPermisos),
        method: "PUT",
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Error al asignar permisos");
      }

      toast.success("✅ Permisos asignados con éxito!");
    } catch (error) {
      toast.error(error.message || "Error al asignar los permisos");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center mb-0">Asignación de Permisos</h2>
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-center mb-4">
            <div className="alert alert-info w-75 text-center">
              <h4 className="mb-0">
                Asignando permisos al rol:{" "}
                <span className="badge bg-secondary">{rolName}</span>
              </h4>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Componente:</label>
              <Select
                className="border-primary"
                options={dataComponents}
                value={selectedComponentOption}
                onChange={(selectOption) => {
                  setLocalComponentsFormSelect(
                    selectOption ? selectOption.value : null
                  );
                }}
                placeholder="Seleccione un componente..."
                isSearchable
                noOptionsMessage={() => "No hay opciones disponibles"}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "2px solid #4a90e2",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100,
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  }),
                  option: (base, { isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected ? "#4a90e2" : "white",
                    color: isSelected ? "white" : "#333",
                    "&:hover": {
                      backgroundColor: isSelected ? "#4a90e2" : "#e9f0fa",
                    },
                  }),
                }}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Permisos:</label>
              <Select
                className="border-success"
                options={dataPermisos}
                value={localRolesSelect}
                onChange={(selectOption) => setLocalRolesSelect(selectOption)}
                placeholder="Seleccione permisos..."
                isSearchable
                isMulti
                noOptionsMessage={() => "No hay opciones disponibles"}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "2px solid #28a745",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100,
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#d4edda",
                    borderRadius: "4px",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#155724",
                    fontWeight: "500",
                  }),
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-center mb-3">Permisos Actuales</h4>
            <div className="border rounded p-3 bg-light">
              <DatatableRolePermiso />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-success btn-lg px-5 py-2"
              onClick={GuardarDatosPermisos}
              type="button"
            >
              <i className="bi bi-save me-2"></i>
              Guardar Permisos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsignarPermisosRoles;
