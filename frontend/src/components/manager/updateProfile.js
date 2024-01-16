//Manager Registration/SignUp Form

import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

function UpdateProfile() {
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

  

 

const fetchManagerData = async () =>{
      
    try{
      const res = await fetch('/managerData',{
         
        method:"GET",
        headers:{
           Accept:"application/json",
           "Content-Type":"application/json"
        },
        credentials:"include"
      });
      
       const data= await res.json();
       console.log(`name= ${data.name}`);
       //console.log(`data=: ${data}`);

       setManagerData(data);
       
       

        if(res.status !== 200)
        {
          const error= new Error(res.error);
          throw error;
        }

    }catch(err){
      console.log(err);
      navigate("/loginPage");
    }
}
useEffect(() =>{
    fetchManagerData();
    
},[]);

const updateProfile = async (e) => {
    e.preventDefault();
    const { name, phone, city, email, cnic, password, confirmPassword } = ManagerData;

    const res = await fetch(`/updateManager/${ManagerData._id}`, { 
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, phone, city, email, cnic, password, confirmPassword
      })
    });

    if (res.status === 200) {
      console.log("Manager information updated successfully");
      window.alert("Manager information updated successfully");

      navigate("/loginPage");
    } else {
      const errorData = await res.json();
      console.log(`Error updating manager information: ${errorData.error}`);
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
                type="cnic"
                name="cnic"
                placeholder="CNIC"
                value={ManagerData.cnic}
                onChange={(handleInputChange)}/>
          </div>
          {/* <div className="input-row">
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={ManagerData.password}
                onChange={(handleInputChange)}/>
          </div>
          <div className="input-row">
            <input
            type="text"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={ManagerData.confirmPassword }
            onChange={(handleInputChange)}/>
          </div> */}
         
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <input className="form-register" type="submit" name="update" value="Update" onClick={updateProfile} />
          </div>
        </form>
      </div>
      <p style={{textAlign: "center", paddingBottom:"50px"}}>
        
      </p>
    </div>
  )
}

export default UpdateProfile;