import { useFormik } from "formik";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authenticate } from "../../redux/auth";
import { loginformValidate } from "../../helpers/validate";
import "./login.scss";
import { login } from "../../helpers/helper";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password:"",
    },
    validate: loginformValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // let checking = toast.loading('Checking...')
      let loginPromise = login({ username:values.username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
      })
      .then((res)=>{
        console.log(res);
        let { token } = res.data;
        localStorage.setItem('token', token);
        dispatch(authenticate());
        navigate('/home',{replace:true})
      })
      .catch((error)=>{
        toast.dismiss(); 
        toast.error(error?.response?.data?.error);
      })
    },
  }); 
  return (
    <div className="login">
       <Toaster position="top-center" reverseOrder={false}></Toaster>
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
          <form onSubmit={formik.handleSubmit}>
            <input {...formik.getFieldProps("username")} type="text" placeholder="username" required/>
            <input
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="text"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
