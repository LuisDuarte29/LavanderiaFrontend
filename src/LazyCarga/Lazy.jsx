import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function Lazy() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando…</span>
      </div>
    </div>
  );
}


