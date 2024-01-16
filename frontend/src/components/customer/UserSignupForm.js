//user Registration/SignUp Form

import React, { useState } from 'react';
import './UserSignupForm.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useRoomContext } from './RoomContext';


function UserSignupForm() {
  const navigate= useNavigate();
  const { roomId } = useRoomContext();
  const [UserData, setUserData] = useState({
    name: '',
    phone: '',
    cnic:'',
    city: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  let name,value;
  const handleInputChange = (event) => {
    name = event.target.name;
    value=event.target.value;
    setUserData({ ...UserData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  }

  //Fetch Data from form using Fetch API
 const signUp = async (e) => {
    e.preventDefault();
    const { name, phone,cnic, city, email, password, confirmPassword } = UserData;

    const res = await fetch("/userSignup", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, phone, cnic, city, email, password, confirmPassword
        })
    });

    // Check response status
    if (res.status === 422) {
        // Handle the error case
        const errorData = await res.json();
        window.alert(`User couldn't be registered: ${errorData.error}`);
        console.log(`User couldn't be registered: ${errorData.error}`);
    } else {
        // Handle the success case
        //const data = await res.json();
        //window.alert("User registered successfully✌");
        console.log("User registered successfully✌");
        navigate("/loginPageC");
    }
}


  return (
    <div>
      <div className="login-form-container">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={UserData.name}
              onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
            <input
              type="text"
              name="cnic"
              placeholder="CNIC"
              value={UserData.cnic}
              onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
            <input
              type="tel"
              name="phone"
              placeholder="CNIC"
              value={UserData.phone}
              onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={UserData.city}
              onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={UserData.email}
              onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={UserData.password}
              onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={UserData.confirmPassword}
              onChange={(handleInputChange)}/>
          </div>
          <div className="forget-password">
          <Link style={{textDecoration:"none"}} to="/">Forget Password?</Link>
          </div>
          <input className="form-register" type="submit" value="Register" onClick={signUp} />
        </form>
        <br></br>
          <p style={{textAlign: "center", paddingBottom:"50px"}}>
            Already a member? <Link to="/LoginPage">Login</Link>
          </p>
      </div>
    </div>
    
  );
}

export default UserSignupForm;