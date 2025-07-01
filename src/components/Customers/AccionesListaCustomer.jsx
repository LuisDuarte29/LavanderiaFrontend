import React from "react";
function AccionesListaCustomer({
  row,
  habilitacionPermisos,
  handleEditar,
  handleVer,
}) {
  return (
    <div>
      <div className="d-flex justify-content-end gap-2">
        {habilitacionPermisos.Eliminar ? (
          <button
            className="btn btn-sm btn-primary me-1"
            onClick={() => handleVer(row)}
          >
            Ver
          </button>
        ) : null}

        {habilitacionPermisos.Actualizar ? (
          <button
            className="btn btn-sm btn-warning me-1"
            onClick={() => handleEditar(row)}
          >
            Editar
          </button>
        ) : null}
      </div>
    </div>
  );
}
export default React.memo(AccionesListaCustomer);
