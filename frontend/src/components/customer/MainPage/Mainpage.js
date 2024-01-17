import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {BrowserRouter as Router,Route,Link,Switch} from "react-router-dom";
import { FaMapMarkerAlt, FaSearch, FaSlidersH, FaWifi, FaSuitcase, FaParking} from 'react-icons/fa';
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import "./Mainpage.css";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const BackendUrl = 'http://localhost:8000';


const Mainpage = () => {
    const navigate = useNavigate();

    const image = 
    {
        width: "100%",
        height: "650px",
        className:"d-inline-block align-text-top",
        objectFit: "cover"
    };
    const image1 = 
    {
        width: "100%",
        height: "300px",
        className:"d-inline-block align-text-top",
        objectFit: "contain" ,
        display: "flex",
        alignItems: "Center",
        justifyContent: "Center"
    };
    const align_style =
    {
        border : "1px solid black",
        borderRadius: "25px",
        padding: "15px",
        backgroundColor : "white",
    };
    const align_style1 =
    {
        padding: "5px",
        border : "1px solid black",
        borderRadius: "25px",
    };
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [hostels, setHostels] = useState(null);

  const handleClick = ({ city, imageSrc }) => {
     
    navigate('/cityWise', { state: { city, imageSrc } });  };
  const searchHostels = async () => {
    try {
        console.log('Search terms:', { name, address });
        const response = await fetch(`/searchHostels?name=${name}&address=${address}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log('Retrieved data:', data); 
            setHostels(data);
            console.log('setHostel=:', setHostels); 

        } else {
            throw new Error('Failed to fetch hostels');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

useEffect(() => {
    if (name !== '' || address !== '') {
      searchHostels();
    } else {
      setHostels([]); // Set an empty array or null based on your preference
    }
  }, [name, address]);
  

  
    return (
        <>
        <Container fluid style={{paddingLeft: "0px", paddingRight: "0px"}}>
        <Header/>
        <Navbar/>
            <Container fluid style={{ paddingBottom: "50px" }}>
            <img src="./images/home.jpg" alt="Logo" style={image}></img>
            <Row style={{ marginTop: "5%" }}>
                <Col xs={1} sm={3} md={2} lg={3} xl={3}></Col>
                <Col xs={10} sm={6} md={8} lg={6} xl={6}>
                    <div style = {align_style}>
                        <Row>
                        <Col xs={12} sm={9}>
                        <div style={align_style1}>
                            <div className="input-group">
                            <div className="input-group-append">
                                <span className="input-group-text" style = {{backgroundColor:"white" ,border : "none", marginTop: "5px"}}>
                                <FaMapMarkerAlt />
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Location"
                                value={address} onChange={(e) => setAddress(e.target.value)}
                                style={{ paddingTop: "7px", paddingLeft: "7px", border: "none" }}
                            />
                            </div>
                        </div>
                        </Col>
                            <Col sm={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button onClick={searchHostels} size="lg" style={{ width: "100%", backgroundColor: "#3C6B97" }}>
                                    Find
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={1} sm={3} md={2} lg={3} xl={3}></Col>
            </Row>
            <Row style={{ paddingTop: "10px", marginBottom: "5%" }}>
                <Col xs={1} sm={3} md={2} lg={3} xl={3}></Col>
                <Col xs={10} sm={6} md={8} lg={6} xl={6}>
                    <div style = {align_style}>
                        <Row>
                            <Col xs={12} sm={9}>
                                <div style = {align_style1}>
                                <div className="input-group">
                                <div className="input-group-append">
                                    <span className="input-group-text" style = {{backgroundColor:"white" ,border : "none", marginTop: "5px"}}>
                                    <FaSearch />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Name"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    style={{ paddingTop: "7px", paddingLeft: "7px", border: "none" }}
                                />
                                </div>
                                </div>
                            </Col>
                            <Col sm={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button onClick={searchHostels} size="lg" style={{ width: "100%", backgroundColor: "#3C6B97" }}>
                                    Find
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={1} sm={3} md={2} lg={3} xl={3}></Col>
            </Row>
        </Container>
        <Container>
        <div>
            {console.log('Component is rerendering. Hostels:', hostels)}
            {name !== '' || address !== '' ? (
            hostels !== null ? (
                hostels.length > 0 ? (
                    <ul style={{flexWrap: "wrap", display:"flex"}}>
                    {hostels.map((hostel) => (
                    <NavLink to={`/Hostel_ad/${hostel._id}`} className='hostelNameLink' key={hostel._id}>
                        <div className="roomDisplay" >
                        <div >
                            {hostel.hostelImages && hostel.hostelImages.length > 0 ? (
                            <img
                                src={`${BackendUrl}/${hostel.hostelImages[0]}`}
                                alt={`Image 1`}
                                style={{ width: '60%', height: '60%' }}
                            />
                            ) : (
                            <img alt="" src='./images/242009851.jpg' width="60%" height="60%" />
                            )}
                            <p>Hostel Name. {hostel.name}</p>
                            <p>Address. {hostel.address}</p>
                        </div>
                        </div>
                    </NavLink>
                    ))}
                </ul>
                ) : (
                <p>No hostels found</p>
                )
            ) : (
                <p>Loading...</p>
            )
            ) : null}
        </div>
        </Container>
            <Container fluid className="background-container" style={{backgroundImage: "url(./images/arch.png)"}}>
                <Row className="justify-content-center">
                    <Col xs={10} sm={8} md={6} lg={4}>
                    <div className='general'>
                        <div style={{ padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                        <h6 className='general'>
                            List your hostel on HostelExplorer
                        </h6>
                        <p className='general'>
                            Would you like millions of new customers to find your hostel? So would we!
                        </p>
                        <p className='general'>
                            It's simple: we list your hostel online, increasing your reach and customers!
                            Interested? Let's start our partnership today!
                        </p>
                        <Row>
                            <Col sm={12} className="text-center">
                            <Button as={Link} to="/signupPage" size="lg" style={{ width: "150px", backgroundColor: "#3C6B97", color: "white", border: "1px solid black" }}>
                                <b>Start Now!</b>
                            </Button>
                            </Col>
                        </Row>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid style = {{padding: "150px"}}>
                <Row>
                    <Col sm={12}>
                    <h2 style = {{paddingBottom: "70px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <b>
                        Explore by City
                        </b>
                    </h2>
                    </Col>
                </Row>
                <Row className="text-center">
            
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={3}>
                        <div>
                        <img className='img-city' src="./images/Minar_e_Pakistan.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{ paddingTop: "20px"}}><b>   <div onClick={() => handleClick({ city: "Lahore", imageSrc: "./images/minare.jpg" })} style={{ textDecoration:'none', color:'black', cursor: 'pointer' }}>Lahore</div></b></h3>
                        </div>                            
                    </Col>
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={2}>
                        <div>
                        <img className='img-city' src="./images/mazaarquaid.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{paddingTop: "20px"}}><b><div onClick={() => handleClick({ city: "Karachi", imageSrc: "./images/karachii.jpg" })} style={{ textDecoration:'none', color:'black', cursor: 'pointer' }}>Karachi</div></b></h3>
                        </div>
                    </Col>
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={2}>
                        <div>
                        <img className='img-city' src="./images/pakmonument.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{paddingTop: "20px"}}><b><div onClick={() => handleClick({ city: "Islamabad", imageSrc: "./images/isl.jpg"})} style={{ textDecoration:'none', color:'black', cursor: 'pointer' }}>Islamabad</div></b></h3>
                        </div>
                    </Col>
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={2}>
                        <div >
                        <img className='img-city' src="./images/ghntaaghar.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{paddingTop: "20px"}}><b><div onClick={() => handleClick({ city: "Faislabad", imageSrc: "./images/fsl.jpg"})} style={{ textDecoration:'none', color:'black', cursor: 'pointer' }}>Faislabad</div></b></h3>
                        </div>
                    </Col>
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={3}>
                        <div>
                        <img className='img-city' src="./images/multan.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{paddingLeft: "30px", paddingTop: "20px"}}><b><div onClick={() => handleClick({ city: "Multan", imageSrc: "./images/mltn.jpeg" })} style={{ textDecoration:'none', color:'black', cursor: 'pointer' }}>Multan</div></b></h3>
                        </div>
                    </Col>
                    
                </Row>
            </Container>
            <Container fluid >
                <Row>
                    <Col sm = {8} style = {{padding: "50px"}}>
                        <h2>
                            <b>
                            We have everything you need.
                            </b>
                        </h2>
                        <h4 className='text1'>
                            Discover a world of convenience as we bring you a curated selection of hostels offering all
                            facilities along with a vibrant atmosphere. Whether you're a student or belomg to a working class,
                            HostelExplorer provides a seamless platform to explore and book hostels tailored to your preferences
                        </h4>
                       <div >
                        <Row >
                            <Col sm>
                                <Row>
                                    <Col xs = {2}>
                                        <FaMapMarkerAlt className = 'styleicon_'/>
                                    </Col>
                                    <Col xs>
                                    <h4 className='text2'><b>
                                        Convenient Location
                                    </b></h4>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm>
                                <Row >
                                    <Col xs = {2}>
                                        <FaWifi className = 'styleicon_'/>
                                    </Col>
                                    <Col xs>
                                    <h4 className='text2'><b>
                                        Internet Facilities
                                    </b></h4>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="row-border"></div>
                        <Row >
                            <Col sm> 
                                <Row>
                                    <Col xs = {2}>
                                        <FaSuitcase className = 'styleicon_'/>
                                    </Col>
                                    <Col xs>
                                    <h4 className='text2'><b>
                                        Free Storage
                                    </b></h4>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm>
                                <Row>
                                    <Col xs = {2}>
                                        <FaParking className = 'styleicon_'/>
                                    </Col>
                                    <Col xs>
                                    <h4 className='text2'><b>
                                        Allotment of Parking 
                                    </b></h4>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                       </div>
                    </Col>
                    <Col sm = {4}>
                        <img src="./images/building.webp" alt="Logo" style={image1}/>
                    </Col>
                </Row>
            </Container>
            <div className="text-center py-5 orng_banner">
            <Row className="general">
                <Col sm={10} style={{ paddingTop: "10px" }}>
                <section class="layout-pt-md layout-pb-md bg-light-2">
                    <Container fluid>
                        <div class="row y-gap-30">

                            <div class="col-lg-4 col-md-6">
                                <div class="d-flex pr-30 general">
                                    <img class="img_styles" src="./images/price.png" alt="image">
                                    </img>
                                    
                                </div>
                                <br></br>
                                <div class="ml-15">
                                        <h4 class="text-18 fw-500"><b>Best Price </b></h4>
                                    </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                                <div class="d-flex pr-30 general">
                                    <img class="img_styles" src="./images/booking.jpg" alt="image">
                                    </img>
                                </div>
                                <br></br>
                                <div class="ml-15">
                                        <h4 class="text-18 fw-500"><b>Easy &amp; Quick Booking</b></h4>
                                    </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                                <div class="d-flex pr-30 general">
                                <img class="img_styles" src="./images/CC.png" alt="image">
                                    </img>
                                </div>
                                <br></br>
                                <div class="ml-15">
                                        <h4 class="text-18 fw-500"><b>Customer Care 24/7 </b></h4>
                                    </div>
                            </div>

                        </div>
                    </Container>
                </section>
                </Col>
            </Row>
        </div>
            <div style={{ padding: "20px" }}>
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
            </Container>
        </>
    );
}

export default Mainpage;