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
    const justify = 
    {
        backgroundColor: "#3C6B97",
        color: "white",
        border: "1px solid black",
        borderRadius: "15%"

    };
    const icon = 
    {
        width: "30px",
        height: "30px",
        
    };
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
    const settings = {
        dots: true,
        infinite: true,
        dotsClass: 'slick-dots',
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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
            <div style  = {{paddingBottom: "50px"}}>
                <img src="./images/home.jpg" alt= "Logo" style = {image} ></img>  
                <Row style = {{paddingTop: "25px"}}>
                    <Col sm = {3}>
                    
                    </Col>
                    <Col  sm = {6} >
                        <div style = {align_style}>
                            <Row>
                                <Col sm = {9} >
                                    <div style = {align_style1}>
                                        <p style = {{paddingTop: "7px", paddingLeft: "7px"}}>
                                            <FaMapMarkerAlt/>  Add Address
                                        </p>
                                    </div>
                                </Col>
                                <Col sm = {3} style={{display: "flex", alignItems:"center", justifyContent: "center"}}>
                                    <Button size="lg" style={{width: "130px", backgroundColor: "#3C6B97"}}>
                                        Find
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col  sm = {3}>
                    
                    </Col>
                </Row>
                <Row style = {{paddingTop: "10px"}}>
                    <Col sm = {3}>
                    
                    </Col>
                    <Col  sm = {6}>
                        <div style = {align_style}>
                            <Row>
                                <Col sm = {5}>
                                    <div style = {align_style1}>
                                        <p style = {{paddingTop: "7px", paddingLeft: "7px"}}>
                                            <FaSearch/>  Search by keyword
                                        </p>
                                    </div>
                                </Col>
                                <Col sm = {4}>
                                    <div style = {align_style1}>
                                        <p style = {{paddingTop: "7px", paddingLeft: "7px"}}>
                                            <FaSlidersH/>  Filter
                                        </p>
                                    </div>
                                </Col>
                                <Col sm = {3} style={{display: "flex", alignItems:"center", justifyContent: "center"}}>
                                    <Button size="lg" style={{width: "130px", backgroundColor: "#3C6B97"}}>
                                        Find
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col  sm = {3}>
                    
                    </Col>
                </Row>
            </div>
            <div style = {{backgroundImage : "url(./images/arch.png)", padding: "100px"}}>         
                <Row>
                    <Col sm = {4}></Col>
                    <Col sm = {4}>
                        <div style={justify}>
                            <Container style={{padding : "10px"}}>
                                <h6 style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    List your hostel on HostelExplorer
                                </h6>
                                <p style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    Would you like millions of new customers to find your hostel? 
                                    So would we!
                                </p>
                                <p style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    It's simple: we list your hostel online, increasing your reach and customers!
                                    Interested? Let's start our partnership today!
                                </p>
                                <Row>
                                    <Col sm = {4}></Col>
                                    <Col sm = {5}>
                                        <Button size="lg" style={{width: "150px", backgroundColor: "white", color: "black", border: "1px solid black"}}>
                                            <b>Start Now!</b>
                                        </Button>
                                    </Col>
                                    <Col sm = {3}></Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col sm = {4}></Col>
                </Row>
            </div>
            <div style = {{padding: "150px"}}>
                <Row>
                    <Col sm ={3}>
                    
                    </Col>
                    <Col sm ={2}>
                        <div className ='style-stats'>
                            <h1 className='stats-heading'>
                                100+
                            </h1>
                        </div>
                        <h3 style = {{paddingTop: "20px"}}><b>Cities</b></h3>
                    </Col>
                    <Col sm ={2}>
                        <div className ='style-stats'>
                            <h1 className='stats-heading'>
                                3000+
                            </h1>
                        </div>
                        <h4 style = {{ paddingTop: "20px"}}><b>Happy Customers</b></h4>
                    </Col>
                    <Col sm ={2}>
                        <div className ='style-stats'>
                            <h1 className='stats-heading'>
                                1000+
                            </h1>
                        </div>
                        <h3 style = {{paddingTop: "20px"}}><b>Hostels</b></h3>
                    </Col>
                    <Col sm ={3}>
                    
                    </Col>

                </Row>
            </div>
            <div style = {{backgroundImage : "url(./images/Website.png)", padding: "150px", color: "white"}}>
                <h2>
                    <b>
                        One stop to cut down all the hustle
                    </b>
                </h2>
                <h5>
                    Moving to a new city not knowing where to find a suitable hostel? 
                </h5>
                <h5>
                    Dont worry! we got you.
                </h5>
                <h5>
                    Find best hostels in your preferred city within a few minutes.
                </h5>
                <Row>
                    <Col sm = {1}>

                    </Col>
                    <Col sm = {10} style = {{paddingTop: "20px"}}>
                        <Button size="lg" style={{width: "auto", backgroundColor: "#3C6B97", color: "white", border: "1px solid white"}}>
                            <b>Explore Popular Hostels</b>
                        </Button>
                    </Col>
                    <Col sm = {1}>
                    
                    </Col>
                </Row>
            </div>
            <div style = {{padding: "200px"}}>
                <Row>
                    <h2 style = {{paddingBottom: "70px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <b>
                        Explore by City
                        </b>
                    </h2>
                    <Col sm ={1}>

                    </Col>
                    <Col sm ={2}>
                        <div className='img-city' style={{backgroundImage: "url(./images/Minar_e_Pakistan.jpg)"}}>
            
                        </div>
                        <h3 style = {{ paddingTop: "20px"}}><b><Link to="./lahore" style={{textDecoration:'none', color:'black'}}>Lahore</Link></b></h3>                            
                    </Col>
                    <Col sm ={2}>
                        <div className='img-city' style = {{backgroundImage : "url(./images/mazaarquaid.jpg)"}}>
                            
                        </div>
                        <h3 style = {{paddingTop: "20px"}}><b>Karachi</b></h3>
                    </Col>
                    <Col sm ={2}>
                        <div className='img-city' style = {{backgroundImage : "url(./images/pakmonument.jpg)"}}>
                            
                        </div>
                        <h3 style = {{paddingTop: "20px"}}><b>Islamabad</b></h3>
                    </Col>
                    <Col sm ={2}>
                        <div className='img-city' style = {{backgroundImage : "url(./images/ghntaaghar.jpg)"}}>
                            
                        </div>
                        <h3 style = {{paddingTop: "20px"}}><b>Faisalabad</b></h3>
                    </Col>
                    <Col sm ={2}>
                        <div className='img-city' style = {{backgroundImage : "url(./images/multan.jpg)"}}>
                            
                        </div>
                        <h3 style = {{paddingLeft: "30px", paddingTop: "20px"}}><b><Link to="./allHostels" style={{textDecoration:'none', color:'black'}}>All</Link></b></h3>
                    </Col>
                    <Col sm ={1}>
                    
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col sm = {8} style = {{padding: "50px"}}>
                        <h2>
                            <b>
                            We have everything you need.
                            </b>
                        </h2>
                        <h4 className='text1'>
                            <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea commodo consequat.</b>
                        </h4>
                       <div >
                        <Row >
                            <Col sm>
                                <Row>
                                    <Col xs = {2}>
                                        <FaMapMarkerAlt style = {icon}/>
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
                                        <FaWifi style = {icon}/>
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
                                        <FaSuitcase style = {icon}/>
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
                                        <FaParking style = {icon}/>
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
            </div>
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
            <div style = {{padding: "20px"}}>
                <Row>
                    <Col xs = {6} className='general'>
                        <img src="./images/mobapp.jpg" width="100%" height="auto" alt="Logo" className="d-inline-block align-text-top img-responsive"></img>  
                    </Col>
                    <Col xs = {6} style = {{ alignItems: "center",justifyContent: "center", display: "flex",}}>
                        <Row>
                        <h3>
                            <b className='general' style={{paddingBottom: "30px"}}>Download the App now!</b>
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