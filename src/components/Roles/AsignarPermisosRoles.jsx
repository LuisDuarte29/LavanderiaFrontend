import React from "react";
import { use,useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useServiciosGet } from "../../Hooks/useServiciosGet";
import {servicescontext} from "../../context/ServicesContext";

function AsignarPermisosRoles({ isAuthenticated }) {
  const roleId = useParams().roleId;
  const { dataServicio } = useServiciosGet(isAuthenticated);
  const { servicesSelect, setServicesSelect } = useContext(servicescontext);




  return <div className="mt-5 mb-3">


        <div className="mt-5 me-2 col-md-4">
          <div className="mt-5 mb-3"> 
          <Select
              className="bg-white"
              options={dataServicio}
              value={servicesSelect.selectedOption}
              onChange={(selectedOption) =>
                setServicesSelect({ ...servicesSelect, roleId:selectedOption })
              }
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
  </div>;
}

export default AsignarPermisosRoles;
