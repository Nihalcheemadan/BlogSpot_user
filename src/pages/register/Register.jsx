import React from "react";
import { Link } from "react-router-dom";
import './register.scss'


function Register() {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Hello There</h1>
          <p>Explore unlimited blogs from here..</p>
          <span>Do you have an account?</span>
          <Link to="/login" >
            <button type="button">Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form action="">
          <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Number" />
            <input type="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required/>
            
            <button>Register</button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
