import React from "react";
import { useState } from "react";

export function Counter({ precio }) {
  const [count, setCount] = useState(0);

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <button onClick={() => setCount(count + 1)}>+</button>
      <span>{count * precio}</span>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
