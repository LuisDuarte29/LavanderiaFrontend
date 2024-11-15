import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Content = ({ data }) => {
  return (
<div id="content" className="container-fluid my-5">

      <h2 className="text-center mb-4">Data from API</h2>
      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Item {index + 1}</h5>
                <p className="card-text">{item}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
