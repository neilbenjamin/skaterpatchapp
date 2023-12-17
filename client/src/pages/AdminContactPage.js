//Simple contac page. When I get email functionality operational 
//I will include a more dynamic comprehensive contact form. 

import React from 'react';
const AdminContactPage = () => {
  return (
    <div className="container mt-4 text-center">
        <h1 className="text-center mb-3">Contact Us</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Get in Touch</h5>
            <p className="card-text">For any queries, please contact Brenda at the ice rink on 021-535-2260. We are always here to help and look forward to hearing from you.</p>
          </div>
        </div>
        <img src="/western-province-figure-skating.png" alt="WP_Logo" />
    </div>
  )
}

export default AdminContactPage;
