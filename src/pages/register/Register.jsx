import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { signupformValidation } from "../../helpers/validate";
import { proceedToSignup } from '../../helpers/helper'
import './register.scss'



function Register() {
  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: signupformValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
      let signupPromise = proceedToSignup(values)
      toast.promise(signupPromise, {
        loading: 'Creating...',  
        success : <b>Redirecting to otp verification</b>,
      });
      signupPromise.then(()=>{ 
        navigate('/otp',{state:{data:{...values}}})
      }).catch((error)=>{
        toast.dismiss()
        toast.error(error.response.data.error);
      })
    },
  });
  return (
    <div className="register">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      
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
          <form onSubmit={formik.handleSubmit}>
          <input {...formik.getFieldProps('username')}  type="text" placeholder="Username" />
            <input {...formik.getFieldProps('email')}  type="text" placeholder="Email" />
            
            <input {...formik.getFieldProps('password')}  type="text" placeholder="Password" />
            
            <button type="submit">Register</button>
            
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default Register;
