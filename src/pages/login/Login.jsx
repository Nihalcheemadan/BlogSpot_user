import React from "react";
import { Link } from "react-router-dom";
import "./login.scss";
function Login() {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello There</h1>
          <p>Explore unlimited blogs from here..</p>
          <span>Dont't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input type="email" placeholder="Email" required/>
            <input
              type="password"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
