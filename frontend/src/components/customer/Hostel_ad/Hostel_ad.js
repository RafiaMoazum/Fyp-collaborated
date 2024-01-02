import React from 'react';
import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import ImageSlider from "./ImageSlider";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Map_component from "./Map_component";
import Popular from "../Popular/Popular";
import Features from './Features';
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Reviews from '../Reviews/Reviews';
import ReviewForm from '../Reviews/ReviewForm';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {FaMapMarkerAlt,FaStar} from 'react-icons/fa';
import "./Hostel_ad.css";
import { NavLink } from 'react-router-dom';
import '../RoomsDisplay.css';
    
const Hostel_ad = () => {


    const images = [
    // '/images/242009851.jpg',
    // '/images/242009851.jpg',
    // '/images/242009851.jpg',
    // '/images/242009851.jpg',
    '/images/242009851.jpg',
    '/roompic.jpg',
    '/hallway.webp',

  ];

    const [isDivVisible, setDivVisible] = useState(false);
    const handleButtonClick = () => 
    {
        setDivVisible(!isDivVisible);
    };

        const{hostelId}= useParams();
        const [hostelData, setHostelData] = useState([]);
        const [displayrooms, setDisplayRooms] = useState([]);

        const DisplayRoomData = async () => {
            try {
            const res = await fetch(`/showRooms/${hostelId}`, {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            console.log('Response:', res);

            if (res.status === 200) {
                const data = await res.json();
                console.log(`Room✌: ${data}`);
                setDisplayRooms(data);
            } else {
                const error = new Error(res.error);
                throw error;
            }
            } catch (err) {
            console.error(err);
            }
        };
        

        useEffect(() => {
            DisplayRoomData();
        }, []);

  const HostelDetails = async () => {
    try {
      const res = await fetch(`/hostelDetails/${hostelId}`, {
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
    HostelDetails();
},[]);
 
    
    return (
    <>
        <div>
            <Header/>
            <Navbar/>
            <div>
                <Container>
                    <Row>
                    <Col xs={12} sm={2} md={2} lg={2}>
                        
                    </Col>
                    <Col xs={12} sm={8} md={8} lg={8}>
                        <ImageSlider images={images} />
                    </Col>
                    <Col xs={12} sm={2} md={2} lg={2}>
                        
                    </Col>
                    </Row>
                </Container>
            </div>
            <div>
                <Container fluid className='ad_style'>
                    <Row className="flex-row">
                        <Col sm style = {{alignItems: "left",justifyContent: "left",display: "flex", paddingTop : "8px" }}>
                            <h5>
                                <b>{hostelData.name}</b>
                            </h5>
                        </Col>
                        <Col sm style = {{alignItems: "right",justifyContent: "right",display: "flex"}}>
                            <Row >
                                <Col className="d-flex align-items-center " >
                                    <FaStar className='star'/>
                                    <FaStar className='star'/>
                                    <FaStar className='star'/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <p style = {{textAlign: "left"}}><FaMapMarkerAlt/> {hostelData.address}</p>
                    </Col>
                    </Row>
                    <Row>
                        <Col sm style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', paddingBottom: '5px' }}>
                            
                        <NavLink to={`/BookVisitForm/${hostelId}`} >
                        <Button  size="lg" style={{ width: '100%', backgroundColor: '#3C6B97' }}>
                            Book A Visit
                        </Button>
                       </NavLink>
                       
                        </Col>
                        <Col sm style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: '5px' }}>
                        <Button onClick={handleButtonClick}
                            size="lg" style={{ width: '100%', backgroundColor: '#3C6B97' }}
                        >
                            See Rooms
                        </Button>
                        
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                {isDivVisible && (
                    <div>
                        <h1 style={{padding: '30px' ,color: 'black' }}>Rooms</h1>
                        <div className="room-selector">
                            {displayrooms.map((room) => (
                                <NavLink to={`/RoomDetail/${room._id}`} className='hostelNameLink'>
                                <div key={room._id} className="roomDisplay">
                                <div>
                                    <p>Room No. {room.roomNumber}</p>
                                    <p>Room Type. {room.type}</p>
                                    <p>Total Capacity. {room.capacity}</p>
                                    <p>Current Capacity. {room.currentCapacity}</p>
                                    <p>Price. {room.price}</p>
                                
                                </div>
                                </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div style={{ paddingTop: "40px" }}>
                <Container fluid>
                    <Row>
                        <Col xs={12} md={8}>
                            <h2 style={{ padding: "15px" }}>
                            <b>Description</b>
                            </h2>
                            <p>
                            {hostelData.description}
                            </p>
                            <div style={{border:"1px solid gray", margin: "20px 0"}}></div>
                            <h2 style = {{padding:"15px"}}>
                                <b>Facilities</b> 
                            </h2>
                            <Features/>
                            <div style={{ border: "1px solid gray", margin: "20px 0" }}></div>
                            <h2 style={{ padding: "15px" }}>
                            <b>Reviews</b>
                            </h2>
                            <Row style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Reviews />
                            </Row>
                        </Col>
                        <Col xs={12} md={4} style={{ marginTop: "20px" }}>

                        <Map_component hostelCoordinates={hostelData.coordinates} />

                        </Col>
                    </Row>
                    <br></br><br></br>
                    <ReviewForm/>
                    <br></br><br></br>
                    <Popular />
                    
                </Container>
        </div>
        </div>
    </>
    );
}

export default Hostel_ad;