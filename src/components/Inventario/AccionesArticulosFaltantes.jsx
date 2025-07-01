import React, { memo } from "react";

export function AccionesArticulosFaltantes({
  row,
  articulosSeleccionados,
  setArticulosSeleccionados,
}) {
  return (
    <div>
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-sm btn-primary me-1"
          onClick={() =>
            setArticulosSeleccionados(
              articulosSeleccionados.filter(
                (articulo) => articulo.value !== row.value
              )
            )
          }
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default memo(AccionesArticulosFaltantes);
