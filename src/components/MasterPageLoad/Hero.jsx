import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Hero = () => {
  return (
<section id="hero" className="d-flex justify-content-center align-items-center w-100 vh-100 bg-primary text-white">

      <div className="text-center">
        <h1 className="display-4 fw-bold">Welcome to Our Service</h1>
        <p className="lead">Discover the best services and solutions for your needs.</p>
        <a href="#content" className="btn btn-light btn-lg">Learn More</a>
      </div>
    </section>
  );
};

export default Hero;
