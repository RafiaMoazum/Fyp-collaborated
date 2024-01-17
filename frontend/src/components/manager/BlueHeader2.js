import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './CustomerInfo.css'
import Togglebar from './Togglebar';

export default function BlueHeader2(props) {

  const { hostelId } = useParams();
  const [bookingDetails, setBookingDetails] = useState([]);
  const[userData, setUserData]=useState({ name: 'Manager' });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/signout', {
        method: 'POST', 
        credentials: 'include',
      });
  
      if (response.ok) {
        // Clear any local user data or tokens stored in your state
        setUserData({ name: 'Manager' });
        window.alert("Logout Successfully");

        // Redirect the user to the login page
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error(`Error during logout: ${errorData.error}`);
        window.alert(`Error during logout: ${errorData.error}`);

      }
    } catch (error) {
      console.error('Error during logout:', error);
      window.alert('Error during logout:', error);

    }
  };
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
       //console.log(`name= ${data.name}`);
       //console.log(`data=: ${data}`);

       setUserData(data);
       
       

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

  const [sidenavWidth, setSidenavWidth] = useState(0);

  const openNav = () => {
    setSidenavWidth(250);
  };

  const closeNav = () => {
    setSidenavWidth(0);
  };

const background_style={
  height: "40px"
  
};
useEffect(() =>{
  fetchManagerData();
  
},[]);
  return (
    <div>
      <Togglebar opt1="Hostel Profile" opt2="Notifications" opt3="Customer Info" opt4="Logout" />
    </div>
  )
}
