import React from 'react';

const Content = ({ data }) => {
  return (
    <div className="container my-5">
      <h2>Data from API</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Content;
