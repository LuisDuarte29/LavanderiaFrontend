import React from "react";
import { useContext } from "react";
import { ServicesContext } from "../context/ServicesContext";

export function Counter({ id }) {
  const { counts, setCountFor } = useContext(ServicesContext);
  // Si no existe counts[id], asumimos 1 como inicial
  const count = counts[id] || 1;

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <button onClick={() => setCountFor(id, count + 1)}>+</button>
      <span>{count}</span>
      <button onClick={() => count > 1 && setCountFor(id, count - 1)}>-</button>
    </div>
  );
}
