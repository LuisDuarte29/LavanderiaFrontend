import React, { memo } from "react";

function AccionesListaPedidos({
  habilitacionPermisos,
  row,
  handleEditar,
  handleVer,
}) {
  return (
    <div>
      <div className="d-flex justify-content-end gap-2">
        {habilitacionPermisos.Eliminar && (
          <button
            className="btn btn-sm btn-danger me-1"
            onClick={() => handleVer(row)}
          >
            Ver
          </button>
        )}

        {habilitacionPermisos.Actualizar && (
          <button
            className="btn btn-sm btn-warning me-1"
            onClick={() => handleEditar(row)}
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(AccionesListaPedidos);
