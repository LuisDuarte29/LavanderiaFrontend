// utils/delayImport.js
export function delayImport(factory, ms = 1000) {
  return new Promise(resolve =>
    setTimeout(() => factory().then(mod => resolve(mod)), ms)
  );
}
