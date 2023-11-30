//Manager Registration/SignUp Form

import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function RegisterForm() {
  const navigate= useNavigate();
  const [ManagerData, setManagerData] = useState({
    name: '',
    phone: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  let name,value;
  const handleInputChange = (event) => {
    name = event.target.name;
    value=event.target.value;
    setManagerData({ ...ManagerData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  }

  //Fetch Data from form using Fetch API
 const registerData = async (e) => {
    e.preventDefault();
    const { name, phone, city, email, password, confirmPassword } = ManagerData;

    const res = await fetch("/register", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, phone, city, email, password, confirmPassword
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
        navigate("/loginPage");
    }
}


  return (
    <div>
      <div className="login-form-container">
        <form method="POST">
          <div className="input-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={ManagerData.name}
                  onChange={(handleInputChange)}/>
            </div>
          <div className="input-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={ManagerData.phone}
                onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={ManagerData.city}
                onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={ManagerData.email}
                onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={ManagerData.password}
                onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
            <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={ManagerData.confirmPassword }
            onChange={(handleInputChange)}/>
          </div>
          <div className="forget-password">
            <p>Forget Password?</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <input type="submit" name="signin" value="Register" onClick={registerData} />
          </div>
        </form>
      </div>
      <p style={{textAlign: "center", paddingBottom:"50px"}}>
        Already a member? <Link to="/LoginPage">Login</Link>
      </p>
    </div>
  )
}

export default RegisterForm;