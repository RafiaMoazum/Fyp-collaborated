import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa';
import {BrowserRouter as Router,Link} from "react-router-dom";

const Footer = () => {
    const s_footerstyle =
    {
        color: "Black",
        backgroundColor: "#EEAD4B",
        fontFamily: "Sans-Serif",
        height:"100%",
        alignItems: "center",
        justifyContent: "center"
    };
  return (
    <div className="pt-4">
    <div className="text-center py-5" style={s_footerstyle}>
      <h1 className="mb-4">
        <b>Stay tuned with updates</b>
      </h1>
      <Form className="d-flex justify-content-center">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={8} lg={8}>
            <Form.Control
              placeholder="Enter your Email Address"
              size="lg"
              className="mb-3 mb-sm-0"
            />
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <Button size="lg" style={{ width: '100%' }}>
              Subscribe
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div className="bg-white text-center py-5">
      <Container fluid>
        <Row>
          <Col xs={12} sm={4} className="mb-4 mb-sm-0">
            <img
              alt=""
              src="/images/H-logo2.png"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Col>
          <Col xs={12} sm={2} className="mb-4 mb-sm-0">
            <p>
              <b>Quick Links</b>
            </p>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/About">
              About us
            </Link>
            <br></br>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/About">
              FAQ's
            </Link>
            <br></br>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/About">
              Privacy Policy
            </Link>
            <br></br>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/About">
              Terms and Conditions
            </Link>
            <br></br>
          </Col>
          <Col xs={12} sm={3} className="mb-4 mb-sm-0">
            <p>
              <b>Contact us</b>
            </p>
            <p>hostelexplorer@gmail.com</p>
          </Col>
          <Col xs={12} sm={3}>
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
          <Col xs={12} sm="auto">
            <p className="text-muted">
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
