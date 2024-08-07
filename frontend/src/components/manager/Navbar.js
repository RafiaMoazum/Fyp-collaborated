import React,{ useEffect,useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const NavbarM = ({ isAuthenticated, userProfilePic }) => {  {/*  pass values for isAuthenticated and userProfilePic here*/}
  

return (
    <div>
      <Navbar collapseOnSelect expand="lg" style = {{backgroundColor: "white"}}>
        <Container fluid>
          <img alt="" src="/images//H-logo.png" width="90" height="90" className="d-inline-block align-top"/>
          <Navbar.Brand href="#home"> <b>Hostel Explorer</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={userProfilePic} alt="User Profile" style={{width: '40px',height: '40px',borderRadius: '50%',marginRight: '10px'}}/>
                  <Nav.Link as={Link} to=""><b>Log out</b></Nav.Link>
                  {/*here it is maintaing login/logout functionality. So if user is loged in above block will be shown
                  with user dp and logout link, else the block below will be shown. */}
                </div>
              ) : (
                <>

                <Link to="/hostelsPage" style={{textDecoration:'none', color:'black', marginRight: '20px'}}><b> Home </b></Link>
                <Link to="/contact_us2" style={{textDecoration:'none', color:'black', marginRight: '20px'}}><b> Contact Us </b></Link>
                <Link to="/signupPage" style={{textDecoration:'none', color:'black', marginRight: '20px'}}><b>Sign Up </b></Link>
                <Link to="/loginPage" style={{textDecoration:'none', color:'black', marginRight: '20px'}}><b> | Login</b></Link>
               
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarM;
