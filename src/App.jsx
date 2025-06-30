import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { ToastContainer } from "react-toastify";

import { Lazy } from "./LazyCarga/Lazy"; // Componente Lazy para carga diferida
import {Suspense } from "react"; // Importa lazy y Suspense de React
import ArticulosFaltantes from "./components/Inventario/ArticulosFaltantes";
import CambioClave from "./components/Login/CambioClave"; // Componente CambioClave
  import "./../src/App.css";
  import {LazyLoaders}  from "./LazyCarga/LazyLoaders"; // Importa LazyLoaders para carga diferida de componentes
const App = () => {
  const Dashboard= LazyLoaders("Customers/ListaCustomer")// Carga diferida del componente Lista
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
 const ListaForm              = LazyLoaders("Customers/ListaCustomer");
const CreateUsuarioForm      = LazyLoaders("Usuarios/CreateUsuarios");
const ListaPedidosForm       = LazyLoaders("Pedidos/ListaPedidos");
const ListaUsuariosForm      = LazyLoaders("Usuarios/ListaUsuarios");
const CreatePedidosForm      = LazyLoaders("Pedidos/CreatePedidos");
const CreateCustomerForm     = LazyLoaders("Customers/CreateCustomer");
const AsignarPermisosRolesForm = LazyLoaders("Roles/AsignarPermisosRoles");
const ListaRolesForm         = LazyLoaders("Roles/ListaRoles");
const LazyNavbar             = LazyLoaders("MasterPageLoad/Navbar");
const LazyLoginForm          = LazyLoaders("Login/LoginForm");
  // Maneja la autenticación
  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn); // Actualiza el estado de autenticación
  };

  return (
    <Router>
      <div className="container-fluid min-vh-100 min-vw-100 d-flex flex-column">
        <CambioClave />
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
            path="/ListaUsuarios"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <ListaUsuariosForm isAuthenticated={isAuthenticated} />
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/ListaRoles"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <ListaRolesForm isAuthenticated={isAuthenticated} />
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
            path="/AsignarPermisosRoles/:rolId/:rolName"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />{" "}
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <AsignarPermisosRolesForm
                      setIsAuthenticated={setIsAuthenticated}
                    />
                    {/* Asegúrate de importar este componente */}
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/CreateUsuarios"
            element={
              isAuthenticated ? (
                <Suspense fallback={<Lazy />}>
                  <>
                    <LazyNavbar setautenticated={setIsAuthenticated} />{" "}
                    {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
                    <CreateUsuarioForm setautenticated={setIsAuthenticated} />{" "}
                    {/* Asegúrate de importar este componente */}
                  </>
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
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
