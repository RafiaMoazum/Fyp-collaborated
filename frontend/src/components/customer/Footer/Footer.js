import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa';
import {BrowserRouter as Router,Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className="pt-4" style={{ backgroundColor:"#3C6B97", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", marginTop: "10%"}}>
    
    <div className="text-center py-5" >
      <Container fluid>
        <Row>
          <Col xs={12} sm={4} className="mb-4 mb-sm-0">
            <img
              alt=""
              src="/images/logo.png"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Col>
          <Col xs={12} sm={2} className="mb-4 mb-sm-0 " style={{color: "white"}} >
            <p>
              <b>Quick Links</b>
            </p>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/About">
              About us
            </Link>
            <br></br>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/About">
              FAQ's
            </Link>
            <br></br>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/About">
              Privacy Policy
            </Link>
            <br></br>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/About">
              Terms and Conditions
            </Link>
            <br></br>
          </Col>
          <Col xs={12} sm={3} className="mb-4 mb-sm-0 text_clr" style={{color: "white"}}>
            <p>
              <b>Contact us</b>
            </p>
            <p>hostelexplorer@gmail.com</p>
          </Col>
          <Col xs={12} sm={3} style={{color: "white"}}>
            <p>
              <b>Follow us </b>
            </p>
            <p>
              <FaFacebook style={{ width: '8%', height: 'auto' }} />
            </p>
            <p>
              <FaInstagramSquare style={{ width: '8%', height: 'auto' }} />
            </p>
            <p>
              <FaTwitter style={{ width: '8%', height: 'auto' }} />
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} sm="auto" >
            <p  style={{color: "white"}}>
              All material herein © 2023 HostelExplorer.com. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
  );
};

export default Footer;
