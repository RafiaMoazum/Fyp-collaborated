//Manager Registration/SignUp Form

import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import BlueHeader2 from './BlueHeader2';
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

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
  const[userData, setUserData]=useState({ name: 'Manager' });
  
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
      <Navbar/>
      <BlueHeader2/>
      <Row>
        <Col xs={4} sm={4} md={2} lg={2} className="d-none d-lg-block">
        <div>
              <div className='side'>
              <nav>
                <ul>
                  {userData && <h2>{userData.name}</h2>}
                  <li><Link to={`/updateProfile/${userData._id}`} style={{textDecoration: "none", color: "black"}} >Profile</Link></li>
                  <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                  
                  <li> <Link to="" onClick={handleLogout} style={{textDecoration: "none", color: "black"}} >Logout</Link></li>
                  <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                </ul>
              </nav>
              </div>
            </div>
          </Col>
          <Col xs={8} sm={8} md={10} lg={10} className="d-none d-lg-block">
          <div className="form-container">
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              <input className="form-register" type="submit" name="update" value="Update" onClick={updateProfile} />
            </div>
          </form>
      </div>
      <p style={{textAlign: "center", paddingBottom:"50px"}}>
        
      </p>
      </div>
          </Col>
          <Col className="d-lg-none">
          <div className="form-container">
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              <input className="form-register" type="submit" name="update" value="Update" onClick={updateProfile} />
            </div>
          </form>
      </div>
      <p style={{textAlign: "center", paddingBottom:"50px"}}>
        
      </p>
      </div>
          </Col>
      </Row>
      </div>
      
  )
}

export default UpdateProfile;