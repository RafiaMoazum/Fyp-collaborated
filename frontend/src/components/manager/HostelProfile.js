import React from 'react';
import {useState, useEffect} from 'react';
import BlueHeader2 from './BlueHeader2';
import Navbar from '../customer/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './HostelProfile.css';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import SideMenu from './SideMenu';

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
      <div>
          <Row>
            <Col xs={4} sm={4} md={2} lg={2}>
              <div>
             
              <div className='side'>
                <nav>
                  <ul>
                    <li>{userData && <h2>{userData.name}</h2>}</li>
                    <li><Link to="/hostelsPage" style={{textDecoration: "none", color: "white"}} >Home</Link></li>
                    <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                    <li><Link to={`/RoomStatus/${hostelId}`} style={{textDecoration: "none", color: "white"}} >Rooms</Link></li>
                    <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                    <li><Link to={`/CustomerInfo/${hostelId}`} style={{textDecoration: "none", color: "white"}} >Customer Information</Link></li>
                    <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                    <li><Link to="" style={{textDecoration: "none", color: "white"}} >Notification</Link> </li>
                    <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                    <li><Link to="" style={{textDecoration: "none", color: "white"}} >Messages</Link></li>
                    <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                    <li><Link to="" style={{textDecoration: "none", color: "white"}} >Logout</Link></li>
                    <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
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
                    <h2>{hostelData.name}</h2>
                    <p>{hostelData.city}</p>
                    <br></br>
                  </div>
                  <button type="button" className="btn">
                    <Link to="/Hostel_AddForm" style={{textDecoration: "none", color: "white", textAlign: "center"}}>
                      Edit Hostel Profile
                    </Link>
                  </button>
                </div>

          <div className="image-row">
            <div className="image-container2">
            {hostelData.hostelImages && hostelData.hostelImages.length > 0 ? (
        hostelData.hostelImages.map((image, index) => (
          <img key={index} src={`${BackendUrl}/${image}`} alt={`Image ${index + 1}`} />
        ))
      ) : (
                 <>
                  <div className="image-container2">
                    <img src="/InHostel2.jpg" alt="Image 2" />
                    
                  </div>
                  <div className="image-container2">
                    <img src="/InHostel3.jpg" alt="Image 3" />
                    
                  </div>
                 </>
              )}
            </div>       
          </div>

                <div className="text-container">
                  <p>{hostelData.description}</p>
                </div>
                <div className="text-container">
                  <p>For:{hostelData.customersGender}</p>
                </div>
                <div className="text-container">
                  <p>Total Floors:{hostelData.NoOfFloors}</p>
                </div>
                <div className="text-container">
                  <p>Total Rooms:{hostelData.NoOfRooms}</p>
                </div>

                <div className="image-container3">
                    <img src="/images/address.png" alt="Image 1" />
                    <p>{hostelData.address}</p>
                  </div>
                  <div className="image-container3">
                    <img src="/contact.png" alt="Image 2" />
                    <p>{hostelData.phone}</p>
                  </div>
                  <div className="image-container3">
                    <img src="/email.png" alt="Image 3" />
                    <p>{hostelData.email}</p>
                  </div>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                       {hostelData.facilities && Object.keys(hostelData.facilities).length > 0 && Object.entries(hostelData.facilities).map(([facility, value]) => (
                        value && <li key={facility}>{facility}</li>
                      ))}
                </ul>
                </section>
            </Col>
          </Row>
      </div>  
    </>
  )
}
