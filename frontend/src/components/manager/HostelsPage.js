import React, { useEffect } from 'react'
import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './HostelsPage.css'
import Navbar from './Navbar';
import BlueHeader2 from './BlueHeader2';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa'
import Container from 'react-bootstrap/esm/Container';


const BackendUrl = 'http://localhost:8000';

export default function HostelsPage() {

  const navigate= useNavigate();
  const[userData, setUserData]=useState({ name: 'Manager' });
  const [hostelData, setHostelData] = useState([]);


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

  const fetchHostelData = async () => {
    try {
      const res = await fetch('/hostelData', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (res.status === 200) {
        const data = await res.json();
        console.log(`hostels✌: ${data.hostels}`);
        setHostelData(data.hostels);
       
      }else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      navigate('/loginPage');
    }
  };



  useEffect(() =>{
      fetchManagerData();
      fetchHostelData();
  },[]);

   
  return (
    <>
      <Navbar/>
      <BlueHeader2/>
      <Container fluid>
        <Row>
          <Col xs={4} sm={4} md={2} lg={2} className="d-none d-lg-block">
            <div>
              <div className='side'>
              <nav>
                <ul>
                  {userData && <h2>{userData.name}</h2>}
                  <li><Link to="" style={{textDecoration: "none", color: "black"}} >Profile</Link></li>
                  <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                
                  <li><Link to="" style={{textDecoration: "none", color: "black"}} >Logout</Link></li>
                  <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                </ul>
              </nav>
              </div>
            </div>
          </Col>
          <Col xs={8} sm={8} md={10} lg={10} className="d-none d-lg-block">
          <Container fluid>
            <div className='form-container1'>
              <Row>
                <Col></Col>
                <Col>
                <div className="d-flex justify-content-center ">
                    <Row>
                      <div className='form-containerhp'>
                      <h4 className='title'>
                        <Link to="/hostel_AddForm" style={{ textDecoration: "none", color: "Black" }}>
                          <FaPlusCircle /> Add Hostel
                        </Link>
                      </h4>
                      </div>
                    </Row>
                  </div>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                {hostelData.map((hostel, index) => (
                  <Col key={index} xs={12} sm={12} md={6} lg={4}>
                    <div className="container" key={index}>
                      <div className="image-contain d-flex justify-content-center">
                        {hostel.hostelImages && hostel.hostelImages.length > 0 ? (
                          <img
                            src={`${BackendUrl}/${hostel.hostelImages[0]}`}
                            alt={`Hostel ${index + 1}`}
                            className="rounded-image1 img-fluid"
                          />
                        ) : (
                          <img src="no_img.jpg" alt="hostel" className="rounded-image1 img-fluid" />
                        )}
                      </div>
                      <div className="content-container">
                        <h2 className="h5 mb-2">
                          <NavLink to={`/HostelProfile/${hostel._id}`} className='hostelNameLink' key={hostel._id}>
                            {hostel.name}
                          </NavLink>
                        </h2>
                        <p className="mb-0">{hostel.city}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              </div>
            </Container>
            </Col>
            <Col className="d-lg-none">
            <Container fluid>
            <div className='form-container1'>
              <Row>
                
                <Col>
                <div className="d-flex justify-content-center ">
                    <Row>
                      <div className='form-containerhp'>
                      <h4 className='title'>
                        <Link to="/hostel_AddForm" style={{ textDecoration: "none", color: "Black" }}>
                          <FaPlusCircle /> Add Hostel
                        </Link>
                      </h4>
                      </div>
                    </Row>
                  </div>
                </Col>
                
              </Row>
              <Row>
                {hostelData.map((hostel, index) => (
                  <Col key={index} xs={12} sm={12} md={6} lg={6} >
                    <div className="container" key={index}>
                      <div className="image-contain d-flex justify-content-center">
                        {hostel.hostelImages && hostel.hostelImages.length > 0 ? (
                          <img
                            src={`${BackendUrl}/${hostel.hostelImages[0]}`}
                            alt={`Hostel ${index + 1}`}
                            className="rounded-image1 img-fluid"
                          />
                        ) : (
                          <img src="no_img.jpg" alt="hostel" className="rounded-image1 img-fluid" />
                        )}
                      </div>
                      <div className="content-container">
                        <h2 className="h5 mb-2">
                          <NavLink to={`/HostelProfile/${hostel._id}`} className='hostelNameLink' key={hostel._id}>
                            {hostel.name}
                          </NavLink>
                        </h2>
                        <p className="mb-0">{hostel.city}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              </div>
            </Container>    
            </Col>
          </Row>
      </Container>
    </>
  )
}
