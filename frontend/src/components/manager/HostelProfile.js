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
import {FaMapMarkerAlt,FaPhone, FaEnvelope, FaCircleNotch, FaEdit, FaMale, FaDoorClosed, FaDoorOpen, FaBuilding} from 'react-icons/fa';
import { Container } from 'react-bootstrap';
import Sidebar from './Sidebar'


const BackendUrl = 'http://localhost:8000';

export default function HostelProfile() {
  const[userData, setUserData]=useState({ name: 'Manager' });
  const{hostelId}= useParams();
  const navigate = useNavigate();
  const [hostelData, setHostelData] = useState([]);
  const [confirmationText, setConfirmationText] = useState('');
const [showConfirmation, setShowConfirmation] = useState(false);


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
    fetchManagerData();
    HostelProfileData();
},[]);

const handleDelete = async () => {
  if (confirmationText !== 'I want to delete this hostel') {
      window.alert('Please enter the correct confirmation statement.');
      return;
  }

  try {
      const response = await fetch(`/deleteHostel/${hostelId}`, {
          method: 'DELETE',
          credentials: 'include',
      });

      if (response.ok) {
          window.alert('Hostel deleted successfully');
          navigate('/hostelsPage');
      } else {
          const errorData = await response.json();
          window.alert(`Error deleting hostel: ${errorData.error}`);
      }
  } catch (error) {
      console.error('Error deleting hostel:', error);
  }
};

