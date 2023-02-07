import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from '../../helpers/helper';
import './otp.scss'

const Otp = () => {
  const [otp, setOtp] = useState(); 
  const location = useLocation();
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();
  const data = location.state?.data;
  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOTP(otp,data)
      .then((res) => {
        toast.success('Verification successfull');
        navigate('/login',{ replace: "true" });
    })    
      .catch(() => { 
        toast.error("invalid OTP.") 
      });
  };

  const resendOtp = async (e)=>{
    let {data:{ code }} = await axios.get('/api/user/generateOtp')
      if(code){
          let text = `Your new otp is ${code}. Verify and signup.`;
          await axios.post('/api/user/createMail', {username:data.username,userEmail:data.email,text,subject : "Resend OTP"})
      }
      toast.success("OTP resent successfully.") 
      setCounter(60)
    .catch(()=>{ toast.error('Oops, something went wrong!') })
  }
  useEffect(()=>{
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  return (
    <div className="login">
       <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="card">
        <div className="left">
          <h1>Hello There</h1>
          <p>Explore unlimited blogs from here..</p>
          <span>Dont't you have an account?</span>
        </div>
        <div className="right">
          <h1>OTP</h1>
          <form  onSubmit={(e) => handleSubmit(e)}>
            <input value={data.email}  type="text" placeholder="email" disabled />
            <input
              type="text" 
              placeholder="Enter OTP"
              onChange={e => setOtp(e.target.value)}
              required
            />
          </form>
          <div className='submitButton'>
            <button className='submit'  onClick={(e) => handleSubmit(e)}  type="submit">Submit</button>
          </div>
          <div className="resendButton">
            {counter ? <p  className="text-xs mt-4 mb-1 text-lightBlue">Timer : {counter} Sec</p> : 
            <p className="text-xs mt-4 mb-1 text-lightBlue">
              Didn't get OTP?
            <button className="resend" onClick={(e)=>resendOtp(e)}>Resend</button> 
            </p>}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Otp
