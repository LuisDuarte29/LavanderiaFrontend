import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
export function ProgressBar({ estado }) {
  let porcentaje = 20;
  let className = "";

  switch (estado) {
    case "Pendiente":
      className = "bg-danger";
      porcentaje = 20;
      break;
    case "En ejecucion":
      className = "bg-warning";
      porcentaje = 50;
      break;
    case "Terminado":
      className = "bg-success";
      porcentaje = 100;
      break;
    default:
      porcentaje = 20;
      className = "bg-danger";
  }

  return (
    <div className="progress col-md-12 h-75">
      <div
        className={`progress-bar ${className}  progress-bar-striped progress-bar-animated`}
        style={{ width: `${porcentaje}%`, height: "1.7rem" }}
        role="progressbar"
        aria-valuenow={porcentaje}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {estado}
      </div>
    </div>
  );
}
