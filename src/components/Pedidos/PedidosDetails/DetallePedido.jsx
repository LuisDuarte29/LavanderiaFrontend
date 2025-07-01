import { memo } from "react";
import { ProgressBar } from "../../../Utils/ProgressBar";
function DetallePedido({ data }) {
  return (
    <div className="p-2 col-md-3">
      <h6>Servicios:</h6>
      <ul>
        {data.services && data.services.length > 0 ? (
          data.services.map((servicio) => (
            <li key={servicio.serviceId} className="mb-2">
              <div className="row align-items-center">
                <div className="col-4">
                  <span>{servicio.serviceName}</span>
                </div>
                <div className="col-8">
                  <ProgressBar estado={servicio.estado} />
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No hay servicios.</p>
        )}
      </ul>
    </div>
  );
}

export default memo(DetallePedido);
