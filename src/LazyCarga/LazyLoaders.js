import { lazy } from "react";
export function LazyLoaders(componentsPath){
      console.log(`..${componentsPath}`);
    return lazy(() => 
        import(`../components/${componentsPath}`) 
    );
  
}