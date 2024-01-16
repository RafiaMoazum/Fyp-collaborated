import React from 'react'
import LoginForm from './LoginForm';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {FaCheck} from 'react-icons/fa';
import Navbar from "../Navbar/Navbar";
import {useEffect } from 'react';
import BlueHeader2 from '../../manager/BlueHeader2';

export default function Login() {

  const image = 
    {
        width: "100%",
        height: "auto",
        className:"d-inline-block align-text-top",
        objectFit: "cover"
    };
    const style2 = 
    {
        width: "100%",
        height: "5vh",
        className:"d-inline-block align-text-top",
        objectFit: "cover",
        backgroundColor: "#3C6B97"
    };
    const overlay = {
      position: "absolute",
      top: "100%",    // Position the overlay vertically centered
      left: "25%",  // Align the overlay to the left edge
      width: "50%", // Make the overlay full width
      transform: "translateY(-30%)", // Adjust to center vertically
      border: "1px solid black"
    };
    const features = [
      {
        text: "Post your hostels to thousands of potential customers."
      },
      {
        text: "Get instant notifications regarding your property."
      },
      {
        text: "Setup email alerts for latest news and trends."
      }
    ];
  return (
    <>
    <Navbar/>
    <BlueHeader2/>
      <div style={{ position: "relative" }}>
        <img src="./images/Website.png" alt="Logo" style={image} />
        <Col xs={3} sm={2} md={3} lg={3}>
        </Col>
        <Col xs={7} sm={8} md={6} lg={6}>
        <div style={overlay}>
          <div style={style2}></div>
            <div style={{backgroundColor: "#FCF8F8"}}>
              <LoginForm/>
            </div>
        </div>
        </Col>
       <Col xs={2} sm={2} md={3} lg={3}>
       </Col>
      </div> 
      <div style={{padding:"100px"}}>
        <Row style={{height:"30vh"}}></Row>
        {features.map((feature, index) => (
          <Row key={index}>
             <Col xs={2} sm={2} md={2} lg={2} xl={3}></Col>
                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ textAlign: "center" }}>
                  <FaCheck />
                </Col>
                <Col xs={7} sm={7} md={8} lg={7} xl={6}>
                  <p style={{ textAlign: "left"}}>
                    <b>{feature.text}</b>
                  </p>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
          </Row>
        ))}
      </div> 
    </>
  )
}
