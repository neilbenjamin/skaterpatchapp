//Basic home page.
import React from 'react';

const SkaterHomePage = () => {
  return (
    <div className="container mt-4 text-center">
      <h1 className="mb-3">SKATER PATCH</h1>
      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h5 className="card-title">WELCOME</h5>
          <p className="card-text">CLICK PROFILE TO GET VIEW HOW MANY PATCHES YOU HAVE LEFT FOR THE MONTH</p>
        </div>
      </div>
    </div>
  );
};

export default SkaterHomePage;
