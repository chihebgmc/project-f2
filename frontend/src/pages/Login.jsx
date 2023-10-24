import React from 'react';

function Login() {
  return (
    <div className="col-md-6 offset-md-3 pt-5">
      <h1 className="text-center mb-5">
        Account <span className="text-primary">Login</span>
      </h1>
      <form>
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            className="form-control"
          />
          <label htmlFor="email" className="form-label mn-1">
            Email
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            className="form-control"
          />
          <label htmlFor="password" className="form-label mn-1">
            Password
          </label>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-lg btn-primary shadow-lg">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
