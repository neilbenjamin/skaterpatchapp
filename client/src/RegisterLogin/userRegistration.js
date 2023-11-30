//This was were the front end code started, at registration, as this is the main CREATE entry point 
//for the userId creation. I thought of building the entire databse schema here but that would be too 
//cumbersone for users, so initially built only two fields, email and password, but then later realized, having
//name and surname would suffice for skater CREATE input as I don't really want the skaters to have more control
//than that at the moment. The majortiy of the data needs to be managed by the admin crew. From this point, everything
//else in the front end was built. 
import React, { useState } from 'react';

function UserRegistration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [surname, setSurname] = useState(''); 
  const [message, setMessage] = useState('');

  const handleRegistration = async () => {
    setMessage('');

    const headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({ email, password, name, surname });

    try {
      let response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });

      if (response.ok) {
        setMessage('Registration successful!');
        setEmail('');
        setPassword('');
        setName('');
        setSurname('');
      } else if (response.status === 409) {
        setMessage('User already exists. Please use a different email.');
      } else {
        let error = await response.json();
        setMessage(error.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Register</h2>
              {message && <p className={`text-${message.startsWith('Registration successful') ? 'success' : 'danger'}`}>{message}</p>}
              <form>
                <div className="mb-3">
                  <label htmlFor="registration-name" className="form-label">Name:</label>
                  <input 
                    type="text"
                    id="registration-name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registration-surname" className="form-label">Surname:</label>
                  <input 
                    type="text"
                    id="registration-surname"
                    className="form-control"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Enter your surname"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registration-email" className="form-label">Email:</label>
                  <input 
                    type="email"
                    id="registration-email"
                    className="form-control"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email"
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registration-password" className="form-label">Password:</label>
                  <input 
                    type="password"
                    id="registration-password"
                    className="form-control"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Create a password"
                    required 
                  />
                </div>
                <button type="button" onClick={handleRegistration} className="btn btn-primary w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;
