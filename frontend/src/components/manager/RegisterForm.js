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
    cnic:'',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // Add your validation logic here
    if (!ManagerData.name.trim()) {
      newErrors.name = 'Name is a required field';
    }
    // Phone validation (assuming it should contain only digits)
    if (!ManagerData.phone.trim()) {
      newErrors.phone = 'phone is a required field';
    }
    else if (!/^\d+$/.test(ManagerData.phone.trim())) {
      newErrors.phone = 'Phone should contain only digits';
    }

    // City validation
    if (!ManagerData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(ManagerData.email.trim())) {
      newErrors.email = 'Invalid email address';
    }
    else if (!ManagerData.email.trim()) {
      newErrors.email = 'email is a required field';
    }

    // CNIC validation (assuming a simple format)
    if (!/^\d{5}-\d{7}-\d{1}$/.test(ManagerData.cnic.trim())) {
      newErrors.cnic = 'Invalid CNIC format';
    }
    else if (!ManagerData.cnic.trim()) {
      newErrors.cnic = 'cnic is a required field';
    }

    // Password validation (at least 6 characters, combination of upper and lowercase)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(ManagerData.password)) {
      newErrors.password =
        'Password should be at least 6 characters and contain a combination of upper and lowercase';
    }

    // Confirm Password validation
    if (ManagerData.password !== ManagerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Add more validations for other fields

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (validateForm()) {
      const { name, phone, city, email, cnic, password, confirmPassword } = ManagerData;
  
      const res = await fetch("/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          city,
          email,
          cnic,
          password,
          confirmPassword,
        }),
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
    } else {
      // Form validation failed, you can show an error message or handle accordingly
      //window.alert('Form validation failed');
      console.log('Form validation failed');

    }
  };


  return (
    <div>
      <div className="login-form-container">
        <form method="POST">
          <div className="input-row">
                <input
                  type="text"
                  name="name"
                  placeholder= "Name"
                  value={ManagerData.name}
                  onChange={(handleInputChange)}/>
                  {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
          <div className="input-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={ManagerData.phone}
                onChange={(handleInputChange)}/>
                {errors.name && <p className="error-message">{errors.phone}</p>}
          </div>
          <div className="input-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={ManagerData.city}
                onChange={(handleInputChange)}/>
                {errors.name && <p className="error-message">{errors.city}</p>}
          </div>
          <div className="input-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={ManagerData.email}
                onChange={(handleInputChange)}/>
                {errors.name && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="input-row">
              <input
                type="cnic"
                name="cnic"
                placeholder="CNIC"
                value={ManagerData.cnic}
                onChange={(handleInputChange)}/>
                {errors.name && <p className="error-message">{errors.cnic}</p>}
          </div>
          <div className="input-row">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={ManagerData.password}
                onChange={(handleInputChange)}/>
                {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="input-row">
            <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={ManagerData.confirmPassword }
            onChange={(handleInputChange)}/>
            {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
          </div>
        
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <input className="form-register" type="submit" name="signin" value="Register" onClick={registerData} />
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