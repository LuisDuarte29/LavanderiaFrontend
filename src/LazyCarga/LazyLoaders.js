import { lazy } from "react";

export function LazyLoaders(componentsPath){
    return lazy(() => 
        import(`./components/${componentsPath}`) 
    );
}