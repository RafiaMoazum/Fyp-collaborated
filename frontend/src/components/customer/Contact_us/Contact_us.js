import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ContactForm from './ContactForm';
import Header from '../Header/Header';
import Navbar from "../Navbar/Navbar";
import { Container } from 'react-bootstrap';

const ContactUs = () => {
    const h_style =
      {
          color: "Black",
          backgroundColor: "white",
          padding: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
      };
      const style1 =
      {
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };
      const style2 =
      {
        paddingTop: '10px',
        fontSize: '18px'
      };
      const imageStyle = {
        height: "100vh",
        width: "100%",
        backgroundImage:
        'url("./images/Contact2.png")',
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        color: "white", 

      };
      const form_style = {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        
      };

    return(
        <>
        <Header/>
         <Navbar/>
            <Container fluid class = "image" style = {imageStyle}>
                <Row>
                    <Col class="col-sm-6">

                    </Col>
                    <Col class="col-sm-6">
                        <div style = {form_style}>
                            <ContactForm/>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div style={style1}>

            </div>
            <div style = {{padding: "20px"}}>
                <Row>
                <Col xs={6} className='general'>
                    <img
                        src="./images/mobapp.jpg"
                        alt="Logo"
                        className="d-inline-block align-text-top img-responsive"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    </Col>
                    <Col xs={6} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                    <Row>
                        <h3>
                        <b className='general' style={{ paddingBottom: "30px" }}>Download the App now!</b>
                        <div className="row-border"></div>
                        <p>
                            Best hostels considering your safety and comfort
                            -all at your fingertips. Download the app for an improved experience.
                        </p>
                        </h3>
                    </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default ContactUs;