import React from 'react';
import './Sidebar.css';
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Togglebar = (props) => {
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
        window.alert(`Error during logout: ${errorData.error}`);

      }
    } catch (error) {
      console.error('Error during logout:', error);
      window.alert('Error during logout:', error);

    }
  };
  
  useEffect(() =>{
    fetchManagerData();
    
},[]);

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
  return (
    <div>
    <header style={background_style} className='header_cont'>
    <div style={{ width: sidenavWidth }} className="sidenav">
      <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
        &times;
      </a>
      <h2>{userData && <h2>{userData.name}</h2>}</h2>
      <a href={`/HostelProfile/${hostelId}`}>{props.opt1}</a>
      <a href={`/Notification/${hostelId}`}>{props.opt2}</a>
      <a href={`/CustomerInfo/${hostelId}`}>{props.opt3}</a>
      <a href="#" onClick={handleLogout} >{props.opt4}</a>
    </div>

    <div id="main">
      <span className="d-lg-none" style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>
        &#9776;
      </span>
    </div>
    </header>
  </div>
  );
};

export default Togglebar;