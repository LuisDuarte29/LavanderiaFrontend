import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Content from './components/Content';


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5289/api/Get')  // URL de tu API en ASP.NET
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Content data={data} />

    </div>
  );
};

export default App;
