import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Popular from "../Popular/Popular";
import Advertisement from './Advertisement';
import Filters from './Filters';
import Paginations from './Paginations';
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const Lahore = () => {

    
    const h_style =
    {
        color: "Black",
        backgroundColor: "white",
        padding: "50px",
        fontFamily: "Sans-Serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };
    const star1 =
    {
        color: "#FFD600",
        width : "8%",
        height : "8%",
    };
    const add_style =
    {
        backgroundColor: "white",
        fontFamily: "Sans-Serif",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        border: "1px solid black"
    };
    const align_style =
    {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        
    };
    const top_style =
    {
        display: "flex",
        backgroundColor: "#3C6B97",
        alignItems: "center",
        justifyContent: "center",
        padding:'15px'
    };

    return (
        <>
            <Header/>
            <Navbar/>
            <div>
            <img src="./images/minare.jpg" width="100%" height="650" alt="Logo" className="d-inline-block align-text-top"></img>  
            </div>
            <h1 style={h_style}>
                Best Hostels in Lahore
            </h1 >
            <div>
                <div>
                    <Row style={top_style}>
                        <Col xs={2} sm={2} md={2} lg={2} >
                        
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} style={{marginLeft: '25px'}}>
                            <Filters/>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                        
                        </Col>
                    </Row>
                    
                </div>
                <Container >
                    <Row >
                        <Col  xs={12} md={8}>
                            <Advertisement/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Row>
                <Col xs={1} sm={2} md={3} lg={4} ></Col>
                <Col xs={10} sm={8} md={6} lg={4}>
                    <Paginations/>
                </Col>
                <Col xs={1} sm={2} md={3} lg={4}></Col>
            </Row>
            <div>
                <Row>
                    <Col class="col-sm-1">
                        
                    </Col>
                    <Col class="col-sm-10">
                        <Popular/>
                    </Col>
                    <Col class="col-sm-1">

                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Lahore;