import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import instance from '../../utils/baseUrl';
import './forgotpassword.scss'

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email) return toast.error("Email required");
    
      await instance.post('/user/authenticate',{email}) 
    
      .then(async(res) => {
        const { data : {code}  } = await instance.get('/user/generateOtp');
        console.log(code);
            if(code){
                const { status ,data : { message } } = await instance.post('/user/createMail',{ username:"" , userEmail:email })
                navigate('/otp',{ state: { data: {email:email} } }) 
                return Promise.resolve(message);   
            }     
        // toast.success("OTP sent successfully.");
        // axios.post('http://localhost:8000/api/user/resetPassword',({email})).then(()=>{
          //   navigate('/otp',{ state: { data: {email:email} } })
          // })
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 404) toast.error("User with this Email not found!")
        else toast.error("Oops, something went wrong!");
      });
  }
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
          <h1>Forgot Password?</h1>
          <form  onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text" 
              placeholder="Enter Your mail"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </form>
          <div className='submitButton'>
            <button className='submit'  onClick={(e) => handleSubmit(e)}  type="submit">Submit</button>
          </div>
          <div className="resendButton">
            
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Forgotpassword