const showConfirmationPopup = () => {
  setShowConfirmation(true);
};


  return (
    <>
      <Navbar/>
      <BlueHeader2/>
      <Container fluid>
          <Row>
            <Col xs={4} sm={4} md={2} lg={2} className="d-none d-lg-block">
            <Sidebar opt1="Hostel Profile" opt2="Notifications" opt3="Customer Info" opt4="Logout" />

              {/* <div>
              <div className='side'>
                <nav>
                  <ul>
                    <li>{userData && <h2>{userData.name}</h2>}</li>
                    <li><Link to="" style={{textDecoration: "none", color: "black"}} >Profile</Link></li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    <li><Link to={`/Notification/${hostelId}`} style={{textDecoration: "none", color: "black"}} >Notification</Link> </li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    <li><Link to={`/CustomerInfo/${hostelId}`} style={{textDecoration: "none", color: "black"}} >Customer Info</Link></li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                    <li><Link to="" style={{textDecoration: "none", color: "black"}} >Logout</Link></li>
                    <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                  </ul>
                </nav>
                </div>
              </div> */}
            </Col>
            <Col xs={8} sm={8} md={10} lg={10} className="d-none d-lg-block">
              <Container fluid className ="form-container1">
                <Row>
                  <div className="content-container1">    
                    <Row>
                      <Col xs={12} sm={12} md={4} lg={3} xl={2}>
                      <div className="image-cont d-flex justify-content-center">
                        <img src="/hostel1.png" alt="My Image" className="rounded-img img-fluid" />
                      </div>
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3} xl={2}>
                      <h2>{hostelData.name} <br></br><span><p>{hostelData.city}</p></span> </h2>
                      </Col>
                      <Col xs={6} sm={6} md={2} lg={2} xl={4}
                      style={{textAlign: "left", paddingTop: "10px",fontSize:"20px"}}>
                      <Link to={`/UpdateHostel/${hostelId}`} style={{color: "black"}}>
                        <FaEdit/>
                      </Link>
                      </Col>
                      <Col xs={12} sm={6} md={3} lg={4} xl={4}>
                      <Row>
                        <Col>
                          <button type="button" className="btn">
                            <Link to={`/RoomStatus/${hostelId}`} style={{textDecoration: "none", color: "white", textAlign: "center"}}>
                              See Rooms
                            </Link>
                          </button>
                        </Col>
                        
                      </Row>
                      </Col>
                    </Row>
                  </div>
                </Row>
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
                        <img src="/no_img.jpg" alt="Image 2" className="img-fluid" />
                      </div>
                    </Col>

                  </>
                )}
              </Row>
              <br></br>
                <Row>
                <p className="text-container1">{hostelData.description}</p>
                
                <Row>
                  <p className="text-container2"><FaMapMarkerAlt/>  {hostelData.address}</p>
                 <br></br>
                  <p className="text-container2"><FaPhone/>  {hostelData.phone}</p>
                  <br></br>
                  <p className="text-container2"><FaEnvelope/>  {hostelData.email}</p>
                  <br></br>
                  <p className="text-container2"><FaMale/> {hostelData.customersGender}</p>
                  <br></br>
                  <p className="text-container2"><FaBuilding/> {hostelData.NoOfFloors}</p>
                  <br></br>
                  <p className="text-container2"><FaDoorOpen/> {hostelData.NoOfRooms}</p>
                  <br></br>
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
                </Row>
                <button  type="button" className="btn" style={{textDecoration: "none", color: "white", textAlign: "center"}}
                          onClick={showConfirmationPopup}
                      >
                          Delete Hostel
                      </button>
                      {showConfirmation && (
                          <div className="confirmation-popup">
                              <p>Please enter the following statement to confirm:</p>
                              <p>I want to delete this hostel</p>
                              <input
                                  type="text"
                                  value={confirmationText}
                                  onChange={(e) => setConfirmationText(e.target.value)}
                              />
                              <button onClick={handleDelete}>Confirm</button>
                              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                          </div>
                      )}
              </Container>
            </Col>
            <Col className="d-lg-none">
              <Container fluid className ="form-container1">
                <Row>
                  <div className="content-container1">    
                    <Row>
                      <Col xs={12} sm={12} md={4} lg={3} xl={2}>
                      <div className="image-cont d-flex justify-content-center">
                        <img src="/hostel1.png" alt="My Image" className="rounded-img img-fluid " />
                      </div>
                      </Col>
                      <Col xs={9} sm={6} md={3} lg={3} xl={2}>
                      <h2>{hostelData.name} <br></br><span><p>{hostelData.city}</p></span> </h2>
                      </Col>
                      <Col xs={3} sm={6} md={2} lg={2} xl={4}
                      style={{textAlign: "left", paddingTop: "10px",fontSize:"20px"}}>
                      <Link to={`/UpdateHostel/${hostelId}`} style={{color: "black"}}>
                        <FaEdit/>
                      </Link>
                      </Col>
                      <Col xs={12} sm={6} md={3} lg={4} xl={4}>
                      <Row>
                        <Col>
                          <button type="button" className="btn">
                            <Link to={`/RoomStatus/${hostelId}`} style={{textDecoration: "none", color: "white", textAlign: "center"}}>
                              See Rooms
                            </Link>
                          </button>
                        </Col>
                       
                      </Row>
                      </Col>
                    </Row>
                  </div>
                </Row>
                <Row className="image-row">
                {hostelData.hostelImages && hostelData.hostelImages.length > 0 ? (
                  hostelData.hostelImages.map((image, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                      <div className="image-container2 ">
                        <img src={`${BackendUrl}/${image}`} alt={`Image ${index + 1}`} className="img-fluid img-responsive" />
                      </div>
                    </Col>
                  ))
                ) : (
                  <>
                    <Col xs={12} sm={6} md={4} lg={3}>
                      <div className="image-container2">
                        <img src="/no_img.jpg" alt="Image 2" className="img-fluid" />
                      </div>
                    </Col>

                  </>
                )}
              </Row>
              <br></br>
                <Row>
                <p className="text-container1">{hostelData.description}</p>
                
                <Row>
                  <p className="text-container2"><FaMapMarkerAlt/>  {hostelData.address}</p>
                 <br></br>
                  <p className="text-container2"><FaPhone/>  {hostelData.phone}</p>
                  <br></br>
                  <p className="text-container2"><FaEnvelope/>  {hostelData.email}</p>
                  <br></br>
                  <p className="text-container2"><FaMale/> {hostelData.customersGender}</p>
                  <br></br>
                  <p className="text-container2"><FaBuilding/> {hostelData.NoOfFloors}</p>
                  <br></br>
                  <p className="text-container2"><FaDoorOpen/> {hostelData.NoOfRooms}</p>
                  <br></br>
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
                </Row>
                <button  type="button" className="btn" style={{textDecoration: "none", color: "white", textAlign: "center"}}
                          onClick={showConfirmationPopup}
                      >
                          Delete Hostel
                      </button>
                      {showConfirmation && (
                          <div className="confirmation-popup">
                              <p>Please enter the following statement to confirm:</p>
                              <p>I want to delete this hostel</p>
                              <input
                                  type="text"
                                  value={confirmationText}
                                  onChange={(e) => setConfirmationText(e.target.value)}
                              />
                              <button onClick={handleDelete}>Confirm</button>
                              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                          </div>
                      )}
              </Container>
            </Col>
          </Row>
      </Container>  
    </>
  )
}
