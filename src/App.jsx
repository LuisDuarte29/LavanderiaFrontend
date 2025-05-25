import { useEffect, useState } from 'react';
import Navbar from './components/MasterPageLoad/Navbar';
import {BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom'
import LoginForm from './components/Login/LoginForm'; // Componente de Login
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Lista from './components/Customers/ListaCustomer'
import ListaPedidos from './components/Pedidos/ListaPedidos'; // Componente de ListaPedidos
import CreatePedidos from './components/Pedidos/CreatePedidos';
import CreateCustomer from './components/Customers/CreateCustomer';

const App = () => {
  const [data, setData] = useState([]); // Datos a obtener de la API
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  // UseEffect que se ejecuta solo después de que el usuario esté autenticado

  // Maneja la autenticación
  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn); // Actualiza el estado de autenticación
  };

  return (
  
<Router>
<div className='container-fluid min-vh-100 min-vw-100'>
  

<Routes>
  <Route 
    path="/" 
  element={
    <Navigate to="/login" replace /> // Redirige a la página de inicio de sesión por defecto
  }
  />
  <Route 
    path="/login" 
    element={
      !isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
        <Navigate to="/Home" replace />
        </>
      )
    } 
  />
  <Route 
    path="/Home" 
    element={
      isAuthenticated ? (
        <>
          <Navbar setautenticated={setIsAuthenticated}/>{/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
          <Lista /> {/* Pasa los datos a la lista */}
        </>
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />
    <Route 
    path="/ListaPedidos" 
    element={
      isAuthenticated ? (
        <>
          <Navbar setautenticated={setIsAuthenticated}/> {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
          <ListaPedidos isAuthenticated={isAuthenticated}/> {/* Asegúrate de importar este componente */}
        </>
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />
      <Route 
    path="/CreatePedidos" 
    element={
      isAuthenticated ? (
        <>
          <Navbar setautenticated={setIsAuthenticated}/> {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
          <CreatePedidos isAuthenticated={isAuthenticated}/> {/* Asegúrate de importar este componente */}
        </>
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />
  <Route 
  path="/CreatePedidos/:appointmentId" 
  element={
    isAuthenticated ? (
      <>
        <Navbar setautenticated={setIsAuthenticated} />
        <CreatePedidos isAuthenticated={isAuthenticated} />
      </>
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>

  <Route 
    path="/ListaCustomer" 
    element={
      isAuthenticated ? (
        <>
          <Navbar setautenticated={setIsAuthenticated}/> {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
          <Lista/> {/* Asegúrate de importar este componente */}
        </>
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />
  <Route 
    path="/CreateCustomer" 
    element={
      isAuthenticated ? (
        <>
          <Navbar setautenticated={setIsAuthenticated}/> {/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/}
          <CreateCustomer/> {/* Asegúrate de importar este componente */}
        </>
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />
</Routes>
   
    </div>
</Router>
 
  );
};

export default App;

