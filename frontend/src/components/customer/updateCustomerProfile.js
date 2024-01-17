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

function UpdateCustomerProfile() {
    const navigate= useNavigate();

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
        </Row>
        </div>
        
    )
  }
  
  export default UpdateCustomerProfile;