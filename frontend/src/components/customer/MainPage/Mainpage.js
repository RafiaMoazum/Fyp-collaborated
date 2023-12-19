import React from 'react';
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

const Mainpage = () => {
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
        backgroundColor : "white"
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
    const reviewData = [
    {
          text: "Start with stress, ended with satisfaction.\nThank you HostelExplorer",
          author: "~Ali Hassan from Pindi"
    },
    {
            text: "Start with stress, ended with satisfaction.\nThank you HostelExplorer",
            author: "~Ali Hassan from Pindi"
    },
  ];
    
    return (
        <>
        <Header/>
        <Navbar/>
            <Container fluid style={{ paddingBottom: "50px" }}>
            <img src="./images/home.jpg" alt="Logo" style={image}></img>
            <Row style={{ paddingTop: "25px" }}>
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
                                style={{ paddingTop: "7px", paddingLeft: "7px", border: "none" }}
                            />
                            </div>
                        </div>
                        </Col>
                            <Col sm={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button size="lg" style={{ width: "100%", backgroundColor: "#3C6B97" }}>
                                    Find
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={1} sm={3} md={2} lg={3} xl={3}></Col>
            </Row>
            <Row style={{ paddingTop: "10px" }}>
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
                                    placeholder="Search keyword"
                                    style={{ paddingTop: "7px", paddingLeft: "7px", border: "none" }}
                                />
                                </div>
                                </div>
                            </Col>
                            <Col sm={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button size="lg" style={{ width: "100%", backgroundColor: "#3C6B97" }}>
                                    Find
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={1} sm={3} md={2} lg={3} xl={3}></Col>
            </Row>
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
                            <Button size="lg" style={{ width: "150px", backgroundColor: "#3C6B97", color: "white", border: "1px solid black" }}>
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
                <Row className='general'>
                    <Col sm ={3}>
                    
                    </Col>
                    <Col sm ={2}>
                        <div className ='style-stats'>
                            <h1 className='stats-heading'>
                                10+ <br></br> Cities
                            </h1>
                        </div>
                    </Col>
                    <Col sm ={2}>
                        <div className ='style-stats'>
                            <h1 className='stats-heading2'>
                                300+ <br></br> Happy Customers
                            </h1>
                        </div>
                    </Col>
                    <Col sm ={2}>
                        <div className ='style-stats'>
                            <h1 className='stats-heading'>
                                100+ <br></br> Hostels
                            </h1>
                        </div>
                    </Col>
                    <Col sm ={3}>
                    
                    </Col>

                </Row>
            </Container>
            <Container fluid style={{ backgroundImage: "url(./images/Website.png)", backgroundSize: "cover", padding: "150px 20px", color: "white" }}>
                <h2 className="text-center">
                    <b>
                    One stop to cut down all the hustle
                    </b>
                </h2>
                <h5 className="text-center">
                    Moving to a new city not knowing where to find a suitable hostel?
                </h5>
                <h5 className="text-center">
                    Don't worry! We got you.
                </h5>
                <h5 className="text-center">
                    Find the best hostels in your preferred city within a few minutes.
                </h5>
                <Row className="justify-content-center">
                    <Col sm={10} style={{ paddingTop: "20px" }}>
                    <Button size="lg" style={{ width: "auto", backgroundColor: "#3C6B97", color: "white", border: "1px solid white" }}>
                        <b>Explore Popular Hostels</b>
                    </Button>
                    </Col>
                </Row>
            </Container>
            <Container fluid style = {{padding: "200px"}}>
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
            
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={2}>
                        <div>
                        <img className='img-city' src="./images/Minar_e_Pakistan.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{ paddingTop: "20px"}}><b><Link to="./lahore" style={{textDecoration:'none', color:'black'}}>Lahore</Link></b></h3>
                        </div>                            
                    </Col>
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={2}>
                        <div>
                        <img className='img-city' src="./images/mazaarquaid.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{paddingTop: "20px"}}><b>Karachi</b></h3>
                        </div>
                    </Col>
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={2}>
                        <div>
                        <img className='img-city' src="./images/pakmonument.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{paddingTop: "20px"}}><b>Islamabad</b></h3>
                        </div>
                    </Col>
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={2}>
                        <div >
                        <img className='img-city' src="./images/ghntaaghar.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{paddingTop: "20px"}}><b>Faisalabad</b></h3>
                        </div>
                    </Col>
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={2}>
                        <div>
                        <img className='img-city' src="./images/multan.jpg" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{paddingLeft: "30px", paddingTop: "20px"}}><b><Link to="./allHostels" style={{textDecoration:'none', color:'black'}}>Multan</Link></b></h3>
                        </div>
                    </Col>
                    <Col className='general' xs={12} sm={6} md={4} lg = {3} xl={2}>
                        <div>
                        <img className='img-city' src="./images/seeAll.png" alt= "Logo"></img> 
                        <br></br>
                        <h3 style = {{paddingLeft: "30px", paddingTop: "20px"}}><b>
                            <Link to="./allHostels" style={{textDecoration:'none', color:'black'}}>
                               See All Cities
                             </Link></b>
                        </h3>
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
            <div className='slider'>
                <Slider {...sliderSettings}>
                    {reviewData.map((review, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <h3>
                                <b>What Our Users Have To Say</b>
                            </h3>
                            <p>
                                {review.text}
                            </p>
                            <p>
                                {review.author}
                            </p>
                        </div>
                    </div>
                    ))}
                </Slider>
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

        </>
    );
}

export default Mainpage;