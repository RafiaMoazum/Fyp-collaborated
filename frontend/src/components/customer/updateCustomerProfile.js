import React, { useState,useEffect } from 'react';
import './UserSignupForm.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useRoomContext } from './RoomContext';
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";

function UpdateCustomerProfile() {
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

  const fetchUserData = async () =>{
      
    try{
      const res = await fetch('/userData',{
         
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

       setUserData(data);
       
       

        if(res.status !== 200)
        {
          const error= new Error(res.error);
          throw error;
        }

    }catch(err){
      console.log(err);
      //navigate("/loginPage");
    }
}
useEffect(() =>{
    fetchUserData();
    
},[]);


const updateProfile = async (e) => {
  e.preventDefault();
  const { name, phone,cnic, city, email, password, confirmPassword } = UserData;

  const res = await fetch(`/updateUser/${UserData._id}`, { 
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name, phone, cnic, city, email, password, confirmPassword
    })
  });

  if (res.status === 200) {
    console.log("User information updated successfully");
    window.alert("User information updated successfully");

    navigate("/loginPageC");
  } else {
    const errorData = await res.json();
    console.log(`Error updating user information: ${errorData.error}`);
  }
}

  return (
    <> 
    <Navbar/>
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
              placeholder="Phone"
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
          
         
          <input className="form-register" type="submit" value="Update" onClick={updateProfile} />
        </form>
        <br></br>
          
      </div>
    </div>
    </>
  );
}

export default UpdateCustomerProfile;