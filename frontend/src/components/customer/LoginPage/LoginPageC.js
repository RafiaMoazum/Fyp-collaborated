import React from 'react'
import LoginForm from './LoginForm';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {FaCheck} from 'react-icons/fa';
import Navbar from "../Navbar/Navbar";

export default function Login() {
  const image = 
    {
        width: "100%",
        height: "auto",
        className:"d-inline-block align-text-top",
        objectFit: "cover"
    };
    const style1 = 
    {
        width: "100%",
        height: "10vh",
        className:"d-inline-block align-text-top",
        objectFit: "cover",
        backgroundColor: "#87B5E0"
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
      left: "32%",     // Align the overlay to the left edge
      width: "40%", // Make the overlay full width
      transform: "translateY(-50%)", // Adjust to center vertically
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
      <div style={style1}></div>
      <div style={{ position: "relative" }}>
        <img src="./images/Website.png" alt="Logo" style={image} />
        <div style={overlay}>
          <div style={style2}></div>
            <div style={{backgroundColor: "#FCF8F8"}}>
              <LoginForm/>
            </div>
        </div>
      </div> 
      <div style={{padding:"100px"}}>
        <Row style={{height:"30vh"}}></Row>
        {features.map((feature, index) => (
          <Row key={index}>
            <Col xs={4} sm={4} md={4} lg={4}></Col>
            <Col xs={1} sm={1} md={1} lg={1} style={{ textAlign: "center" }}>
              <FaCheck />
            </Col>
            <Col xs={5} sm={5} md={5} lg={5}>
              <p>
                <b>{feature.text}</b>
              </p>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}></Col>
          </Row>
        ))}
      </div> 
    </>
  )
}
