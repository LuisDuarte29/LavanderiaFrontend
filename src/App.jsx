import React, { useEffect, useState } from 'react';
import Navbar from './components/MasterPageLoad/Navbar';
import Hero from './components/MasterPageLoad/Hero';
import Content from './components/MasterPageLoad/Content';
import LoginForm from './components/Login/LoginForm'; // Componente de Login
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const [data, setData] = useState([]); // Datos a obtener de la API
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  // UseEffect que se ejecuta solo después de que el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetch('http://localhost:5289/api/Get')  // Hacer la solicitud solo si el usuario está autenticado
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error("Error fetching data:", error));
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
          <Hero />
          <Content data={data} />
        </>
      )}
    </div>
  );
};

export default App;

