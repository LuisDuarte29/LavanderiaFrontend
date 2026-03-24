import { lazy } from "react";

const componentModules = import.meta.glob("../components/**/*.jsx");

export function LazyLoaders(componentsPath) {
  const modulePath = `../components/${componentsPath}.jsx`;
  const importer = componentModules[modulePath];

  if (!importer) {
    throw new Error(`No se encontro el componente lazy: ${modulePath}`);
  }

  return lazy(importer);
}
