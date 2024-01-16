//Manager Login Page

import React, { useState } from 'react';
import './LoginForm.css'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function LoginForm() {

  const navigate=useNavigate();
  const [email,setEmail] =useState('');
  const [password, setPassword] =useState('');

  
  const Login =async (e) =>{
    e.preventDefault();
    //Fetch API
    const res= await fetch('/signin', {
    method:"POST",
    credentials:'include',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
         email,
         password
    })
  });

  const data=res.json();
  if(res.status === 400 || !data)
  {
    window.alert("Invalid Credentials");
  } else{
    console.log("Login Successful")
    navigate("/hostelsPage")
  }
}


  
  return (
    <div>
      <div className="login-form-container">
        <form method="POST">
          <div className="input-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="forget-password">
          <Link style={{textDecoration:"none"}} to="/">Forget Password?</Link>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <input className='btn_link' type="submit" name="signin" value="Log In" onClick={Login} />
          </div>
        </form>
      </div>
      <p style={{textAlign: "center", paddingBottom:"50px"}}>
        Don't have an account? <Link to="/signupPage">Sign Up</Link>
      </p>
  </div>
  )
}