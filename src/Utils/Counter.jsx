import React from "react";
import { useState } from "react";
import { useContext } from 'react';
import { ServicesContext } from '../context/ServicesContext';
export function Counter() {
const { count, setCount } = useContext(ServicesContext);

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <button onClick={() => (count>=1) && setCount(count + 1) }>+</button>
      <span>{count}</span>
      <button onClick={() => (count>=2) && setCount(count - 1)}>-</button>
    </div>
  );
}
