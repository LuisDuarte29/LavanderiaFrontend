import { useEffect, useState } from "react";
import Navbar from "./components/MasterPageLoad/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/Login/LoginForm"; // Componente de Login
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Lista from "./components/Customers/ListaCustomer";
import ListaPedidos from "./components/Pedidos/ListaPedidos"; // Componente de ListaPedidos
import CreatePedidos from "./components/Pedidos/CreatePedidos";
import CreateCustomer from "./components/Customers/CreateCustomer";
import { ToastContainer, toast } from "react-toastify";
import { lazy, Suspense } from "react";
import { Lazy } from "./LazyCarga/Lazy"; // Componente Lazy para carga diferida
import { delayImport } from "./LazyCarga/DelayImport"; // Función para retrasar la importación de componentes
import ArticulosFaltantes from "./components/Inventario/ArticulosFaltantes";
import  CambioClave  from "./components/Login/CambioClave"; // Componente CambioClave
import "./../src/App.css";

const App = () => {
  const Dashboard = lazy(() =>
    delayImport(() => import("./components/Customers/ListaCustomer"))
  ); // Carga diferida del componente Lista
  const [data, setData] = useState([]); // Datos a obtener de la API
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  const ListaForm = lazy(() => import("./components/Customers/ListaCustomer")); // Carga diferida del componente Lista
  const ListaPedidosForm = lazy(() =>
    import("./components/Pedidos/ListaPedidos")
  ); // Carga diferida del componente ListaPedidos
  const CambioClaveForm=lazy(() =>
    import("./components/Login/CambioClave")  
  ); // Carga diferida del componente CambioClave
  const CreatePedidosForm = lazy(() =>
    import("./components/Pedidos/CreatePedidos")
  ); // Carga diferida del componente CreatePedidos
  const CreateCustomerForm = lazy(() =>
    import("./components/Customers/CreateCustomer")
  ); // Carga diferida del componente CreateCustomer
  const LazyNavbar = lazy(() => import("./components/MasterPageLoad/Navbar")); // Carga diferida del componente Navbar
  const LazyLoginForm = lazy(() => import("./components/Login/LoginForm")); // Carga diferida del componente LoginForm
  // Maneja la autenticación
  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn); // Actualiza el estado de autenticación
  };

  return (
    <Router>
      <div className="container-fluid min-vh-100 min-vw-100 d-flex flex-column">
              <CambioClave/>
        <Routes>
    
          <Route
            path="/"
            element={
              <Suspense fallback={<Lazy />}>
                <Navigate to="/login" replace /> // Redirige a la página de
                inicio de sesión por defecto
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <LazyLoginForm onLogin={handleLogin} />
                </Suspense>
              ) : (
                <Navigate to="/Home" replace />
              )
            }
          />
          <Route
            path="/Home"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <Dashboard isAuthenticated={isAuthenticated} />
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/ListaPedidos"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />{" "}
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <ListaPedidosForm isAuthenticated={isAuthenticated} />{" "}
                    {/* Asegúrate de importar este componente */}
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/CreatePedidos"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />{" "}
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <CreatePedidosForm isAuthenticated={isAuthenticated} />{" "}
                    {/* Asegúrate de importar este componente */}
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/CreatePedidos/:appointmentId"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />
                    <CreatePedidosForm isAuthenticated={isAuthenticated} />
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/ListaCustomer"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />{" "}
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <ListaForm isAuthenticated={isAuthenticated} />{" "}
                    {/* Asegúrate de importar este componente */}
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/CreateCustomer"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />{" "}
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <CreateCustomerForm />{" "}
                    {/* Asegúrate de importar este componente */}
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/ArticulosFaltantes"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />{" "}
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <ArticulosFaltantes />{" "}
                    {/* Asegúrate de importar este componente */}
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/ArticulosFaltantes"
            element={
              isAuthenticated ? (
                <>
                  <Navbar setautenticated={setIsAuthenticated} />{" "}
                  {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                  <ArticulosFaltantes />{" "}
                  {/* Asegúrate de importar este componente */}
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
         
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </Router>
  );
};

export default App;
