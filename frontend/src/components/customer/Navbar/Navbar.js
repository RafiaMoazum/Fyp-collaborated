import React,{ useEffect,useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import About from '../About/About';

const NavbarC = ({ isAuthenticated, userProfilePic }) => {  {/*  pass values for isAuthenticated and userProfilePic here*/}
const [UserData, setUserData] = useState({
  name: '',
  phone: '',
  cnic:'',
  city: '',
  email: '',
  password: '',
  confirmPassword: ''
});
const fetchUserData = async () =>{
      
  try{
    const res = await fetch('/userData',{
       
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
    //navigate("/loginPage");
  }
}

useEffect(() =>{
  fetchUserData();
},[]);
  

return (
    <div>
      <Navbar collapseOnSelect expand="lg" style = {{backgroundColor: "white"}}>
        <Container fluid>
          <img alt="" src="/images//H-logo.png" width="90" height="90" className="d-inline-block align-top"/>
          <Navbar.Brand href="#home"> <b>Hostel Explorer</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            {/* <h1>{UserData.name}</h1> */}

            </Nav>
            <Nav>

              {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={userProfilePic} alt="User Profile" style={{width: '40px',height: '40px',borderRadius: '50%',marginRight: '10px'}}/>
                  <Nav.Link as={Link} to=""><b>Log out</b></Nav.Link>
                 
                </div>
              ) : (
                <>
                <Link to="/" style={{textDecoration:'none', color:'black', marginRight: '20px'}}><b> Home </b></Link>
                <Link to="/userSignupPage" style={{textDecoration:'none', color:'black', marginRight: '20px'}}><b>Sign Up </b></Link>
                <Link to="/loginPageC" style={{textDecoration:'none', color:'black', marginRight: '20px'}}><b> | Login</b></Link>
                <Link to={`/bookingsInfo/${UserData._id}`} style={{textDecoration:'none', color:'black', marginRight: '20px'}}><b> | Bookings</b></Link>

                {/* <Link to={`/updateCustomerProfile/${UserData._id}`} style={{textDecoration:'none', color:'black', marginRight: '20px'}}><b> | Profile</b></Link> */}

                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarC;
