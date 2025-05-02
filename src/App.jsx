import React, { useEffect, useState } from 'react';
import Navbar from './components/MasterPageLoad/Navbar';
import Hero from './components/MasterPageLoad/Hero';
import Content from './components/MasterPageLoad/Content';
import LoginForm from './components/Login/LoginForm'; // Componente de Login
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Lista from './components/MasterPageLoad/Lista'

const App = () => {
  const [data, setData] = useState([]); // Datos a obtener de la API
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  // UseEffect que se ejecuta solo después de que el usuario esté autenticado
  useEffect(() => {
    const fechData=async ()=>{


      const tokenRecibido=localStorage.getItem("token");
      console.log(tokenRecibido)
    const peticionFetch= await fetch('https://localhost:7184/api/Customer', {
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
    <div className='container-fluid min-vh-100 min-vw-100'>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} /> // Si no está autenticado, mostrar el login
      ) : (
        <>
          <Navbar />
          <Lista data={data}/>
        </>
      )}
    </div>
  );
};

export default App;

