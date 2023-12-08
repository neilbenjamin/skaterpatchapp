//New route created in the server to check data being entered by user that was just CREATED in the
//registration section against the data written on MongoDB.
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode"; //This was essential to decoding the JWT and caused much frustration.
//before finally getting it solved. In due course I want to learn how to pass the JWT as cookie data for heightened
//security measures.

function UserLogin({ onLoginSuccess }) {
  //Component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({ email, password });

    try {
      //Server endpoint.
      let response = await fetch("/api/users/login", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      if (response.ok) {
        let data = await response.json();
        //Receiving token data.
        localStorage.setItem("token", data.token);

        const decodedToken = jwtDecode(data.token); //Much frustration and 3 days later...
        console.log("Decoded JWT:", decodedToken); //testing token to check if we actually got it.

        setMessage(`${email} logged in successfully as ${decodedToken.role}`);//Token data saved as role.
        if (onLoginSuccess) {
          onLoginSuccess(decodedToken.role);
        }
      } else {
        let errorResponse = await response.json();
        setError(
          errorResponse.message || "Incorrect details, please try again."
        );
      }
    } catch (networkError) {
      setError("Failed to connect to the server.");
    }
  };

  //User input fields
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Login</h2>
              {error && <p className="text-danger">{error}</p>}
              {message && <p className="text-success">{message}</p>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="login-email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="login-password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
