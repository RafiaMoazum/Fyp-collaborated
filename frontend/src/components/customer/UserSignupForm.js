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
    <form method="POST" className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={UserData.name}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          CNIC:
          <input
            className="form-input"
            type="text"
            name="cnic"
            value={UserData.cnic}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Phone:
          <input
            className="form-input"
            type="tel"
            name="phone"
            value={UserData.phone}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          City:
          <input
            className="form-input"
            type="text"
            name="city"
            value={UserData.city}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Email:
          <input
            className="form-input"
            type="email"
            name="email"
            value={UserData.email}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Password:
          <input
            className="form-input"
            type="password"
            name="password"
            value={UserData.password}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Confirm Password:
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            value={UserData.confirmPassword}
            onChange={handleInputChange}
          />
        </label>
        
      </div>
      <input className="form-register" type="submit" value="Register" onClick={signUp} />
      
      <p style={{ color:'grey', fontSize:'20px'}}>Already a Member? <Link style={{ color:'black'}} to="/loginPageC">Login</Link></p>
    </form>
    
  );
}

export default UserSignupForm;