
import React, { useState, useContext} from 'react';
import './LoginForm.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useRoomContext } from '../RoomContext';
import Button from 'react-bootstrap/Button';


export default function LoginForm() {
  const { roomId } = useRoomContext();
  //const { roomId } = useParams();
  const navigate=useNavigate();
  const [email,setEmail] =useState('');
  const [password, setPassword] =useState('');

  
  const Login =async (e) =>{
    e.preventDefault();
    //Fetch API
    const res= await fetch('/userSignin', {
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
    console.log(`RoomId from LoginForm.js= ${roomId}`)
    window.alert("Login Successful")

    //navigate(`/RoomDetail2/${roomId}`)
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
            <p>Forget Password?</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <input type="submit" name="signin" value="Log In" onClick={Login} />
          </div>
        </form>
      </div>
      <p style={{textAlign: "center", paddingBottom:"50px"}}>
        Don't have an account? <Link to="/UserSignupPage">Sign Up</Link>
      </p>
    </div>
  );
}