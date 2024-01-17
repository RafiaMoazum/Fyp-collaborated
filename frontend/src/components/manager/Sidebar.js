import React from 'react';
import './Sidebar.css';
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Sidebar = (props) => {
  const{hostelId}= useParams();
  const navigate = useNavigate();

  const[userData, setUserData]=useState({ name: 'Manager' });

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
        //window.alert(`Error during logout: ${errorData.error}`);

      }
    } catch (error) {
      console.error('Error during logout:', error);
      window.alert('Error during logout:', error);

    }
  };
  
  useEffect(() =>{
    fetchManagerData();
    
},[]);
  return (
    <>
    
    <div className='side'>
    <nav>
      <ul>
        {userData && <h2>{userData.name}</h2>}
        <li><Link to={`/HostelProfile/${hostelId}`} style={{textDecoration: "none", color: "black"}} >{props.opt1}</Link></li>
        <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
        <li><Link to={`/Notification/${hostelId}`} style={{textDecoration: "none", color: "black"}} >{props.opt2}</Link> </li>
        <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
        <li><Link to={`/CustomerInfo/${hostelId}`} style={{textDecoration: "none", color: "black"}} >{props.opt3}</Link></li>
        <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
        <li> <Link to="" onClick={handleLogout} style={{textDecoration: "none", color: "black"}} >{props.opt4}</Link></li>
        <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
      </ul>
    </nav>
    </div>
    </>
  );
};

export default Sidebar;