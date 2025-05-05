import { useEffect, useState } from 'react';
import Navbar from './components/MasterPageLoad/Navbar';
import {BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom'
import LoginForm from './components/Login/LoginForm'; // Componente de Login
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Lista from './components/MasterPageLoad/Lista'
import ListaPedidos from './components/MasterPageLoad/ListaPedidos'; // Componente de ListaPedidos
import CreatePedidos from './components/MasterPageLoad/CreatePedidos';

const App = () => {
  const [data, setData] = useState([]); // Datos a obtener de la API
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  // UseEffect que se ejecuta solo después de que el usuario esté autenticado
  useEffect(() => {
    const fechData=async ()=>{


      const tokenRecibido=localStorage.getItem("token");
      console.log(tokenRecibido)
    await fetch('https://localhost:7184/api/Customer', {
        method:"GET",
        headers:{
          "Authorization":`Bearer ${tokenRecibido}`,
          "Content-Type":"application/json"
        }
      }).then(response=>{
          if(!response.ok){
            throw new Error("Ha ocurrido un error")
          }
          return response.json();
      }).then(data=>{
       setData(data)
        console.log("Este es la data del customer: " + data)
      })
      .catch(error=>{
        console.error("Error al obtener los datos:", error)
      })
    }
    if (isAuthenticated){
      fechData();
    }

      

  }, [isAuthenticated]); // Este efecto solo se ejecutará cuando cambie el estado de autenticación

  // Maneja la autenticación
  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn); // Actualiza el estado de autenticación
  };

  return (
<Router>
<div className='container-fluid min-vh-100 min-vw-100'>
<Routes>
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
          <Lista data={data} /> {/* Pasa los datos a la lista */}
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

</Routes>
   
    </div>
</Router>
 
  );
};

export default App;

