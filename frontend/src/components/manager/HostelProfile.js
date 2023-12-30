import React from 'react';
import {useState, useEffect} from 'react';
import BlueHeader2 from './BlueHeader2';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './HostelProfile.css';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import SideMenu from './SideMenu';
import {FaMapMarkerAlt,FaPhone, FaEnvelope, FaCircleNotch, FaEdit} from 'react-icons/fa';
import { Container } from 'react-bootstrap';

const BackendUrl = 'http://localhost:8000';

export default function HostelProfile() {
  const[userData, setUserData]=useState({ name: 'Manager' });
  const{hostelId}= useParams();
  const navigate = useNavigate();
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

  const HostelProfileData = async () => {
    try {
      const res = await fetch(`/hostelProfileData/${hostelId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (res.status === 200) {
        const data = await res.json();
        console.log(`hostelsProfile✌: ${data}`);
        setHostelData(data);
       
      }else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      //navigate('/loginPage');
    }
  };
  useEffect(() =>{
    HostelProfileData();
},[]);
  return (
    <>
      <Navbar/>
      <BlueHeader2/>
      <Container fluid>
          <Row>
            <Col xs={4} sm={4} md={2} lg={2}>
              <div>
             
              <div className='side'>
                <nav>
                  <ul>
                    <li>{userData && <h2>{userData.name}</h2>}</li>
                    <li><Link to="" style={{textDecoration: "none", color: "black"}} >Profile</Link></li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    <li><Link to={`/Notification/${hostelId}`} style={{textDecoration: "none", color: "black"}} >Notification</Link> </li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    <li><Link to="" style={{textDecoration: "none", color: "black"}} >Messages</Link></li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    <li><Link to="" style={{textDecoration: "none", color: "black"}} >Logout</Link></li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                  </ul>
                </nav>
                </div>

              </div>
            </Col>
            <Col xs={8} sm={8} md={10} lg={10}>
              <section className ="form-container">
                <div className="container">
                  <div className="image-container">
                    <img src="/hostel1.png" alt="My Image" className="rounded-image" />
                  </div>
                  <div className="content-container">    
                    <Row>
                      <Col>
                      <h2>{hostelData.name}</h2>
                      </Col>
                      <Col style={{textAlign: "left", paddingTop: "10px",fontSize:"20px"}}>
                      <Link to = "/Hostel_AddForm" style={{color: "black"}}>
                        <FaEdit/>
                      </Link>
                      </Col>
                    </Row>
                    <p>{hostelData.city}</p>
                    <br></br>
                  </div>
                  <button type="button" className="btn">
                    <Link to={`/RoomStatus/${hostelId}`} style={{textDecoration: "none", color: "white", textAlign: "center"}}>
                      See Rooms
                    </Link>
                  </button>
                </div>
                <Row>
                <Col lg = {1}></Col>
                <Col lg = {7}>
                <p className="text-container1">{hostelData.description}</p>
                <div style={{border:"1px solid gray", margin: "20px 0"}}></div>
                <Row>
                <Col>
                  <p className="text-container2">Gender: {hostelData.customersGender}</p>
                  </Col>
                  <Col>
                  <p className="text-container2">Floors: {hostelData.NoOfFloors}</p>
                  </Col>
                  <Col>
                  <p className="text-container2">Total Rooms: {hostelData.NoOfRooms}</p>
                </Col>
                </Row>
                <div style={{border:"1px solid gray", margin: "20px 0"}}></div>
                <Row>
                <Col>
                  <p className="text-container2"><FaMapMarkerAlt/>  {hostelData.address}</p>
                  </Col>
                  <Col>
                  <p className="text-container2"><FaPhone/>  {hostelData.phone}</p>
                  </Col>
                  <Col>
                  <p className="text-container2"><FaEnvelope/>  {hostelData.email}</p>
                  </Col>
                </Row>
                <div style={{border:"1px solid gray", margin: "20px 0"}}></div>
                <Row>
                <p className="text-container1">Facilities:</p>
                <div className="container">
                  <div className="row">
                    {hostelData.facilities &&
                      Object.keys(hostelData.facilities).length > 0 &&
                      Object.entries(hostelData.facilities).map(([facility, value]) => (
                        value && (
                          <div key={facility} className="col-md-4">
                            <div><FaCircleNotch/>   {facility}</div>
                            <br></br>
                          </div>
                        )
                      ))}
                  </div>
                </div>
                </Row>
                </Col>
                <Col lg = {5}>
                </Col>
                </Row>
                <br></br>
                <div style={{border:"1px solid gray", margin: "20px 0"}}></div>
                <Row className="image-row">
                {hostelData.hostelImages && hostelData.hostelImages.length > 0 ? (
                  hostelData.hostelImages.map((image, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                      <div className="image-container2">
                        <img src={`${BackendUrl}/${image}`} alt={`Image ${index + 1}`} className="img-fluid" />
                      </div>
                    </Col>
                  ))
                ) : (
                  <>
                    <Col xs={12} sm={6} md={4} lg={3}>
                      <div className="image-container2">
                        <img src="/InHostel2.jpg" alt="Image 2" className="img-fluid" />
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3}>
                      <div className="image-container2">
                        <img src="/InHostel3.jpg" alt="Image 3" className="img-fluid" />
                      </div>
                    </Col>
                  </>
                )}
              </Row>
                </section>
            </Col>
          </Row>
      </Container>  
    </>
  )
}
